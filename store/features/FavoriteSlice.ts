import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiApart } from '@/store/api/apartsApi';

interface FavoriteState {
    favoriteApartIds: number[];
    favoriteAparts: ApiApart[];
    loading: boolean;
    error: string | null;
}

// Local storage'dan favori apartların ID'lerini al
const getFavoritesFromStorage = (): number[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favoriteAparts');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Favori apartlar parse edilemedi:', e);
            }
        }
    }
    return [];
};

// Local storage'a favori apartların ID'lerini kaydet
const saveFavoritesToStorage = (ids: number[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteAparts', JSON.stringify(ids));
    }
};

const initialState: FavoriteState = {
    favoriteApartIds: getFavoritesFromStorage(),
    favoriteAparts: [],
    loading: false,
    error: null
};

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const apartId = action.payload;
            const index = state.favoriteApartIds.indexOf(apartId);
            
            if (index === -1) {
                // Favorilere ekle
                state.favoriteApartIds.push(apartId);
            } else {
                // Favorilerden çıkar
                state.favoriteApartIds.splice(index, 1);
                
                // Aynı zamanda favoriteAparts listesinden de kaldır
                state.favoriteAparts = state.favoriteAparts.filter(apart => apart.id !== apartId);
            }
            
            // Local storage güncelle
            saveFavoritesToStorage(state.favoriteApartIds);
        },
        setFavoriteAparts: (state, action: PayloadAction<ApiApart[]>) => {
            state.favoriteAparts = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { toggleFavorite, setFavoriteAparts, setLoading, setError } = favoriteSlice.actions;
export default favoriteSlice.reducer; 