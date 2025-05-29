import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Alert, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

export const DeliveryPriceAlert = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);

  const { t } = useTranslation();
  const freeThreshold = clientAppConfig?.freeDeliveryThreshold || 0;
  const cartTotal = shoppingCart?.totalPrice || 0;
  const isFreeDelivery = clientAppConfig?.freeDeliveryIncluded && cartTotal >= freeThreshold;

  return (
    <Space direction="vertical" className="w-full mb-6">
      {!isFreeDelivery && (
        <>
          {freeThreshold > 0 && (
            <Alert
              type="warning"
              message={
                <Text>{t('FREE_DELIVERY_REMAINING', { value: freeThreshold - cartTotal })}</Text>
              }
            />
          )}
        </>
      )}
    </Space>
  );
};
