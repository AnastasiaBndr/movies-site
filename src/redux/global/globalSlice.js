import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = globalSlice.actions;

export const selectLanguage = state => state.global.language;

export const globalReducer = globalSlice.reducer;
