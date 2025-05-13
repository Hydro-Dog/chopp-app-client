import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginGuard } from '@shared/hooks';
import { ChoppShadowCard } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Button, Typography } from 'antd';

const { Title } = Typography;

export const CreateOrderBlock = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const { loginGuard } = useLoginGuard();
  const navigate = useNavigate();
  const onNavigationClick = (path: string) => {
    loginGuard(() => navigate(path));
  };

  return (
    <ChoppShadowCard className="md:w-1/4 h-36">
      <Flex className="flex-col justify-between align-center" gap={24}>
        <Flex gap={12} className="md:justify-between items-center">
          <Title level={5} type="secondary" className="!m-0">
            {t('FINAL_AMOUNT')}
          </Title>
          <Title level={5} className="!m-0 !font-extrabold">
            {shoppingCart.totalPrice}₽
          </Title>
        </Flex>

        <Button
          onClick={() => {
            onNavigationClick('/cart/createOrder');
          }}
          disabled={shoppingCart.items.length === 0}
          type="primary"
          size="large">
          {t('MAKE_ORDER')}
        </Button>
      </Flex>
    </ChoppShadowCard>
  );
};
