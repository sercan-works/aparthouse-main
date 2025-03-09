import { baseApi } from '.';

export interface Apartment {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  // İhtiyacınıza göre daha fazla alan ekleyebilirsiniz
}

// Geçici olarak kullanacağımız mock veriler
const MOCK_APARTMENTS: Apartment[] = [
  {
    id: '1',
    title: 'Mono Kız Apart',
    description: 'Öğrenciler için tasarlanmış, konforlu apart daire',
    price: 10500,
    location: 'Eskişehir, Tepebaşı',
    images: ['/assets/apart.jpg']
  },
  {
    id: '2',
    title: 'Merkezi Erkek Apart',
    description: 'Üniversiteye yakın, tam donanımlı erkek apart',
    price: 11000,
    location: 'Eskişehir, Odunpazarı',
    images: ['/assets/apart.jpg']
  },
  {
    id: '3',
    title: 'Lüks Karma Apart',
    description: 'Yeni yapılmış, lüks donanımlı öğrenci apart',
    price: 12500,
    location: 'Eskişehir, Merkez',
    images: ['/assets/apart.jpg']
  }
];

// baseApi'yi genişleterek apartlara özel endpointler ekliyoruz
export const apartsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApartments: builder.query<Apartment[], void>({
      // API kullanıma hazır olana kadar mock veri döndürüyoruz
      queryFn: () => ({ data: MOCK_APARTMENTS }),
      // Gerçek API'ye geçtiğinizde bu satırı aktifleştirin:
      // query: () => 'apartments',
      
      // SSR ile ilgili ek yapılandırmalar
      keepUnusedDataFor: 60, // Bu endpoint için veriyi 60 saniye saklayalım
    }),
    getApartmentById: builder.query<Apartment, string>({
      // API kullanıma hazır olana kadar mock veri döndürüyoruz
      queryFn: (id) => {
        const apartment = MOCK_APARTMENTS.find(a => a.id === id);
        return apartment 
          ? { data: apartment } 
          : { error: { status: 404, data: 'Apart bulunamadı' } };
      },
      // Gerçek API'ye geçtiğinizde bu satırı aktifleştirin:
      // query: (id) => `apartments/${id}`,
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