import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Flex } from 'antd';
import { AmountTypography } from './components';

type Props = {
  bottomSlot?: React.ReactNode;
};

export const OrderSummaryBlock = ({ bottomSlot }: Props) => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((s: RootState) => s.shoppingCart);
  const { clientAppConfig } = useSelector((s: RootState) => s.clientAppConfig);

  const deliveryCost = clientAppConfig?.averageDeliveryCost || 0;
  const freeThreshold = clientAppConfig?.freeDeliveryThreshold || 0;
  const cartTotal = shoppingCart?.totalPrice || 0;
  const showDeliveryAlert = clientAppConfig?.freeDeliveryIncluded && cartTotal < freeThreshold;

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={8}>
        <AmountTypography title={t('PRODUCTS')} amount={cartTotal} />
        {!!cartTotal && showDeliveryAlert && <AmountTypography title={t('DELIVERY')} amount={deliveryCost} />}
      </Flex>
      {bottomSlot}
    </Flex>
  );
};
