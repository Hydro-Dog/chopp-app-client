// Название должно совпадать с ключом стора NotificationsState
export enum WS_MESSAGE_TYPE {
  NEW_ORDER = 'newOrder',
  NEW_PAYMENT = 'newPayment',
  ORDER_STATUS = 'orderStatus',
  PAYMENT_STATUS = 'paymentStatus',
  CLIENT_APP_CONFIG_STATUS = 'clientAppConfigStatus',
}
