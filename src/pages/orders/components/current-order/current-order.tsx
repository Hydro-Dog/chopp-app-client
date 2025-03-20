import { useEffect, useState } from 'react';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { EmptyCard, OrderScreen } from './components';

type Props = {
  order: Order | null | undefined;
};

export const CurrentOrder = ({ order }: Props) => {
  const [activeOrder, setActiveOrder] = useState<Order>();

  useEffect(() => {
    if (order && order?.orderStatus !== ORDER_STATUS.DELIVERED) {
      setActiveOrder(order);
    }
  }, [order]);

  return activeOrder && order ? <OrderScreen order={order} /> : <EmptyCard />;
};
