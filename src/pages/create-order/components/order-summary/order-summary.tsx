import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ChoppShadowCard } from '@shared/index';
import { RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';
import { OrderSummaryBlock } from '@widgets/index';
const { Title } = Typography;

export const OrderSummary = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  return (
    <ChoppShadowCard className="md:w-1/4 h-36">
      <Flex className="flex flex-col justify-between align-center" gap={24}>
        <OrderSummaryBlock /> 
        <Button htmlType="submit" type="primary" size="large">
          {t('MAKE_PAYMENT')}
        </Button>
      </Flex>
    </ChoppShadowCard>
  );
};
