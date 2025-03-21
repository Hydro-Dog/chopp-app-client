import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/index';
import { RootState } from '@store/store';
import { Alert, Button, Flex, Typography } from 'antd';

const { Title } = Typography;

type Props = {
  error: string | undefined;
};

export const OrderButtonBlock = ({ error }: Props) => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  return (
    <ChoppShadowCard className="md:w-1/4 h-36">
      <Flex vertical gap={12}>
        <Flex className="flex-row md:flex-col justify-between align-center" gap={24}>
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
        {error !== undefined && <Alert description={error} type="error" />}
      </Flex>
    </ChoppShadowCard>
  );
};
