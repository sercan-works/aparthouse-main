import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithErrorHandling from './baseQueryWithErrorHandling';
    
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: () => ({}),
    // Optimized cache settings for better UX
    keepUnusedDataFor: 300, // 5 dakika veriyi saklıyoruz (30'dan 300'e çıkardık)
    refetchOnMountOrArgChange: 120, // 2 dakika içinde mount olursa veriyi yeniden çekme (true yerine süre verdik)
    refetchOnFocus: false, // Sayfa fokuslanırsa veriyi yeniden çekmiyoruz
    refetchOnReconnect: true, // Bağlantı geri gelince veriyi yeniden çekiyoruz
});
