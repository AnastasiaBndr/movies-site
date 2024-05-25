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

const onPending = state => {
  state.isLoading = true;
  state.error = null;
};

const onRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });

    builder.addCase(logIn.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.isLoading = false;
    });

    builder.addCase(findByEmail.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isLoading = false;
    });

    builder.addCase(findByEmail.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(findByEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(findByUserName.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(findByUserName.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(findByUserName.rejected, (state, action) => {
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

    builder.addCase(refreshCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
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

    builder.addMatcher(action => action.type.endsWith('/pending'), onPending);
    builder.addMatcher(action => action.type.endsWith('/rejected'), onRejected);
  },
});

export const authReducer = authSlice.reducer;
