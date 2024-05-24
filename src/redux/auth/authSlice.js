import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  logIn,
  findByEmail,
  findByUserName,
  logOut,
  refreshCurrentUser,
} from './authOperations';

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  error: null,
  user: {
    name: null,
    email: null,
    username: null,
    avatar: null,
    createdAt: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(logIn.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });

    builder.addCase(logIn.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(findByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    });

    builder.addCase(findByEmail.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });

    builder.addCase(findByEmail.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(findByUserName.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(findByUserName.pending, (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
    });

    builder.addCase(findByUserName.rejected, (state, action) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(logOut.fulfilled, (state, action) => {
      state.user = {
        name: null,
        email: null,
        username: null,
        avatar: null,
        createdAt: null,
      };
      state.token = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    });

    builder.addCase(logOut.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(logOut.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(refreshCurrentUser.fulfilled, (state, action) => {
      state.user = { ...action.payload };
      state.isLoading = false;
      state.isLoggedIn = true;
    });

    builder.addCase(refreshCurrentUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(refreshCurrentUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const authReducer = authSlice.reducer;
