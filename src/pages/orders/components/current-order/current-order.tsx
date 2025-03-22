import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/components';
import { ORDER_STATUS } from '@shared/enum';
import { RootState } from '@store/store';
import { EmptyOrderPlaceholder } from './components';
import { OrderCard } from '../order-card';

export const CurrentOrder = () => {
  const { currentOrder } = useSelector((state: RootState) => state.orders);

  return (
    <ChoppShadowCard>
      {currentOrder && currentOrder?.orderStatus !== ORDER_STATUS.DELIVERED ? (
        <OrderCard isCurrent order={currentOrder} />
      ) : (
        <EmptyOrderPlaceholder />
      )}
    </ChoppShadowCard>
  );
};
