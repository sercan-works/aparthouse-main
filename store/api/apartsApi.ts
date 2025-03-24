import { baseApi } from '.';

export interface Apartment {
  id: string;
  title: string;
  name?: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  firma: {
    phone: string;
    mail: string;
  };
  info: string;
  address: string;
  distances: {
    id: string;
    university: {
      name: string;
    };
    yurume: number;
    tramvay: number;
    otobus: number;
  }[];
  services?: {
    id: number;
    name: string;
    icon: string;
    category_name: string;
  }[];


  // İhtiyacınıza göre daha fazla alan ekleyebilirsiniz
}

// Filtreleme parametreleri için interface
export interface FilterParams {
  city?: string | number;
  university?: string;
  price_min?: number;
  price_max?: number;
  gender?: string;
  category?: string;
  features?: string;
  [key: string]: string | number | undefined;
}

export interface SelectedFilters {
  [key: string]: (string | number)[];
}

// Seçili filtreleri API parametrelerine dönüştürme
export const prepareSearchParams = (selectedFilters: SelectedFilters): FilterParams => {
  const params: FilterParams = {};
  
  // Temel filtreler
  if (selectedFilters.city?.length) params.city = selectedFilters.city[0];
  if (selectedFilters.university?.length) params.university = selectedFilters.university.join(',');
  
  // Fiyat aralığı
  if (selectedFilters.price && selectedFilters.price.length >= 2) {
    params.price_min = selectedFilters.price[0] as number;
    params.price_max = selectedFilters.price[1] as number;
  }

  // Diğer filtreler için döngü
  ['gender', 'category', 'features'].forEach(key => {
    if (selectedFilters[key]?.length) {
      params[key] = selectedFilters[key].join(',');
    }
  });
  
  return params;
};

// baseApi'yi genişleterek apartlara özel endpointler ekliyoruz
export const apartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query<Apartment[], void>({
      // Gerçek API endpoint'ini kullanıyoruz
      query: () => 'aparts',
      
      // SSR ile ilgili ek yapılandırmalar
      keepUnusedDataFor: 60, // Bu endpoint için veriyi 60 saniye saklayalım
    }),
    getApartmentById: builder.query<Apartment, string>({
      // Gerçek API endpoint'ini kullanıyoruz
      query: (slug) => `/api/aparts/${slug}`

    }),
    getFilteredAparts: builder.query<Apartment[], FilterParams>({
      query: (filters) => ({
        url: '/api/aparts',
        params: filters,
      }),
    }),
  }),
  overrideExisting: false,
});

// RTK Query tarafından otomatik oluşturulan hook'ları dışa aktarıyoruz
export const { 
  useGetApartmentsQuery,
  useGetApartmentByIdQuery,
  useGetFilteredApartsQuery,
} = apartsApi;

// SSR için gerekli olan endpoint referansları
export const { 
  getApartments, 
  getApartmentById,
  getFilteredAparts,
} = apartsApi.endpoints;

// Çalışan tüm sorguları beklemek için gereken fonksiyon
// Next.js SSR ile kullanılmak üzere dışa aktarılıyor
export const { getRunningQueriesThunk } = apartsApi.util; 