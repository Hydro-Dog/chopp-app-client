import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ClientAppConfig, useSuperDispatch, useTheme, useThemeToken } from '@shared/index';
import { ShoppingCart } from '@shared/types/shopping-cart';
import { fetchClientAppConfig } from '@store/slices';
import { fetchShoppingCart } from '@store/slices/shopping-cart-slice';
import { RootHeader } from '@widgets/root-header/root-header';
import { Button, Flex, Layout } from 'antd';

const { Content, Footer } = Layout;

export const RootContainer = () => {
  const themeToken = useThemeToken();
  const { superDispatch: fetchShoppingCartDispatch } = useSuperDispatch<ShoppingCart, void>();
  const { superDispatch: fetchClientAppConfigCartDispatch } = useSuperDispatch<
    ClientAppConfig,
    void
  >();

  useEffect(() => {
    fetchShoppingCartDispatch({ action: fetchShoppingCart() });
    fetchClientAppConfigCartDispatch({ action: fetchClientAppConfig() });
  }, []);

  return (
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
          <Button type="link">[Доставка и оплата]</Button>
          <Button type="link">[Описание магазина]</Button>
          <Button type="link">[Публичная оферта]</Button>
          <Button type="link">[Политика конфиденциальности]</Button>
        </Flex>
      </Footer>
    </Flex>
  );
};
