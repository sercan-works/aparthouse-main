import { baseApi } from './index';

// Define types
interface BaseItem {
    id: number;
    name: string;
}

export const filterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Cities endpoints
        getCities: builder.query<BaseItem[], void>({
            query: () => '/cities',
            // Transform response if needed
            // transformResponse: (response: any) => response.data,
        }),

        // Universities endpoints
        getUniversities: builder.query<BaseItem[], void>({
            query: () => '/universities',
        }),

        // Apart types endpoints
        getApartTypes: builder.query<BaseItem[], void>({
            query: () => '/apart-types',
        }),
        
        getFilters: builder.query<BaseItem[], void>({
            query: () => '/api/filters/',
        }),
    }),
    overrideExisting: false,
});

export const { 
    useGetCitiesQuery,
    useGetUniversitiesQuery,
    useGetApartTypesQuery,
    useGetFiltersQuery,
} = filterApi; 

