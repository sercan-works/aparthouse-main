import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithErrorHandling from './baseQueryWithErrorHandling';

// JWT Token Yanıt Tipi
export interface AuthResponse {
  refresh: string;
  access: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
  }
}

// Token'ları yönetmek için yardımcı fonksiyonlar
export const setTokens = (tokens: { access: string; refresh: string }) => {
  localStorage.setItem('access_token', tokens.access);
  localStorage.setItem('refresh_token', tokens.refresh);
};

export const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');

// API'nin temel yapılandırması
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ['Profile', 'User'],
  endpoints: (builder) => ({
    // Email ve şifre ile giriş için endpoint
    login: builder.mutation<AuthResponse, { username: string; email: string; password: string }>({
      query: (credentials) => ({
        url: '/api/token/',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Token yenilemek için endpoint
    refreshToken: builder.mutation<{ access: string }, { refresh: string }>({
      query: (refreshData) => ({
        url: '/api/token/refresh/',
        method: 'POST',
        body: refreshData,
      }),
    }),

    // Google kimlik bilgilerini DRF'ye göndermek için endpoint
    socialLogin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/social/google/',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Kullanıcı profil bilgilerini almak için endpoint
    getProfile: builder.query({
      query: () => '/auth/profile/',
      providesTags: ['Profile', 'User'],
    }),
    
    // Oturumu kapatmak için endpoint
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
    
    // Profilinizi güncellemek için endpoint (isteğe bağlı)
    updateProfile: builder.mutation({
      query: (userData) => ({
        url: '/auth/profile/',
        method: 'PATCH',
        body: userData,
      }),
      invalidatesTags: ['Profile', 'User'],
    }),
  }),
});

// Hook'ları dışa aktar
export const { 
  useLoginMutation,
  useRefreshTokenMutation,
  useSocialLoginMutation,
  useGetProfileQuery,
  useLogoutMutation,
  useUpdateProfileMutation,
} = authApi;