import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeConfigSlice from '@/store/themeConfigSlice';
import { baseApi } from './api';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    [baseApi.reducerPath]: baseApi.reducer,
});

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type IRootState = ReturnType<typeof rootReducer>;
