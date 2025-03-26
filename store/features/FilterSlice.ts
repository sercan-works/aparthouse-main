import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  selectedCategory: number | null;
  selectedGender: string | null;
  selectedCity: number | null;
  selectedUniversity: number | null;
  // Diğer filtreleri ekleyebiliriz
}

const initialState: FilterState = {
  selectedCategory: null,
  selectedGender: null,
  selectedCity: null,
  selectedUniversity: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<number | null>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedGender: (state, action: PayloadAction<string | null>) => {
      state.selectedGender = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<number | null>) => {
      state.selectedCity = action.payload;
    },
    setSelectedUniversity: (state, action: PayloadAction<number | null>) => {
      state.selectedUniversity = action.payload;
    },
    clearFilters: (state) => {
      state.selectedCategory = null;
      state.selectedGender = null;
      state.selectedCity = null;
      state.selectedUniversity = null;
    },
  },
});

export const { setSelectedCategory, setSelectedGender, setSelectedCity, setSelectedUniversity, clearFilters } = filterSlice.actions;
export default filterSlice.reducer; 


//FİLTER SLICE I SADECE AÇILIŞTAKİ ŞEHİR,ÜNİVERSİTE,CİNSİYET,KATEGORİ SEÇİMİ İÇİNDİR.
