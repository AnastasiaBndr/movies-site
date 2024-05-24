import { createSlice } from '@reduxjs/toolkit';
import { getOtherUser, getOtherUserMovies } from './usersOperations';

const initialState = {
  isLoading: false,
  error: null,
  user: {
    name: null,
    email: null,
    username: null,
    avatar: null,
    createdAt: null,
  },
  movies: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder.addCase(getOtherUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getOtherUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getOtherUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(getOtherUserMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getOtherUserMovies.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(getOtherUserMovies.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
  },
});

export const userReducer = userSlice.reducer;
