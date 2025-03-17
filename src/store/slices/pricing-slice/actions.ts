import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, ClientAppConfig } from '@shared/types';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';

export const fetchClientAppConfig = createAsyncThunk<
  ClientAppConfig,
  void,
  { rejectValue: ErrorResponse }
>('fetch/client-app-config', async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<ClientAppConfig>('/client-app-config');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
