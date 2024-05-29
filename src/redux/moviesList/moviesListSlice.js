import { createSlice } from '@reduxjs/toolkit';
import {
  getMoviesList,
  getGenresMovies,
  getFilteredMoviesByGenre,
  getFilteredMoviesByName,
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

const onPending = state => {
  state.isLoading = true;
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
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

    builder.addCase(getGenresMovies.fulfilled, (state, action) => {
      state.genres = action.payload.genres;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getFilteredMoviesByGenre.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.results = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getFilteredMoviesByName.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.totalPages = action.payload.total_pages;
      state.results = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addMatcher(action => action.type.endsWith('/pending'), onPending);
    builder.addMatcher(action => action.type.endsWith('/rejected'), onRejected);
  },
});

export const moviesListReducer = moviesListSlice.reducer;
