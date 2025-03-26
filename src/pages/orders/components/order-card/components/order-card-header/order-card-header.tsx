import { useTranslation } from 'react-i18next';
import { ChoppOrderStatus } from '@shared/index';
import { Order } from '@shared/types';
import { Flex, Typography } from 'antd';

const { Title } = Typography;

type Props = {
  order?: Order;
};

export const OrderCardHeader = ({ order }: Props) => {
  const { t } = useTranslation();

  return (
    <Flex vertical flex={8}>
      <Flex className="flex-col sm:flex-row sm:justify-between gap-1">
        <Title level={5} className="!font-bold !m-0" type="secondary">
          {t('ORDER')} {order?.id}
        </Title>
        <ChoppOrderStatus status={order?.orderStatus} />
      </Flex>
    </Flex>
  );
};
