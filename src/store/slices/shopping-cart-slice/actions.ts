import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse } from '@shared/index';
import { ShoppingCart } from '@shared/types/shopping-cart';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { PostShoppingCartDTO } from './types';

export const postShoppingCart = createAsyncThunk<
  ShoppingCart,
  { newShoppingCart: PostShoppingCartDTO }
>('shoppingCart/postShoppingCart', async ({ newShoppingCart }, thunkAPI) => {
  try {
    const response = await axiosPrivate.post(`/shopping-cart`, newShoppingCart);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        message: 'An unknown error occurred',
      });
    }
  }
});

export const fetchShoppingCart = createAsyncThunk<ShoppingCart>(
  'shoppingCart/fetchShoppingCart',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<ShoppingCart>(`/shopping-cart`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({
          message: 'An unknown error occurred',
        });
      }
    }
  },
);

export const clearShoppingCart = createAsyncThunk(
  'shoppingCart/clearShoppingCart',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(`/shopping-cart/clear`);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({
          message: 'An unknown error occurred',
        });
      }
    }
  },
);
