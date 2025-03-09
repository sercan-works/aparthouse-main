import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Apart, mockAparts } from '@/data/apart';



interface ApartState {
    aparts: Apart[];
    selectedApart: Apart | null;
    compareApart: Apart[];
}

const initialState: ApartState = {
    aparts: mockAparts,
    selectedApart: null,
    compareApart: [],
};

const apartSlice = createSlice({
    name: 'apart',
    initialState,
    reducers: {
        getAparts: (state) => {
            state.aparts = mockAparts;
        },
    },
});

export const { getAparts } = apartSlice.actions;
export default apartSlice.reducer;

