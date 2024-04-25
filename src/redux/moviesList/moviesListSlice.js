import { createSlice } from '@reduxjs/toolkit';
import {
  getMoviesList,
  getGenresMovies,
  getFilteredMoviesByGenre,
} from './moviesListOperations';

const initialState = {
  page: 1,
  results: null,
  isLoading: false,
  isFetching: false,
  totalPages: 0,
  error: null,
  genres: null,
};

const moviesListSlice = createSlice({
  name: 'movie',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMoviesList.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.results = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getMoviesList.pending, (state, action) => {
      state.isLoading = true;
      state.isFetching = true;
    });

    builder.addCase(getMoviesList.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(getGenresMovies.fulfilled, (state, action) => {
      state.genres = action.payload.genres;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getGenresMovies.pending, (state, action) => {
      state.isLoading = true;
      state.isFetching = true;
    });

    builder.addCase(getGenresMovies.rejected, (state, action) => {
      state.error = action.payload.error;
    });

    builder.addCase(getFilteredMoviesByGenre.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.results = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getFilteredMoviesByGenre.pending, (state, action) => {
      state.isLoading = true;
      state.isFetching = true;
    });

    builder.addCase(getFilteredMoviesByGenre.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const moviesListReducer = moviesListSlice.reducer;
