import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ChoppSubPage } from '@shared/components';
import { useSuperDispatch, useWsNotification } from '@shared/hooks';
import { Order, PaginationResponse } from '@shared/types';
import { fetchLastOrder, fetchOrders } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Flex } from 'antd';
import { AllOrders, CurrentOrder } from './components';
import { ORDER_STATUS } from '@shared/index';

const OrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const superDispatch = useSuperDispatch();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [arrayOfOrders, updateArrayOfOrders] = useState<Order[] | undefined>(undefined);
  const { lastMessage: orderStatusChangeNotification } = useWsNotification<Order>('orderStatus');
  const { currentOrder } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (
      currentOrder &&
      orderStatusChangeNotification?.payload?.orderStatus === ORDER_STATUS.DELIVERED
    ) {
      const deliveredOrder: Order = {
        ...currentOrder,
        orderStatus: orderStatusChangeNotification.payload.orderStatus,
      };
      updateArrayOfOrders((prev) => (prev ? [deliveredOrder, ...prev] : [deliveredOrder]));
    }
  }, [orderStatusChangeNotification?.payload?.orderStatus]);

  useEffect(() => {
    dispatch(fetchLastOrder());
    superDispatch.superDispatch({
      action: fetchOrders({
        page: page,
        limit: 10,
      }),
      thenHandler: (value) => {
        const newValue = value as PaginationResponse<Order>;
        updateArrayOfOrders(newValue.items);
      },
    });
    setPage((prev) => prev + 1);
  }, [dispatch]);

  return (
    <ChoppSubPage title={t('ORDERS')}>
      <Flex vertical gap={24}>
        <CurrentOrder />
        <AllOrders
          updateOrders={updateArrayOfOrders}
          setPage={setPage}
          page={page}
          arrayOrders={arrayOfOrders}
        />
      </Flex>
    </ChoppSubPage>
  );
};

export default OrdersPage;
