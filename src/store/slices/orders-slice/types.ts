import { Order, ORDER_STATUS, PAYMENT_STATUS } from '@shared/index';

export type UpdateOrderDTO = {
  transactionId: string;
  orderStatus?: ORDER_STATUS;
  paymentStatus?: PAYMENT_STATUS;
};

export type CreateOrderDTO = Pick<
  Order,
  'returnUrl' | 'comment' | 'address' | 'name' | 'phoneNumber'
>;
