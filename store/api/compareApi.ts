import { baseApi } from '.';
import { ApiApart } from './apartsApi';

export const compareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Belirli ID'lere sahip apartları getirme
    getApartsByIds: builder.query<ApiApart[], number[]>({
      query: (apartIds) => ({
        url: '/api/favorite-aparts-ids/', // Aynı endpoint'i kullanıyoruz
        params: { ids: apartIds.join(',') }
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetApartsByIdsQuery,
} = compareApi;

export const {
  endpoints: {
    getApartsByIds,
  },
} = compareApi; 