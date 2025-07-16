import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Apart, mockAparts } from '@/data/apart';
import { ApiApart } from '@/store/api/apartsApi';

interface ApartState {
    aparts: Apart[];
    selectedApart: Apart | null;
    compareApart: Apart[];
    // Pagination state
    paginatedAparts: ApiApart[];
    currentPage: number;
    totalPages: number;
    hasMore: boolean;
    isLoadingMore: boolean;
    pageSize: number;
}

const initialState: ApartState = {
    aparts: mockAparts,
    selectedApart: null,
    compareApart: [],
    // Pagination initial state
    paginatedAparts: [],
    currentPage: 1,
    totalPages: 1,
    hasMore: true,
    isLoadingMore: false,
    pageSize: 20,
};

const apartSlice = createSlice({
    name: 'apart',
    initialState,
    reducers: {
        getAparts: (state) => {
            state.aparts = mockAparts;
        },
        // Pagination reducer'ları
        setPaginatedAparts: (state, action: PayloadAction<ApiApart[]>) => {
            state.paginatedAparts = Array.isArray(action.payload) ? action.payload : [];
        },
        appendPaginatedAparts: (state, action: PayloadAction<ApiApart[]>) => {
            const newData = Array.isArray(action.payload) ? action.payload : [];
            state.paginatedAparts = [...state.paginatedAparts, ...newData];
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setHasMore: (state, action: PayloadAction<boolean>) => {
            state.hasMore = action.payload;
        },
        setIsLoadingMore: (state, action: PayloadAction<boolean>) => {
            state.isLoadingMore = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.pageSize = action.payload;
        },
        resetPagination: (state) => {
            state.paginatedAparts = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.hasMore = true;
            state.isLoadingMore = false;
        },
    },
});

export const { 
    getAparts,
    setPaginatedAparts,
    appendPaginatedAparts,
    setCurrentPage,
    setTotalPages,
    setHasMore,
    setIsLoadingMore,
    setPageSize,
    resetPagination,
} = apartSlice.actions;

export default apartSlice.reducer;

