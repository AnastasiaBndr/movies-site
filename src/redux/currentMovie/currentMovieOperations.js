import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../helpers/toastcase';

const TheMovieDB = axios.create({
  baseURL: 'https://api.themoviedb.org',
  timeout: 1000,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4',
  },
});

export const getVideos = createAsyncThunk(
  'movie/videos',
  async (data, thunkAPI) => {
    try {
      const { id, type } = data;
      const res = await TheMovieDB.get(`/3/${type}/${id}/videos`);
      toastSuccess('We did it! Page ' + res.data, res.data);
      return res.data;
    } catch (error) {
      toastError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getDetails = createAsyncThunk(
  'movie/details',
  async (data, thunkAPI) => {
    try {
      const { id, type } = data;
      const res = await TheMovieDB.get(`/3/${type}/${id}`);
      return res.data;
    } catch (error) {
      toastError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
