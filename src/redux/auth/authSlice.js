import { createSlice } from '@reduxjs/toolkit';
import { register } from './authOperations';

const initialState = {
  isLoading: false,
  isFetching: false,
  error: null,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {});

    builder.addCase(register.pending, (state, action) => {});

    builder.addCase(register.rejected, (state, action) => {});
  },
});

export const authReducer = authSlice.reducer;
