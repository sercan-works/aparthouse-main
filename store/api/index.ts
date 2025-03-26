import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithErrorHandling from './baseQueryWithErrorHandling';
    
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
    // SSR için önemli ayarlar
    keepUnusedDataFor: 30, // 30 saniye veriyi saklıyoruz
    refetchOnMountOrArgChange: true, // Component mount edildiğinde veriyi yeniden çekiyoruz
    refetchOnFocus: false, // Sayfa fokuslanırsa veriyi yeniden çekmiyoruz
    refetchOnReconnect: true, // Bağlantı geri gelince veriyi yeniden çekiyoruz
});
