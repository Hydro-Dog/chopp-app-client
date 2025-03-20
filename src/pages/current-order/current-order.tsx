import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { AppDispatch, RootState } from '@store/store';
import { fetchLastOrder } from '@store/slices';
import { EmptyCard, OrderScreen } from './components';

export const CurrentOrder = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);
  const [activeOrder, setActiveOrder] = useState<Order>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLastOrder());
  }, []);

  useEffect(() => {
    if (currentOrder && currentOrder?.orderStatus !== ORDER_STATUS.DELIVERED) {
      setActiveOrder(currentOrder);
    }
  }, [currentOrder]);

  return activeOrder ? (
    <OrderScreen order={activeOrder} />
  ) : (
    <EmptyCard message="noOrdersInProcessing" />
  );
};
