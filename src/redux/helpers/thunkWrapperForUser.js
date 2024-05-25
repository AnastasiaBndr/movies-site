import { toastError, toastSuccess } from './toastcase';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const thunkWrapperForUser = (name, requestFn) =>
  createAsyncThunk(`${name}`, async (data, thunkAPI) => {
    try {
      const res = await requestFn(data);
      toastSuccess('You successfully created account!');
      return res.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toastError(`Error: ${errorMessage}`);
      return thunkAPI.rejectWithValue(errorMessage);
    }
  });