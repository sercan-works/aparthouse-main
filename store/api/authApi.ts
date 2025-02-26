import { baseApi } from './index';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/login/',
                method: 'POST',
                body: data,
            }),
        }),
        // Diğer auth endpointleri buraya eklenebilir

    }),
});

export const { 
    useLoginMutation,
} = authApi;