import { useTranslation } from 'react-i18next';
import { ChoppOrderStatus } from '@shared/index';
import { Order } from '@shared/types';
import { Flex, Typography } from 'antd';
import dayjs from 'dayjs';
import { OrderCardContent } from './components';

const { Title, Text } = Typography;
type Props = {
  order: Order;
  isCurrent?: boolean;
};

export const OrderCard = ({ isCurrent, order }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={8}>
      <Flex className="flex-col sm:flex-row sm:justify-between gap-1">
        <Flex align="center" gap={8}>
          <Title level={5} className="!font-bold !m-0 ml-2">
            {isCurrent ? 'Текущий' : 'Заказ'} #{order?.id}
          </Title>
          <Text type="secondary">{dayjs(order.createdAt).format('DD.MM.YYYY HH:mm')}</Text>
        </Flex>

        <Flex vertical gap={8}>
          <ChoppOrderStatus status={order?.orderStatus} />
        </Flex>
      </Flex>

      <OrderCardContent order={order} />

      <Flex className="flex-row sm:flex-row-reverse">
        <Title level={5} className="!m-0 !font-extrabold">
          {order?.totalPrice}₽
        </Title>
      </Flex>
    </Flex>
  );
};
