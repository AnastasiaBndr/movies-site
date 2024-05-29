import { createSlice } from '@reduxjs/toolkit';
import { getVideos, getDetails, getReviews } from './currentMovieOperations';

const initialState = {
  movie: {},
  videos: null,
  cast: {},
  reviews: {},
  details: null,
  isLoading: false,
  isFetching: false,
  error: null,
};

const onPending = state => {
  state.isLoading = true;
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const currentMovieSlice = createSlice({
  name: 'currentMovie',
  initialState,
  extraReducers: builder => {
    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.videos = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getDetails.fulfilled, (state, action) => {
      state.details = action.payload;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addCase(getReviews.fulfilled, (state, action) => {
      state.reviews = action.payload.results;

      state.isLoading = false;
      state.isFetching = false;
    });

    builder.addMatcher(action => action.type.endsWith('/pending'), onPending);
    builder.addMatcher(action => action.type.endsWith('/rejected'), onRejected);
  },
});

export const currentMovieReducer = currentMovieSlice.reducer;
