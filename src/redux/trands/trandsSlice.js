import { createSlice } from '@reduxjs/toolkit';
import { getTrandingMovies } from './trandsOperations';

const initialState = {
    page: 1,
    results:null,
     isLoading: false,
    isFetching: false,
    totalPages: 0,
  error: null,
}

const trandingsSlice = createSlice({
    name: 'movie',
    initialState,
    extraReducers: builder => {
        builder.addCase(getTrandingMovies.fulfilled, (state, action) => {
            state.page = action.payload.page;
            state.totalPages = action.payload.total_pages;
            state.results = action.payload.results;

            state.isLoading = false;
            state.isFetching = false;
        });

        builder.addCase(getTrandingMovies.pending, (state, action) => {
            state.isLoading = true;
            state.isFetching = true;
        });

        builder.addCase(getTrandingMovies.rejected, (state, action) => {
            state.error = action.payload.error;
        });
    }
})

export const trandingReducer = trandingsSlice.reducer;