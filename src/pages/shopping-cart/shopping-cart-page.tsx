import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChoppSubPage } from '@shared/index';
import { RootState } from '@store/store';
import { Flex } from 'antd';
import { CreateOrderBlock, EmptyShoppingCart, OrderItemsList } from './components';

const ShoppingCartPage = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  return (
    <ChoppSubPage title={t('BIN')}>
      <Flex gap={32} className="flex-col-reverse md:flex-row">
        {shoppingCart.items.length !== 0 ? <OrderItemsList /> : <EmptyShoppingCart />}
        <CreateOrderBlock />
      </Flex>
    </ChoppSubPage>
  );
};

export default ShoppingCartPage;
