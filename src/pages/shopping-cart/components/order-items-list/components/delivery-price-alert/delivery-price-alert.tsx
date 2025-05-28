import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Alert, Space, Typography } from 'antd';

const { Text } = Typography;

export const DeliveryPriceAlert = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);

  const deliveryCost = clientAppConfig?.averageDeliveryCost || 0;
  const freeThreshold = clientAppConfig?.freeDeliveryThreshold || 0;
  const cartTotal = shoppingCart?.totalPrice || 0;
  const isFreeDelivery = clientAppConfig?.freeDeliveryIncluded && cartTotal >= freeThreshold;

  return (
    <Space direction="vertical" className="w-full mt-6">
      {!isFreeDelivery && (
        <>
          {freeThreshold > 0 && (
            <Alert
              type="info"
              message={
                <Text>Закажите ещё на {freeThreshold - cartTotal}₽ для бесплатной доставки</Text>
              }
              showIcon
            />
          )}
        </>
      )}
    </Space>
  );
};
