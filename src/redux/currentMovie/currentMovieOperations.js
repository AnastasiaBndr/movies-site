import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../helpers/toastcase';

axios.defaults.baseURL = 'https://api.themoviedb.org';

axios.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4';

export const getMovieById = createAsyncThunk('movie/',
    async (id, thunkAPI) => {
        try {
            
            const res = await axios.get(`/3/movie/${id}`);
            toastSuccess(
                'We did it! Page ' + res.data,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
            
        }
    });
    
export const getMovieVideos = createAsyncThunk('movie/videos',
    async (id, thunkAPI) => {
        try {
            
            const res = await axios.get(`/3/movie/${id}/videos`);
            toastSuccess(
                'We did it! Page ' + res.data,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
            
        }
    });
        
    export const getSeriesVideos = createAsyncThunk('movie//series/videos',
    async (id, thunkAPI) => {
        try {
            
            const res = await axios.get(`/3/tv/${id}/videos`);
            toastSuccess(
                'We did it! Page ' + res.data,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
            
        }
        });
    
export const getMovieCast = createAsyncThunk('movie/cast',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`/3/movie/${id}/credits`);
            toastSuccess(
                'We did it! Page ' + res.data,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
            
        }
    });

export const getSeriesCast= createAsyncThunk('movie/series/cast',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`/3/tv/${id}/credits`);
            toastSuccess(
                'We did it! Page ' + res.data,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
            
        }
    });