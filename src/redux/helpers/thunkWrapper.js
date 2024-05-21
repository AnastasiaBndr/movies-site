import { toastError, toastSuccess } from './toastcase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkWrapper = (name, requestFn) =>
  createAsyncThunk(`${name}`, async (data, thunkAPI) => {
    try {
      const res = await requestFn(data);
      toastSuccess('We did it!');
      return res.data;
    } catch (error) {
      toastError(`Error: ${error.response.data.message}`);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  });
