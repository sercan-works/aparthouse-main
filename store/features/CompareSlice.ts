import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiApart } from '@/store/api/apartsApi';

interface CompareState {
    compareApartIds: number[];
    compareAparts: ApiApart[];
    loading: boolean;
    error: string | null;
}

// Local storage'dan karşılaştırılan apartların ID'lerini al
const getCompareFromStorage = (): number[] => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('compareAparts');
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Karşılaştırılan apartlar parse edilemedi:', e);
            }
        }
    }
    return [];
};

// Local storage'a karşılaştırılan apartların ID'lerini kaydet
const saveCompareToStorage = (ids: number[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('compareAparts', JSON.stringify(ids));
    }
};

const initialState: CompareState = {
    compareApartIds: getCompareFromStorage(),
    compareAparts: [],
    loading: false,
    error: null
};

// Maksimum karşılaştırılabilecek apart sayısı
const MAX_COMPARE_ITEMS = 3;

export const compareSlice = createSlice({
    name: 'compare',
    initialState,
    reducers: {
        toggleCompare: (state, action: PayloadAction<number>) => {
            const apartId = action.payload;
            const index = state.compareApartIds.indexOf(apartId);
            
            if (index === -1) {
                // Eğer zaten maksimum sayıda karşılaştırılan apart varsa ve yeni bir apart eklenmeye çalışılıyorsa işlemi yapma
                if (state.compareApartIds.length >= MAX_COMPARE_ITEMS) {
                    return;
                }
                
                // Karşılaştırmaya ekle
                state.compareApartIds.push(apartId);
            } else {
                // Karşılaştırmadan çıkar
                state.compareApartIds.splice(index, 1);
                
                // Aynı zamanda compareAparts listesinden de kaldır
                state.compareAparts = state.compareAparts.filter(apart => apart.id !== apartId);
            }
            
            // Local storage güncelle
            saveCompareToStorage(state.compareApartIds);
        },
        setCompareAparts: (state, action: PayloadAction<ApiApart[]>) => {
            state.compareAparts = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { toggleCompare, setCompareAparts, setLoading, setError } = compareSlice.actions;
export default compareSlice.reducer; 