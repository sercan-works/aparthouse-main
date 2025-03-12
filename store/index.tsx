import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './api/authApi';
import { apartApi } from './apiSlice';
import AuthSlice from './features/AuthSlice';

export const store = configureStore({
  reducer: {
    // API reducer'ları
    [authApi.reducerPath]: authApi.reducer,
    [apartApi.reducerPath]: apartApi.reducer,
    // Geleneksel reducers
    auth: AuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, apartApi.middleware),
});

// RTK Query'nin refetching yeteneklerini etkinleştirin
setupListeners(store.dispatch);

// RootState ve AppDispatch tipleri
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
