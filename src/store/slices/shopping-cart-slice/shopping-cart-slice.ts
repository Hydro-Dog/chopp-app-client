import { createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS, ErrorResponse } from '@shared/types';
import { ShoppingCart } from '@shared/types/shopping-cart';
import { clearShoppingCart, fetchShoppingCart, postShoppingCart } from './actions';

export type ShoppingCartState = {
  shoppingCart: ShoppingCart;
  fetchShoppingCartStatus: FETCH_STATUS;
  fetchShoppingCartError: ErrorResponse | null;
};

const initialState: ShoppingCartState = {
  shoppingCart: { items: [], quantity: 0, totalPrice: 0 },
  fetchShoppingCartStatus: FETCH_STATUS.IDLE, //мне давал ошибку при FETCH_STATUS.IDLE
  fetchShoppingCartError: null,
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    resetShoppingCart: (state) => {
      state.shoppingCart = { items: [], quantity: 0, totalPrice: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(postShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.shoppingCart = action.payload || { items: [] };
      })
      .addCase(postShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })
      .addCase(fetchShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.shoppingCart = action.payload || { items: [] };
      })
      .addCase(fetchShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })
      .addCase(clearShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(clearShoppingCart.fulfilled, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.shoppingCart = { items: [], quantity: 0, totalPrice: 0 };
      })
      .addCase(clearShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      });
  },
});

export const { resetShoppingCart } = shoppingCartSlice.actions;
