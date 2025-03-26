import { baseApi } from '.';
import { ApiApart } from './apartsApi';

export const favoriteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Favorilere Apart ekleme (Kullanıcı giriş yapmışsa)
    addFavorite: builder.mutation<void, number>({
      query: (apartId) => ({
        url: '/dashboard/favorite-aparts/',
        method: 'POST',
        body: { apart: apartId }
      }),
    }),
    
    // Favorilerden Apart kaldırma (Kullanıcı giriş yapmışsa)
    removeFavorite: builder.mutation<void, number>({
      query: (apartId) => ({
        url: `/dashboard/favorite-aparts/remove_favorite/?apart_id=${apartId}`,
        method: 'DELETE',
      }),
    }),
    
    // Favori apartları getirme (Kullanıcı giriş yapmışsa)
    getFavoriteAparts: builder.query<ApiApart[], void>({
      query: () => '/dashboard/favorite-aparts/',
    }),
    
    // Belirli ID'lere sahip apartları getirme (anonim kullanıcılar için)
    getApartsByIds: builder.query<ApiApart[], number[]>({
      query: (apartIds) => ({
        url: '/api/favorite-aparts-ids/',
        params: { ids: apartIds.join(',') }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoriteApartsQuery,
  useGetApartsByIdsQuery,
} = favoriteApi;

export const {
  endpoints: {
    addFavorite,
    removeFavorite,
    getFavoriteAparts,
    getApartsByIds,
  },
} = favoriteApi; 