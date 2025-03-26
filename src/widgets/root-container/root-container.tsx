import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import {
  ClientAppConfig,
  Order,
  useSuperDispatch,
  useThemeToken,
  useWsNotification,
} from '@shared/index';
import { ShoppingCart } from '@shared/types/shopping-cart';
import { fetchClientAppConfig } from '@store/slices';
import { fetchShoppingCart } from '@store/slices/shopping-cart-slice';
import { RootHeader } from '@widgets/root-header/root-header';
import { Button, Flex, Layout, message } from 'antd';

const { Content, Footer } = Layout;

export const RootContainer = () => {
  const themeToken = useThemeToken();
  const { superDispatch: fetchShoppingCartDispatch } = useSuperDispatch<ShoppingCart, void>();
  const { superDispatch: fetchClientAppConfigCartDispatch } = useSuperDispatch<
    ClientAppConfig,
    void
  >();

  const [messageApi, contextHolder] = message.useMessage();
  const { lastMessage: orderStatusChangeNotification } = useWsNotification<Order>('orderStatus');

  // TODO: вынести нотификации в отдельный компонент
  // TODO: сделать обработку разных видов нотификаций

  useEffect(() => {
    if (orderStatusChangeNotification) {
      messageApi.open({
        type: 'success',
        content: `Статус заказа обновлен - ${orderStatusChangeNotification.payload?.orderStatus}`,
      });
    }
  }, [messageApi, orderStatusChangeNotification]);

  useEffect(() => {
    fetchShoppingCartDispatch({ action: fetchShoppingCart() });
    fetchClientAppConfigCartDispatch({ action: fetchClientAppConfig() });
  }, []);

  return (
    <>
      <Flex vertical className="min-h-screen">
        <div className="sticky top-0 z-50">
          <RootHeader className="h-14" />
        </div>

        <Content style={{ background: themeToken.colorBgBase }} className="px-4 pt-6 flex-auto">
          <Outlet />
        </Content>

        <Footer
          className="px-4"
          style={{
            background: themeToken.colorBgBase,
            borderTop: `1px solid ${themeToken.colorBorder}`,
          }}>
          <Flex vertical gap={5} align="end">
            <Button type="link" href="/delivery">
              Доставка и оплата
            </Button>
            <Button type="link" href="/description">
              О нас
            </Button>
            <Button type="link" href="/publicOffer">
              Публичная оферта
            </Button>
            {/* <Button type="link">[Политика конфиденциальности]</Button> */}
          </Flex>
        </Footer>
      </Flex>

      {/* TODO: вынести нотификации в отдельный компонент */}
      {contextHolder}
    </>
  );
};
