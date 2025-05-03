import { ChoppSubPage } from '@shared/index';
import { Flex } from 'antd';
import { CreateOrderBlock, OrderItemsList } from './components';

const ShoppingCartPage = () => {
  return (
    <ChoppSubPage title="Корзина">
      <Flex gap={32} className="flex-col-reverse md:flex-row">
        <OrderItemsList />
        <CreateOrderBlock />
      </Flex>
    </ChoppSubPage>
  );
};

export default ShoppingCartPage;
