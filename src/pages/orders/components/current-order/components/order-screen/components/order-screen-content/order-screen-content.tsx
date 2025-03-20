import { useTranslation } from 'react-i18next';
import { Order } from '@shared/types';
import { Card, Flex, Typography } from 'antd';
const { Text } = Typography;
type Props = {
  order: Order;
};
export const OrderScreenContent = ({ order }: Props) => {
  const { t } = useTranslation();
  return (
    <Flex gap={5} className=" overflow-x-scroll">
      {order.items.map((item) => (
        <Card
          key={item.id}
          hoverable
          className="w-44 shrink-0"
          cover={
            <img
              className=" object-contain h-40"
              alt="..."
              src={import.meta.env.VITE_BASE_URL_FILES + item.product.images[0].path}
            />
          }>
          <Flex vertical>
            <Text>
              {t('QUANTITY')}:&nbsp;
              {item.quantity}
            </Text>
            <Text>
              {item.product.price}
              {t('RUB_PIECE')}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};
