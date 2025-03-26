import { baseApi } from './index';

// Define types
interface BaseItem {
    id: number;
    name: string;
}

interface CategoryItem {
    id: number;
    name: string;
    image: string;
}

export const filterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Cities endpoints
        getCities: builder.query<BaseItem[], string>({
            query: (city) => ({
                url: '/api/cities',
                params: {
                    city: city || undefined,
                },
            }),
            // Transform response if needed
            // transformResponse: (response: any) => response.data,
        }),

        getCategories: builder.query<CategoryItem[], void>({
            query: () => '/api/categories',
        }),

        // Universities endpoints
        getUniversities: builder.query<BaseItem[], void>({
            query: () => '/api/universities',
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
    useGetCategoriesQuery,
} = filterApi; 

