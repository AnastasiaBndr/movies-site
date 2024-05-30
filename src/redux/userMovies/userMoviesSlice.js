import { createSlice } from '@reduxjs/toolkit';
import { getUserMovies, getUserMovieList } from './userMoviesOperations';

const initialState = {
  isLoading: false,
  token: null,
  error: null,
  results: null,
  resultsFiltered: null,
};

const onPending = state => {
  state.isLoading = true;
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  extraReducers: builder => {
    builder.addCase(getUserMovies.fulfilled, (state, action) => {
      state.isLoading = false;
      state.results = action.payload;
    });

    builder.addCase(getUserMovieList.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action);
      state.resultsFiltered = action.payload;
    });

    builder.addMatcher(action => action.type.endsWith('/pending'), onPending);
    builder.addMatcher(action => action.type.endsWith('/rejected'), onRejected);
  },
});

export const userMoviesReducer = moviesSlice.reducer;
