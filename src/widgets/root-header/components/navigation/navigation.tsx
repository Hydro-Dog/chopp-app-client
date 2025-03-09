import { useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useThemeToken } from '@shared/index';
import { Button } from 'antd';

export const Navigation = () => {
  const themeToken = useThemeToken();
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = (path: string) => location.pathname === path;

  const onIconClick = (value: string) => {
    navigate(value);
  };

  const isEmpty = 0;

  return (
    <div className="flex justify-end my-2 gap-2">
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
  );
};
