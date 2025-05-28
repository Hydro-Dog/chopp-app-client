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
  const { clientAppConfig } = useSelector((s: RootState) => s.clientAppConfig);

  /* ---------- условия доставки ---------- */
  const deliveryCost = clientAppConfig?.averageDeliveryCost || 0;
  const freeThreshold = clientAppConfig?.freeDeliveryThreshold || 0;
  const cartTotal = shoppingCart?.totalPrice || 0;
  const showDeliveryAlert = clientAppConfig?.freeDeliveryIncluded && cartTotal < freeThreshold;

  return (
    <ChoppShadowCard className="md:w-1/4 h-fit">
      <Flex className="flex flex-col justify-between align-center" gap={24}>
        <OrderSummaryBlock />
        <Button htmlType="submit" type="primary" size="large">
          {t('MAKE_PAYMENT')}{' '}
          <div className="font-extrabold">
            {showDeliveryAlert ? shoppingCart.totalPrice + deliveryCost : shoppingCart.totalPrice}₽
          </div>
        </Button>
      </Flex>
    </ChoppShadowCard>
  );
};
