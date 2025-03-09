import {
  ClockCircleOutlined,
  HomeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { THEME, useLocationIncludes, useTheme, useThemeToken } from '@shared/index';
import { Button, Flex, Layout } from 'antd';
import { Typography } from 'antd';
import { Space } from 'antd/lib';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { useLocation, useNavigate } from 'react-router-dom';

const { Text } = Typography;
const { Header } = Layout;

export const RootHeader = () => {
  const themeToken = useThemeToken();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = (path: string) => location.pathname === path;

  const onIconClick = (value: string) => {
    navigate(value);
  };

  const isEmpty = 0;

  return (
    <Header
      className="py-0 px-5 flex justify-between items-center"
      style={{
        background: themeToken.colorBgBase,
        borderBottom: `1px solid ${themeToken.colorBorder}`,
      }}>
      <div className="w-full flex items-center gap-5">
        <img
          alt="logo"
          style={{ width: '40px', height: '40px' }}
          src={theme === THEME.DARK ? LogoDark : LogoLight}
        />

        <Space className="hidden sm:block">
          <Flex vertical>
            <Flex gap={5}>
              <ShopOutlined size={10} />
              <Text strong>[location]</Text>
            </Flex>
            <Flex gap={5}>
              <ClockCircleOutlined />
              <Text>[timeStart - timeEnd]</Text>
            </Flex>
          </Flex>
        </Space>
      </div>
      <div className="w-full flex justify-end my-2 gap-2">
        <Button
          shape="circle"
          variant="outlined"
          icon={<HomeOutlined />}
          style={{
            fontWeight: 'bold',
            background: isLocation('/') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
          }}
          onClick={() => {
            onIconClick('/');
          }}
        />
        <Button
          shape="circle"
          variant="outlined"
          icon={<UserOutlined />}
          style={{
            background: isLocation('/user') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
          }}
          onClick={() => {
            onIconClick('user');
          }}
        />
        <Button
          shape={isEmpty ? 'circle' : 'round'}
          variant="outlined"
          icon={<ShoppingCartOutlined />}
          style={{
            background: isLocation('/cart') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
          }}
          onClick={() => {
            onIconClick('cart');
          }}>
          {!isEmpty && '[100p]'}
        </Button>
      </div>
    </Header>
  );
};
