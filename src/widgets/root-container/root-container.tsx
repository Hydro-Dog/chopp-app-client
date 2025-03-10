import { Outlet } from 'react-router-dom';
import { useTheme, useThemeToken } from '@shared/index';
import { RootHeader } from '@widgets/root-header/root-header';
import { Button, Flex, Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export const RootContainer = () => {
  const themeToken = useThemeToken();

  return (
    <Layout className="h-screen">
      <RootHeader />
      <div className="overflow-scroll">
        <Content style={{ background: themeToken.colorBgBase }} className="px-3 pt-4">
          <Outlet />
        </Content>
        <div className="sm:hidden absolute bottom-0 w-full">tabs</div>
        <Footer
          style={{
            background: themeToken.colorBgBase,
            borderTop: `1px solid ${themeToken.colorBorder}`,
            padding: '0 20px',
          }}>
          <Flex vertical gap={5} align="end">
            <Button type="link">[Доставка и оплата]</Button>
            <Button type="link">[Описание магазина]</Button>
            <Button type="link">[Публичная оферта]</Button>
            <Button type="link">[Политика конфиденциальности]</Button>
          </Flex>
        </Footer>
      </div>
    </Layout>
  );
};
