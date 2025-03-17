import { configureStore } from '@reduxjs/toolkit';
import { wsMiddleware } from './middleware/ws-middleware';
import {
  chatSlice,
  ChatsState,
  userSlice,
  UserState,
  wsSlice,
  WsState,
  productSlice,
  ProductsState,
  ordersSlice,
  OrderState,
  ClientAppConfigState,
  PaymentsState,
  paymentsSlice,
  NotificationsState,
  notificationsSlice,
  clientAppConfigSlice,
} from './slices/';
import { productCategorySlice, ProductCategoryState } from './slices/product-category-slice';
import { shoppingCartSlice, ShoppingCartState } from './slices/shopping-cart-slice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chatsRepository: chatSlice.reducer,
    productCategory: productCategorySlice.reducer,
    products: productSlice.reducer,
    orders: ordersSlice.reducer,
    clientAppConfig: clientAppConfigSlice.reducer,
    payments: paymentsSlice.reducer,
    notifications: notificationsSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chatsRepository: ChatsState;
  productCategory: ProductCategoryState;
  products: ProductsState;
  orders: OrderState;
  payments: PaymentsState;
  clientAppConfig: ClientAppConfigState;
  notifications: NotificationsState;
  shoppingCart: ShoppingCartState;
};

export type AppDispatch = typeof store.dispatch;
