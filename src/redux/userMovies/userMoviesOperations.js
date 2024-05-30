import axios from 'axios';
import { thunkWrapper } from '../helpers/thunkWrapper';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: 'https://movies-site-api.onrender.com/api',
  timeout: 5000,
});

export const getUserMovies = thunkWrapper('movies/getUserMovies', data => {
  return instance.get(`movies/?_id=${data._id}`);
});

export const addMovieToList = createAsyncThunk(
  'movies/addToList',
  async (data, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem('persist:auth'));

      const res = await instance.post('movies/', data, {
        headers: {
          Authorization: `Bearer ${token ? token.token.split('"')[1] : ''}`,
        },
      });

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const getUserMovieList = createAsyncThunk(
  'movies/getList',
  async (data, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem('persist:auth'));
      const res = await instance.get(`movies/status/${data.type}`, {
        headers: {
          Authorization: `Bearer ${token ? token.token.split('"')[1] : ''}`,
        },
      });

      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
