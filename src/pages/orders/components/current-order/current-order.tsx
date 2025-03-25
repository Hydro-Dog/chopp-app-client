import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { useWsNotification } from '@shared/index';
import { Order } from '@shared/types';
import { RootState } from '@store/store';
import { EmptyOrderPlaceholder } from './components';
import { OrderCard } from '../order-card';

export const CurrentOrder = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);
  const { orderStatus } = useSelector((state: RootState) => state.notifications);
  const [order, setOrder] = useState<Order>();
  const { lastMessage: orderStatusChangeNotification } = useWsNotification<Order>('orderStatus');

  useEffect(() => {
    if (orderStatusChangeNotification?.payload?.orderStatus) {
      //@ts-ignore
      setOrder((prev) => ({
        ...prev,
        orderStatus: orderStatusChangeNotification?.payload?.orderStatus,
      }));
    }
  }, [orderStatus, orderStatusChangeNotification?.payload?.orderStatus]);

  useEffect(() => {
    if (currentOrder) setOrder(currentOrder);
  }, [currentOrder]);

  return (
    <ChoppShadowCard>
      {order && order?.orderStatus !== ORDER_STATUS.DELIVERED ? (
        <OrderCard isCurrent order={order} />
      ) : (
        <EmptyOrderPlaceholder />
      )}
    </ChoppShadowCard>
  );
};
