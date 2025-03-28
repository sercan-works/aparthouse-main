import { ReactNode } from 'react';
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


export interface ApiApart {
  phone: string | null;
  gender: string;
  apart_name: ReactNode | string;
  id: number;
  name: string;
  price: number;
  price_type: string;
  city_name: string;
  info: string;
  address: string;
  lat: number;
  lon: number;
  slug: string;
  food: boolean;
  created_at: string;
  is_approved: boolean;
  images: {
    id: number;
    image: string;
    cover: boolean;
  }[];
  images_thumbnail: {
    id: number;
    image: string;
    cover: boolean;
  }[];
  image_thumbnail: string[];
  category: {
    id: number;
    name: string;
    icon: string;
    sexualty: string;
  };
  town: {
    id: number;
    name: string;
    city_name: string;
  };
  // Yeni servis formatı
  services: {
    service_name: string;
    service_data: string[];
  }[];
  bills: {
    id: number;
    name: string;
  }[];
  firma: {
    id: number;
    name: string;
    phone: string;
    mail: string;
    image: string | null;
  };
  universitys: {
    id: number;
    name: string;
    address: string;
    city_name: string;
    image: string | null;
  }[];
  cover_image: string;
  distances?: {
    id: number;
    university: {
      id: number;
      name: string;
    };
    yurume: number;
    tramvay?: number;
    otobus?: number;
  }[];
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
  ['gender', 'category', 'features','cacik'].forEach(key => {
    if (selectedFilters[key]?.length) {
      params[key] = selectedFilters[key].join(',');
    }
  });
  
  return params;
};

// baseApi'yi genişleterek apartlara özel endpointler ekliyoruz
export const apartsApi = baseApi.injectEndpoints({

  endpoints: (builder) => ({
    getApartmentById: builder.query<Apartment, string>({
      // Gerçek API endpoint'ini kullanıyoruz
      query: (slug) => `/api/aparts/${slug}`,
    }),
    getFilteredAparts: builder.query<Apartment[], FilterParams>({
      query: (filters) => ({
        url: '/api/aparts',
        params: filters,
        keepUnusedDataFor: 60,
      }),
    }),
    getAparts: builder.query<ApiApart[], FilterParams>({
      query: (filters) => ({
        url: '/api/aparts',
        params: filters,
        keepUnusedDataFor: 60,
      }),
    }),
    getHiglightAparts: builder.query<ApiApart[], FilterParams>({
      query: (filters) => ({
        url: '/api/highlight-aparts/',
        params: filters,
        keepUnusedDataFor: 60,
      }),
    }),
  }),
  overrideExisting: false,
});

// RTK Query tarafından otomatik oluşturulan hook'ları dışa aktarıyoruz
export const { 
  useGetApartmentByIdQuery,
  useGetFilteredApartsQuery,
  useGetApartsQuery,
  useGetHiglightApartsQuery,
} = apartsApi;

// SSR için gerekli olan endpoint referansları
export const { 
  getApartmentById,
  getFilteredAparts,
  getAparts,
  getHiglightAparts,
} = apartsApi.endpoints;

// Çalışan tüm sorguları beklemek için gereken fonksiyon
// Next.js SSR ile kullanılmak üzere dışa aktarılıyor
export const { getRunningQueriesThunk } = apartsApi.util;

