import { createAsyncThunk } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationRequestQuery } from '@shared/types';
import { createFetchPaginationListThunkAction } from '@shared/utils';
import { axiosPrivate } from '@store/middleware';
import axios from 'axios';
import { CreateOrderDTO, UpdateOrderDTO } from './types';

export const fetchOrders = createFetchPaginationListThunkAction<
  Order,
  PaginationRequestQuery,
  ErrorResponse
>({
  actionName: 'orders/fetchOrders',
  endpoint: '/orders',
});

export const updateOrderPaymentStatus = createAsyncThunk<
  Order, // Тип успешного ответа
  UpdateOrderDTO, // Тип параметров запроса
  { rejectValue: ErrorResponse } // Тип для ошибок
>('orders/updateOrderPaymentStatus', async (updateData, thunkAPI) => {
  try {
    const response = await axiosPrivate.post<Order>(
      '/orders/update-order-payment-status',
      updateData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});
export const fetchLastOrder = createAsyncThunk<Order>('/fetchLastOrder', async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Order>('/orders/lastOrder');
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

export const createOrder = createAsyncThunk<Order, CreateOrderDTO>(
  '/createOrder',
  async (
    { returnUrl = `${window.location.origin}/orders`, comment, address, name, phoneNumber },
    thunkAPI,
  ) => {
    try {
      const response = await axiosPrivate.post<Order>(`/orders`, {
        returnUrl,
        comment,
        address,
        name,
        phoneNumber,
      });

      return response.data;
    } catch (error) {
      console.log('axios error: ', error);
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
