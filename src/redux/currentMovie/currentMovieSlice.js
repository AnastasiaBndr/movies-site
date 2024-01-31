import { createSlice } from '@reduxjs/toolkit';
import { getMovieById, getMovieVideos, getSeriesCast, getMovieCast, getSeriesVideos} from './currentMovieOperations';

const initialState = {
    movie: {},
    videos: {},
    cast:{},
    isLoading: false,
    isFetching: false,
  error: null,
};

const currentMovieSlice = createSlice({
    name: 'currentMovie',
    initialState,
    extraReducers: builder => {
        builder.addCase(getMovieById.fulfilled, (state, action) => {
            state.movie = action.payload;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getMovieById.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getMovieById.rejected, (state, action) => {
            state.error = "Do data";
        });

        builder.addCase(getMovieVideos.fulfilled, (state, action) => {
            state.videos = action.payload.results;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getMovieVideos.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getMovieVideos.rejected, (state, action) => {
            state.videos = {};
            state.error = "No data";
        });

        builder.addCase(getMovieCast.fulfilled, (state, action) => {
            state.cast = action.payload;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getMovieCast.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getMovieCast.rejected, (state, action) => {
            state.error = action.payload.error;
        });

        builder.addCase(getSeriesCast.fulfilled, (state, action) => {
            state.cast = action.payload;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getSeriesCast.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getSeriesCast.rejected, (state, action) => {
            state.error = action.payload.error;
        });

         builder.addCase(getSeriesVideos.fulfilled, (state, action) => {
            state.videos = action.payload;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getSeriesVideos.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getSeriesVideos.rejected, (state, action) => {
            state.error = action.payload.error;
        });
    }
})

export const currentMovieReducer = currentMovieSlice.reducer;