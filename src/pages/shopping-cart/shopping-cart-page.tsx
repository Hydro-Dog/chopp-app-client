import { Flex, Typography } from 'antd';
import { CreateOrderBlock, OrderItemsList } from './components';

const { Title } = Typography;

export const ShoppingCartPage = () => {
  return (
    <Flex gap={18} vertical>
      <Title level={3} className="!font-bold !m-0">
        Корзина
      </Title>
      <Flex gap={32} className="flex-col-reverse md:flex-row">
        <OrderItemsList />
        <CreateOrderBlock />
      </Flex>
    </Flex>
  );
};
