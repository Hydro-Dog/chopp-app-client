import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ProfileOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { ChoppShadowButton, useLoginGuard, useThemeSwitcher, useThemeToken } from '@shared/index';
import { RootState } from '@store/store';
import { Flex } from 'antd';

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = (path: string) => location.pathname.includes(path);
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const isEmpty = 0;
  const hasCurrentOrder = 0;
  const { loginGuard } = useLoginGuard();

  const onNavigationClick = (path: string) => {
    loginGuard(() => navigate(path));
  };

  const { themeSwitcher } = useThemeSwitcher();

  return (
    <div className="flex justify-end my-2 gap-2">
      <Flex align="center" gap={12}>
        {themeSwitcher}
        <ChoppShadowButton
          shape="circle"
          variant="outlined"
          icon={<UserOutlined />}
          selected={isLocation('user')}
          onClick={() => {
            onNavigationClick('user');
          }}
        />

        {!hasCurrentOrder && (
          <ChoppShadowButton
            shape={isEmpty ? 'circle' : 'round'}
            variant="outlined"
            icon={<ShoppingCartOutlined />}
            selected={isLocation('cart')}
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
          selected={isLocation('order')}
          onClick={() => {
            onNavigationClick('order');
          }}>
          {!!hasCurrentOrder && 'Мой заказ'}
        </ChoppShadowButton>
      </Flex>
    </div>
  );
};
