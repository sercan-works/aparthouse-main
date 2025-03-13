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
  }),
  overrideExisting: false,
});

// RTK Query tarafından otomatik oluşturulan hook'ları dışa aktarıyoruz
export const { 
  useGetApartmentsQuery,
  useGetApartmentByIdQuery,
} = apartsApi;

// SSR için gerekli olan endpoint referansları
export const { 
  getApartments, 
  getApartmentById 
} = apartsApi.endpoints;

// Çalışan tüm sorguları beklemek için gereken fonksiyon
// Next.js SSR ile kullanılmak üzere dışa aktarılıyor
export const { getRunningQueriesThunk } = apartsApi.util; 