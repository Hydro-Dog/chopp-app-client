import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { TitlePage } from '@shared/components';
import { fetchLastOrder, fetchOrders } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Flex } from 'antd';
import { AllOrders, CurrentOrder } from './components';

export const OrdersPage = () => {
  const { currentOrder, orders } = useSelector((state: RootState) => state.orders);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchLastOrder());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <TitlePage title={t('ORDERS')}>
      <Flex vertical gap={5}>
        <CurrentOrder order={currentOrder} />
        <AllOrders orders={orders} />
      </Flex>
    </TitlePage>
  );
};
