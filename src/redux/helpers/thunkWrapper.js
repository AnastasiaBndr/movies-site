import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkWrapper = (name, requestFn) =>
  createAsyncThunk(`${name}`, async (data, thunkAPI) => {
    try {
      const res = await requestFn(data);
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  });
