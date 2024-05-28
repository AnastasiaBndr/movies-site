import { createSlice } from '@reduxjs/toolkit';
import { getUserMovies } from './userMoviesOperations';

const initialState = {
  isLoading: false,
  token: null,
  error: null,
  results: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      console.log(action.payload);
      state.results = action.payload;
    });

    builder.addCase(getUserMovies.pending, (state, action) => {});

    builder.addCase(getUserMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
});

export const userMoviesReducer = moviesSlice.reducer;
