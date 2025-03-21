import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { RootState } from '@store/store';
import { EmptyOrderPlaceholder } from './components';
import { CurrentOrderCard } from '../current-order-card';

export const CurrentOrder = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);

  console.log('currentOrder: ', currentOrder)

  return (
    <ChoppShadowCard>
      {currentOrder && currentOrder?.orderStatus !== ORDER_STATUS.DELIVERED ? (
        <CurrentOrderCard order={currentOrder} />
      ) : (
        <EmptyOrderPlaceholder />
      )}
    </ChoppShadowCard>
  );
};
