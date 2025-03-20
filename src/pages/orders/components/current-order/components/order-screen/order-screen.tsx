import { useTranslation } from 'react-i18next';
import { Order } from '@shared/types';
import { Card, Typography } from 'antd';
import { OrderScreenContent, OrderScreenHeader } from './components';
const { Title } = Typography;
type Props = {
  order: Order;
};

export const OrderScreen = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <Card title={<Title level={4}>{t('CURRENT_ORDER')}</Title>}>
      <OrderScreenHeader order={order} />
      <OrderScreenContent order={order} />
    </Card>
  );
};
