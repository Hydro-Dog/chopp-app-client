import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/index';
import { RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';
const { Title } = Typography;

export const OrderButtonBlock = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  return (
    <ChoppShadowCard className="md:w-1/4 h-36">
      <Flex className="flex flex-col justify-between align-center" gap={24}>
        <Flex gap={12} className="md:justify-between items-center">
          <Title level={5} type="secondary" className="!m-0">
            {t('FINAL_AMOUNT')}
          </Title>
          <Title level={5} className="!m-0 !font-extrabold">
            {shoppingCart.totalPrice}₽
          </Title>
        </Flex>
        <Button htmlType="submit" type="primary" size="large">
          {t('MAKE_PAYMENT')}
        </Button>
      </Flex>
    </ChoppShadowCard>
  );
};
