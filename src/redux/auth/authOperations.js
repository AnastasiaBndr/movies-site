import axios from 'axios';
import { thunkWrapperForUser } from '../helpers/thunkWrapperForUser';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com/api',
  timeout: 5000,
});
const token = {
  set(token) {
    instance.defaults.headers.common.Authorization = `Bearer: ${token}`;
  },
  unset() {
    instance.defaults.headers.common.Authorization = '';
  },
  get() {
    return instance.defaults.headers.common.Authorization.split(' ')[1];
  },
};

export const register = thunkWrapperForUser('auth/register', data => {
  return instance.post('auth/register', data);
});

export const logIn = createAsyncThunk('auth/logIn', async (data, thunkAPI) => {
  try {
    console.log('Sending request:', data);
    const res = await instance.post('auth/auth', data);
    console.log('Received response:', res.data);
    token.set(res.data.token);
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const findByEmail = thunkWrapperForUser('auth/findByEmail', data => {
  const { email } = data;
  return instance.get(`auth/email/${email}`);
});
export const findByUserName = thunkWrapperForUser(
  'auth/findByUsername',
  data => {
    const { username } = data;
    return instance.get(`auth/username/${username}`);
  }
);

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (data, thunkAPI) => {
    try {
      const res = await instance.post('auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token.get()}`,
        },
      });
      token.unset();
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const refreshCurrentUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue('Unable to get user');
    }

    token.set(persistedToken);

    try {
      const res = await instance.get('auth/current', {
        headers: {
          Authorization: `Bearer ${token.get()}`,
        },
      });
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
