import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { RootState } from '@store/store';
import { EmptyOrderPlaceholder } from './components';
import { OrderCard } from '../order-card';

export const CurrentOrder = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);
  const { orderStatus } = useSelector((state: RootState) => state.notifications);
  const [updatableOrder, setUpdatableOrder] = useState<Order>();

  useEffect(() => {
    if (orderStatus.length) {
      setUpdatableOrder((prev) => {
        const updatedOrder = orderStatus.find((item) => item.payload?.id === prev?.id)
          ?.payload as Order;
        if (updatedOrder && prev) return { ...prev, orderStatus: updatedOrder.orderStatus };
      });
    }
  }, [orderStatus]);

  useEffect(() => {
    if (currentOrder) setUpdatableOrder(currentOrder);
  }, [currentOrder]);

  return (
    <ChoppShadowCard>
      {updatableOrder && updatableOrder?.orderStatus !== ORDER_STATUS.DELIVERED ? (
        <OrderCard isCurrent order={updatableOrder} />
      ) : (
        <EmptyOrderPlaceholder />
      )}
    </ChoppShadowCard>
  );
};
