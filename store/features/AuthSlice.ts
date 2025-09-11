import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi, clearTokens, setTokens } from '../api/authApi';

// Kullanıcı için tip tanımı
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  displayName?: string; // Kullanıcı dostu görüntüleme adı
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: User; access: string; refresh: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
      
      // Token'ları localStorage'a kaydet
      setTokens({ 
        access: action.payload.access, 
        refresh: action.payload.refresh 
      });
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', action.payload);
      }
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      
      // Token'ları localStorage'dan sil
      clearTokens();
    },
  },
  extraReducers: (builder) => {
    // Login işlemi başarılıysa
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.user;
        state.accessToken = payload.access;
        state.refreshToken = payload.refresh;
        state.isAuthenticated = true;
        
        // Token'ları localStorage'a kaydet
        setTokens({ 
          access: payload.access, 
          refresh: payload.refresh 
        });
      }
    );
    
    // Token yenileme işlemi başarılıysa
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.access;
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', payload.access);
        }
      }
    );
    
    // Social login işlemi başarılıysa
    builder.addMatcher(
      authApi.endpoints.socialLogin.matchFulfilled,
      (state, { payload }) => {
        if (payload.user && payload.access && payload.refresh) {
          state.user = payload.user;
          state.accessToken = payload.access;
          state.refreshToken = payload.refresh;
          state.isAuthenticated = true;
          
          // Token'ları localStorage'a kaydet
          setTokens({ 
            access: payload.access, 
            refresh: payload.refresh 
          });
        }
      }
    );
    
    // Çıkış işlemi başarılıysa
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        
        // Token'ları localStorage'dan sil
        clearTokens();
      }
    );
  },
});

export const { setCredentials, setAccessToken, clearCredentials } = authSlice.actions;
export default authSlice.reducer;