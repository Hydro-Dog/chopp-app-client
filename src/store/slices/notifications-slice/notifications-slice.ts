import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ClientAppConfig, Order } from '@shared/types';
import { WsMessage } from '@shared/types/ws-message';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';

export type NotificationsState = {
  newOrder: WsMessage<Order>[];
  newPayment: WsMessage[];
  orderStatus: WsMessage<Order>[];
  paymentStatus: WsMessage[];
  clientAppConfigStatus: WsMessage<ClientAppConfig>[];
};

const initialState: NotificationsState = {
  newOrder: [],
  newPayment: [],
  orderStatus: [],
  paymentStatus: [],
  clientAppConfigStatus: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: (state, action: PayloadAction<{ key: keyof typeof initialState }>) => {
      state[action.payload.key] = [];
    },
    pushWsNotification: (state, action: PayloadAction<WsMessage>) => {
      try {
        switch (action.payload?.type) {
          case WS_MESSAGE_TYPE.NEW_ORDER:
            state.newOrder.push(action.payload as WsMessage<Order>);
            break;
          case WS_MESSAGE_TYPE.NEW_PAYMENT:
            state.newPayment.push(action.payload);
            break;
          case WS_MESSAGE_TYPE.ORDER_STATUS:
            state.orderStatus.push(action.payload as WsMessage<Order>);
            break;
          case WS_MESSAGE_TYPE.PAYMENT_STATUS:
            state.paymentStatus.push(action.payload);
            break;
          case WS_MESSAGE_TYPE.CLIENT_APP_CONFIG_STATUS:
            console.log('CLIENT_APP_CONFIG_STATUS', action.payload);
            state.clientAppConfigStatus.push(action.payload);
            break;
          default:
            console.error('Нет обработчика для WS cообщения с типом action.payload?.type');
            break;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export const { clearNotifications, pushWsNotification } = notificationsSlice.actions;
