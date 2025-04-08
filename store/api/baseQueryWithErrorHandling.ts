import { fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { addToast } from '@heroui/react'; // veya kullandığınız toast kütüphanesi

// DRF hata yanıt tipi
interface DRFErrorResponse {
  non_field_errors?: string[];
  [key: string]: unknown;
}

// Mutex kullanarak aynı anda birden fazla refresh token isteği yapılmasını engelliyoruz
const mutex = new Mutex();

// Basit yardımcı fonksiyonlar - Import etmek yerine burada tanımlıyoruz
const clearLocalCredentials = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
};

// Temel sorgu fonksiyonu
const baseQuery = fetchBaseQuery({ 
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/', 
  prepareHeaders: (headers) => {
    // Doğrudan localStorage'dan token alıyoruz, harici fonksiyon kullanmak yerine
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

/**
 * HTTP durum kodlarına göre hata mesajlarını işler
 */
const handleErrorResponse = (error: FetchBaseQueryError): string => {
  const status = error.status;
  let errorMessage = 'Bir hata oluştu';

  switch (status) {
    case 400:
      errorMessage = 'Geçersiz istek (400)';
      break;
    case 401:
      errorMessage = 'Oturum süreniz doldu, lütfen tekrar giriş yapın (401)';
      break;
    case 403:
      errorMessage = 'Bu işlem için yetkiniz bulunmuyor (403)';
      break;
    case 404:
      errorMessage = 'İstek yapılan kaynak bulunamadı (404)';
      break;
    case 408:
      errorMessage = 'İstek zaman aşımına uğradı (408)';
      break;
    case 409:
      errorMessage = 'İstek çakışması oluştu (409)';
      break;
    case 422:
      errorMessage = 'Gönderilen veri işlenemedi (422)';
      break;
    case 429:
      errorMessage = 'Çok fazla istek gönderildi, lütfen daha sonra tekrar deneyin (429)';
      break;
    case 500:
      errorMessage = 'Sunucu hatası oluştu (500)';
      break;
    case 502:
      errorMessage = 'Kötü ağ geçidi (502)';
      break;
    case 503:
      errorMessage = 'Servis kullanılamıyor (503)';
      break;
    case 504:
      errorMessage = 'Ağ geçidi zaman aşımı (504)';
      break;
    default:
      if (typeof status === 'number' && status >= 500) {
        errorMessage = 'Sunucu hatası';
      } else if (typeof status === 'number' && status >= 400) {
        errorMessage = 'İstek hatası';
      }
      break;
  }

  // DRF özel hata mesajlarını işle
  if (error.data && typeof error.data === 'object') {
    const errorData = error.data as DRFErrorResponse;
    
    // Non-field errors (genellikle kimlik doğrulama hataları)
    if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors)) {
      errorMessage = errorData.non_field_errors.join(', ');
    }
    // Diğer alan hataları
    else if (Object.keys(errorData).length > 0) {
      const fieldErrors = Object.entries(errorData)
        .map(([field, msgs]) => {
          if (Array.isArray(msgs)) {
            return `${field}: ${msgs.join(', ')}`;
          }
          return `${field}: ${String(msgs)}`;
        })
        .filter(Boolean)
        .join('\n');
      
      if (fieldErrors) {
        errorMessage = fieldErrors;
      }
    }
  }

  return errorMessage;
};

// Hata toast gösterme fonksiyonu - sadece belirli hata kodlarında gösterecek şekilde ayarlanabilir
const showErrorToast = (error: FetchBaseQueryError, errorMessage: string, url: string) => {
  // Belirli hata kodları toast'ta gösterilmeyebilir (örneğin 401 Login sayfasına yönlendirme yapılırsa)
  const skipToast: (number | string)[] = [/* 401 */]; // 401 için toast göstermek istemiyorsanız burada belirtin
  const status = error.status;
  
  // Login sayfasında değilsek 401 hatası göster 
  // veya Kullanıcının isteğini etkileyecek bir hata varsa göster
  if (!skipToast.some(code => code === status)) {
    // Toast title'ı hata koduna göre belirleyebiliriz
    let title = 'Hata';
    
    if (typeof status === 'number') {
      if (status >= 500) title = 'Sunucu Hatası';
      else if (status >= 400) title = 'İstek Hatası';
    }
    
    addToast({
      title,
      description: errorMessage,
      color: 'danger',
    });
    
    // İsteğe bağlı: hataları console'a da loglayabiliriz
    console.error(`API Error (${status}) for ${url}:`, errorMessage);
  }
};

/**
 * Hata yönetimi ve token yenileme ile geliştirilmiş sorgu fonksiyonu
 */
const baseQueryWithErrorHandling: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // İstek URL'sini al (loglama için)
  const url = typeof args === 'string' ? args : args.url;
  
  // Mutex üzerinden kilitleme yapmadan önce ilk sorguyu çalıştır
  let result = await baseQuery(args, api, extraOptions);
  
  // Hata durumunda
  if (result.error) {
    // Hatayı işle ve user-friendly mesaj oluştur
    const errorMessage = handleErrorResponse(result.error);
    
    // Error toast göster (isteğe bağlı olarak devre dışı bırakılabilir)
    showErrorToast(result.error, errorMessage, url);
    
    // 401 Unauthorized hatası için token yenileme işlemi
    if (result.error.status === 401) {
      // Mutex üzerinden kilitleme yap (aynı anda sadece bir refresh işlemi yapılmasını sağlar)
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        
        try {
          // localStorage'dan refresh token'ı al
          const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
          
          if (!refreshToken) {
            // Refresh token yoksa, kullanıcıyı çıkış yaptır
            clearLocalCredentials();
            
            // Çıkış yapıldığına dair bildirim göster
            addToast({
              title: 'Oturum Sona Erdi',
              description: 'Güvenliğiniz için oturumunuz sonlandırıldı. Lütfen tekrar giriş yapın.',
              color: 'warning',
            });
            
            return result;
          }
          
          // Refresh token kullanarak yeni bir access token iste
          const refreshResult = await baseQuery(
            { 
              url: '/api/token/refresh/', 
              method: 'POST', 
              body: { refresh: refreshToken }
            },
            api,
            extraOptions
          );
          
          if (refreshResult.data) {
            // Yeni token'ı localStorage'a kaydet
            const { access } = refreshResult.data as { access: string };
            localStorage.setItem('access_token', access);
            
            // Token yenilendi bilgisi göster (isteğe bağlı)
            // console.log('Token refreshed successfully');
            
            // Orijinal isteği yeni token ile tekrar dene
            result = await baseQuery(args, api, extraOptions);
          } else {
            // Token yenileme başarısız olduysa, kullanıcıyı çıkış yaptır
            clearLocalCredentials();
            
            // Çıkış yapıldığına dair bildirim göster
            addToast({
              title: 'Oturum Sona Erdi',
              description: 'Token yenileme başarısız oldu. Lütfen tekrar giriş yapın.',
              color: 'warning',
            });
          }
        } finally {
          // Mutex kilidini serbest bırak
          release();
        }
      } else {
        // Mutex kilitliyse, diğer işlemlerin tamamlanmasını bekle
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
    
    // Diğer hata türleri için özel işlemler (opsiyonel)
    // Örnek - ağ bağlantı hatası (FETCH_ERROR)
    if (result.error && result.error.status === 'FETCH_ERROR') {
      addToast({
        title: 'Bağlantı Hatası',
        description: 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.',
        color: 'danger',
      });
    }
    
    // 404 hataları için özel işlemler (opsiyonel)
    if (result.error && result.error.status === 404) {
      // İsteğe bağlı olarak 404 sayfasına yönlendirme yapılabilir
    }
  }
  
  return result;
};

export default baseQueryWithErrorHandling; 