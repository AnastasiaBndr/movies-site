import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastError, toastSuccess } from '../helpers/toastcase';

axios.defaults.baseURL = 'https://api.themoviedb.org';

axios.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNGRiNWJkN2U5YWExY2M0MzBhZjAwYzVhMDU2ZDAxMCIsInN1YiI6IjY1MTJjM2YyOGUyYmE2MDEwMTlmZjg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7zJPhqUXyDij87cKqpJpgtQnm376t0iMEdo8YRFnUG4';

export const getTrandingMovies = createAsyncThunk('movies/tranding',
    async (data, thunkAPI) => {
        const { page } = data;
        try {
            
            const res = await axios.get(`/3/trending/all/week?language=en-US&page=${page}`);
            toastSuccess(
                'We did it! Page '+ res.data.page,
                res.data);
            return res.data;
        } catch (error) {
            toastError(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
            
    }
})