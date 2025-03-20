import { useTranslation } from 'react-i18next';
import { Order, ORDER_STATUS } from '@shared/types';
import { Flex, Typography } from 'antd';
const { Text } = Typography;
type Props = {
  order: Order;
};

export const OrderScreenHeader = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <Flex vertical>
      <Text>
        {t('ORDERS_ID')}
        {order.id}
      </Text>
      <Text>
        {t('ORDER_STATUS_TITLE')}:&nbsp;
        {t(
          `ORDER_STATUS.${Object.keys(ORDER_STATUS).find(
            (key) => ORDER_STATUS[key as keyof typeof ORDER_STATUS] === order.orderStatus,
          )}`,
        )}
      </Text>
      <Text>
        {t('TOTAL_COST')}
        {order.totalPrice}
        {t('CURRENCY')}
      </Text>
    </Flex>
  );
};
