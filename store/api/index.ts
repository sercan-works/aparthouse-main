import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
    
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        // prepareHeaders: (headers, { getState }) => {
        //     const state = getState() as IRootState;
        //     const token = "000000000000000000000";
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        //     return headers;
        // },
    }),
    endpoints: () => ({}),
    // SSR için önemli ayarlar
    keepUnusedDataFor: 30, // 30 saniye veriyi saklıyoruz
    refetchOnMountOrArgChange: true, // Component mount edildiğinde veriyi yeniden çekiyoruz
    refetchOnFocus: false, // Sayfa fokuslanırsa veriyi yeniden çekmiyoruz
    refetchOnReconnect: true, // Bağlantı geri gelince veriyi yeniden çekiyoruz
});
