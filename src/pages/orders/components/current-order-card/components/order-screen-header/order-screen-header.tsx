import { useTranslation } from 'react-i18next';
import { Order, ORDER_STATUS } from '@shared/types';
import { Flex, Typography } from 'antd';
import { ChoppOrderStatus } from '@shared/index';
const { Text, Title } = Typography;
type Props = {
  order?: Order;
};

export const OrderScreenHeader = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex vertical flex={8}>
      <Flex className="flex-col sm:flex-row sm:justify-between gap-1">
        <Title level={5} className="!font-bold !m-0" type="secondary">
          {t('ORDER')} {order?.id}
        </Title>
        <ChoppOrderStatus status={order?.orderStatus} />
      </Flex>

      {/* <Text>
        {t('ORDER_STATUS_TITLE')}:&nbsp;
        {t(
          `ORDER_STATUS.${Object.keys(ORDER_STATUS).find(
            (key) => ORDER_STATUS[key as keyof typeof ORDER_STATUS] === order?.orderStatus,
          )}`,
        )}
      </Text>
      <Text>
        {t('TOTAL_COST')}
        {order?.totalPrice}
        {t('CURRENCY')}
      </Text> */}
    </Flex>
  );
};
