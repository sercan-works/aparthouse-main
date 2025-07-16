import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Local storage'dan görüntülenen apartların ID'lerini al
const getViewedFromStorage = (): number[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('viewedAparts');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Görüntülenen apartlar parse edilemedi:', e);
            }
        }
    }
    return [];
};

// Local storage'a görüntülenen apartların ID'lerini kaydet
const saveViewedToStorage = (ids: number[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('viewedAparts', JSON.stringify(ids));
    }
};

interface ViewedState {
    viewedApartIds: number[];
    isHydrated: boolean;
}

const initialState: ViewedState = {
    viewedApartIds: [], // Hydration mismatch'i önlemek için server'da boş başlat
    isHydrated: false,
};

export const viewedSlice = createSlice({
    name: 'viewed',
    initialState,
    reducers: {
        // Hydration tamamlandıktan sonra localStorage'dan yükle
        loadViewedFromStorage: (state) => {
            state.viewedApartIds = getViewedFromStorage();
            state.isHydrated = true;
        },
        addViewed: (state, action: PayloadAction<number>) => {
            if (!state.viewedApartIds.includes(action.payload)) {
                state.viewedApartIds.push(action.payload);
                saveViewedToStorage(state.viewedApartIds);
            }
        },
        clearViewed: (state) => {
            state.viewedApartIds = [];
            saveViewedToStorage(state.viewedApartIds);
        }
    },
});

export const { loadViewedFromStorage, addViewed, clearViewed } = viewedSlice.actions;

export default viewedSlice.reducer; 