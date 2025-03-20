import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorResponse, Order, PaginationResponse, FETCH_STATUS } from '@shared/index';
import { createOrder, fetchLastOrder, fetchOrders, updateOrderPaymentStatus } from './actions';

export type OrderState = {
  orders?: PaginationResponse<Order>;
  currentOrder?: Order | null;
  createOrderStatus: FETCH_STATUS;
  createOrderError: ErrorResponse | null;
  fetchOrdersStatus: FETCH_STATUS;
  fetchLastOrderStatus: FETCH_STATUS;
  fetchLastOrderError: ErrorResponse | null;
  fetchOrdersError: ErrorResponse | null;
  updateOrderPaymentStatusStatus: FETCH_STATUS;
  updateOrderPaymentStatusError: ErrorResponse | null;
  fetchMyOrdersStatus: FETCH_STATUS;
  fetchMyOrdersError: ErrorResponse | null;
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
  fetchLastOrderStatus: FETCH_STATUS.IDLE,
  fetchLastOrderError: null,
  fetchMyOrdersStatus: FETCH_STATUS.IDLE,
  fetchMyOrdersError: null,
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<PaginationResponse<Order>>) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.SUCCESS;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.ERROR;
        state.fetchMyOrdersError = action.payload ?? {
          message: 'Failed to fetch user information',
        };
      })
      .addCase(fetchLastOrder.pending, (state) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchLastOrder.fulfilled, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
        state.currentOrder = action.payload;
      })
      .addCase(fetchLastOrder.rejected, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
        state.fetchLastOrderError = (action.payload as ErrorResponse) ?? {
          message: 'Failed to fetch user information',
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
