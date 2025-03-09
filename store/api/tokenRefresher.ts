import { store } from '../index';
import { clearCredentials, setAccessToken } from '../features/AuthSlice';
import { getRefreshToken } from './authApi';
import { authApi } from './authApi';

/**
 * JWT token'ı süresi dolduğunda refresh token ile yenilemek için kullanılan fonksiyon.
 * 
 * @returns {Promise<boolean>} Token yenileme işlemi başarılı mı?
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    
    // Refresh token yoksa çıkış yap
    if (!refreshToken) {
      console.error('Refresh token not found. Logging out...');
      store.dispatch(clearCredentials());
      return false;
    }
    
    // Redux store üzerinden refreshToken mutation'ını çağır
    const response = await store.dispatch(
      authApi.endpoints.refreshToken.initiate({ refresh: refreshToken })
    ).unwrap();
    
    if (response.access) {
      // Yeni access token'ı redux store'a kaydet
      store.dispatch(setAccessToken(response.access));
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Hata durumunda token'ları temizle ve kullanıcıyı çıkış yaptır
    store.dispatch(clearCredentials());
    return false;
  }
};

// Token süresi dolduğunda otomatik yenileme için bir interceptor oluşturmak isterseniz
// burada axios veya custom fetchBaseQuery ile bunu yapabilirsiniz
// Örnek gösterim amaçlıdır, DRF'den gelen 401 hatasını yakalayıp refreshAccessToken'ı çağırabilirsiniz 