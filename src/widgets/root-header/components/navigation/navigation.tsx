import { useLocation, useNavigate } from 'react-router-dom';
import {
  CarOutlined,
  HomeOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ChoppShadowButton, useLoginGuard, useThemeSwitcher, useThemeToken } from '@shared/index';
import { Button, Flex } from 'antd';
import { RootState } from '@store/store';
import { useRootContext } from '@widgets/root-container/root-provider';
import { useSelector } from 'react-redux';

export const Navigation = () => {
  const themeToken = useThemeToken();
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = (path: string) => location.pathname.includes(path);
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  const onIconClick = (value: string) => {
    navigate(value);
  };
  const isEmpty = 0;
  const hasCurrentOrder = 0;
  const { loginGuard } = useLoginGuard();

  const onNavigationClick = (path: string) => {
    loginGuard(() => navigate(path));
  };

  const { themeSwitcher } = useThemeSwitcher();

  return (
    <div className="flex justify-end my-2 gap-2">
      {/* <Button
        shape="circle"
        variant="outlined"
        icon={<HomeOutlined />}
        style={{
          fontWeight: 'bold',
          background: isLocation('/') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
        }}
        onClick={() => {
            navigate('/');
        }}
      /> */}
      <Flex align="center" gap={12}>
        {themeSwitcher}
        <ChoppShadowButton
          shape="circle"
          variant="outlined"
          icon={<UserOutlined />}
          style={{
            background: isLocation('user') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
          }}
          onClick={() => {
            onNavigationClick('user');
          }}
        />

        {!hasCurrentOrder && (
          <ChoppShadowButton
            shape={isEmpty ? 'circle' : 'round'}
            variant="outlined"
            icon={<ShoppingCartOutlined />}
            style={{
              background: isLocation('cart') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
            }}
            onClick={() => {
              onNavigationClick('cart');
            }}>
            {!isEmpty && `${shoppingCart.totalPrice} ₽`}
          </ChoppShadowButton>
        )}

        <ChoppShadowButton
          shape={hasCurrentOrder ? 'round' : 'circle'}
          variant="outlined"
          icon={hasCurrentOrder ? <TruckOutlined /> : <ProfileOutlined />}
          style={{
            background: isLocation('order') ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
          }}
          onClick={() => {
            onNavigationClick('order');
          }}>
          {!!hasCurrentOrder && 'Мой заказ'}
        </ChoppShadowButton>
      </Flex>
    </div>
  );
};
