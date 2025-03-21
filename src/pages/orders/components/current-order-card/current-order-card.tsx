import { Order } from '@shared/types';
import { OrderScreenContent } from './components';
import { Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { ChoppOrderStatus } from '@shared/index';

const { Title } = Typography;
type Props = {
  order: Order;
};

export const CurrentOrderCard = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={8}>
      <Flex className="flex-col sm:flex-row sm:justify-between gap-1">
        <Flex gap={8}>
          <Title level={5} className="!font-bold !m-0" type="secondary">
            Текущий #{order?.id}
          </Title>
          {/* <Title level={5} className="!m-0 !font-extrabold">
            {order?.totalPrice}₽
          </Title> */}
        </Flex>

        <Flex vertical gap={8}>
          <ChoppOrderStatus status={order?.orderStatus} />
          {/* <Title level={5} className="!m-0 !font-extrabold">
            {order?.totalPrice}₽
          </Title> */}
        </Flex>
      </Flex>

      <OrderScreenContent order={order} />
      <Flex className="flex-row sm:flex-row-reverse">
        <Title level={5} className="!m-0 !font-extrabold">
          {order?.totalPrice}₽
        </Title>
      </Flex>
    </Flex>
  );
};
