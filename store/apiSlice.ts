import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ReactNode } from 'react';

// API response interface - API'den gelen veri formatını tanımlıyoruz
export interface ApiApart {
  phone: string | null;
  gender: string;
  apart_name: ReactNode | string;
  id: number;
  name: string;
  price: number;
  price_type: string;
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
}

// API URL'ini environment variable'dan al veya varsayılan değer kullan
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// RTK Query API service
export const apartApi = createApi({
  reducerPath: 'apartApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${API_URL}/api/`,
    prepareHeaders: (headers) => {
      // İsteğe bağlı: API tokenlerini burada ekleyebilirsiniz
      // headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    // Hata işleme
    fetchFn: async (...args) => {
      try {
        const response = await fetch(...args);
        return response;
      } catch (error) {
        console.error('API request failed:', error);
        throw error;
      }
    }
  }),
  tagTypes: ['Aparts'],
  endpoints: (builder) => ({
    // Tüm apartları getir
    getAparts: builder.query<ApiApart[], void>({
      query: () => 'aparts',
      providesTags: ['Aparts'],
      // Hata yakalama ve dönüştürme
      transformErrorResponse: (response) => {
        console.error('Error fetching aparts:', response);
        return response;
      },
      // Hatalı JSON'u kontrol et
      transformResponse: (response: unknown) => {
        if (!response) {
          console.error('Empty response received');
          throw new Error('Empty response received');
        }
        try {
          // Eğer JSON string olarak geliyorsa parse et
          if (typeof response === 'string') {
            return JSON.parse(response) as ApiApart[];
          }
          // Zaten nesne ise doğrudan dön
          return response as ApiApart[];
        } catch (error) {
          console.error('Failed to parse API response:', error);
          throw error;
        }
      },
    }),
    
    // Slug ile tek bir apart getir
    getApartBySlug: builder.query<ApiApart, string>({
      query: (slug) => `aparts/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Aparts', id: slug }],
      // Hata yakalama
      transformErrorResponse: (response) => {
        console.error('Error fetching apart by slug:', response);
        return response;
      },
    }),
  }),
});

// Export hooks
export const { useGetApartsQuery, useGetApartBySlugQuery } = apartApi; 