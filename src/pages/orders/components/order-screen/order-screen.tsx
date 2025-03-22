import { Order } from '@shared/types';
import { OrderScreenContent, OrderScreenHeader } from './components';
type Props = {
  order: Order;
};

export const OrderScreen = ({ order }: Props) => {
  return (
    <>
      <OrderScreenHeader order={order} />
      <OrderScreenContent order={order} />
    </>
  );
};
