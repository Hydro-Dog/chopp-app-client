import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ORDER_STATUS } from '@shared/enum';
import { Order } from '@shared/types';
import { Card, Typography } from 'antd';
import { EmptyCard } from './components';
import { OrderScreen } from '../order-screen';
const { Title } = Typography;
type Props = {
  order: Order | null | undefined;
};

export const CurrentOrder = ({ order }: Props) => {
  const [activeOrder, setActiveOrder] = useState<Order>();
  const { t } = useTranslation();

  useEffect(() => {
    if (order && order?.orderStatus !== ORDER_STATUS.DELIVERED) {
      setActiveOrder(order);
    }
  }, [order]);

  return activeOrder && order ? (
    <Card title={<Title level={4}>{t('CURRENT_ORDER')}</Title>}>
      <OrderScreen order={order} />
    </Card>
  ) : (
    <EmptyCard />
  );
};
