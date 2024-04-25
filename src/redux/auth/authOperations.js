import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../helpers/toastcase';

const insrance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com',
  timeout: 1000,
  headers: { Authorization: '' },
});

//axios.defaults.baseURL = 'https://movies-site-api.onrender.com';

//axios.defaults.headers.common.Authorization = '';

export const register = createAsyncThunk('auth', async (data, thunkAPI) => {});
