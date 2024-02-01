import { createSlice } from '@reduxjs/toolkit';
import { getVideos,getDetails} from './currentMovieOperations';

const initialState = {
    movie: {},
    videos: null,
    cast: {},
    details: null,
    isLoading: false,
    isFetching: false,
  error: null,
};

const currentMovieSlice = createSlice({
    name: 'currentMovie',
    initialState,
    extraReducers: builder => {
        
        builder.addCase(getVideos.fulfilled, (state, action) => {
            state.videos = action.payload.results;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getVideos.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getVideos.rejected, (state, action) => {
            state.error = "Do data";
        });

        builder.addCase(getDetails.fulfilled, (state, action) => {
            console.log(action.payload);
            state.details = action.payload;

            state.isLoading = false;
            state.isFetching = false;
        });
        builder.addCase(getDetails.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });
        builder.addCase(getDetails.rejected, (state, action) => {
            state.error = "Do data";
        });

    }
})

export const currentMovieReducer = currentMovieSlice.reducer;