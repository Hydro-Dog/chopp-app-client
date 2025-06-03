import { useTranslation } from 'react-i18next';
import { ChoppOrderStatus, ChoppTextWithTooltip } from '@shared/index';
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
  return (
    <Flex vertical gap={8}>
      <Flex className="flex-col sm:flex-row sm:justify-between gap-1">
        <Flex align="center" gap={8}>
          <ChoppOrderStatus status={order?.orderStatus} />
          <Title level={5} className="!m-0 !font-extrabold">
            {order?.totalPrice}₽
          </Title>
          <Text type="secondary">{dayjs(order.createdAt).format('DD.MM.YYYY HH:mm')}</Text>
        </Flex>

        <Flex align="center" gap={4} className='w-3xs'>
          <Text className="ml-2">
            id:
          </Text>
          <ChoppTextWithTooltip title={order?.id} copyable showInfoIcon={false} className="!mb-0" />
        </Flex>
      </Flex>
      <OrderCardContent order={order} />
      <Flex className="flex-row sm:flex-row-reverse"></Flex>
    </Flex>
  );
};
