import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationResponse, FETCH_STATUS } from '@shared/index';
import { createOrder, fetchOrders, updateOrderPaymentStatus } from './actions';

export type OrderState = {
  orders?: PaginationResponse<Order>;
  currentOrder?: Order | null;
  createOrderStatus: FETCH_STATUS;
  createOrderError: ErrorResponse | null;
  fetchOrdersStatus: FETCH_STATUS;
  fetchOrdersError: ErrorResponse | null;
  updateOrderPaymentStatusStatus: FETCH_STATUS;
  updateOrderPaymentStatusError: ErrorResponse | null;
};

const initialState: OrderState = {
  orders: undefined,
  currentOrder: null,
  fetchOrdersStatus: FETCH_STATUS.IDLE,
  fetchOrdersError: null,
  createOrderStatus: FETCH_STATUS.IDLE,
  createOrderError: null,
  updateOrderPaymentStatusStatus: FETCH_STATUS.IDLE,
  updateOrderPaymentStatusError: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchOrdersStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.fetchOrdersStatus = FETCH_STATUS.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchOrdersStatus = FETCH_STATUS.ERROR;
        state.fetchOrdersError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(updateOrderPaymentStatus.pending, (state) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.LOADING;
      })
      .addCase(updateOrderPaymentStatus.fulfilled, (state) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(updateOrderPaymentStatus.rejected, (state, action) => {
        state.updateOrderPaymentStatusStatus = FETCH_STATUS.ERROR;
        state.updateOrderPaymentStatusError = action.payload ?? {
          message: 'Unknown error',
        };
      })
      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.createOrderStatus = FETCH_STATUS.SUCCESS;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.ERROR;
        state.createOrderError = (action.payload as ErrorResponse) ?? {
          message: 'Failed to fetch user information',
        };
      });
  },
});
