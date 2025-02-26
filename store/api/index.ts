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
});
