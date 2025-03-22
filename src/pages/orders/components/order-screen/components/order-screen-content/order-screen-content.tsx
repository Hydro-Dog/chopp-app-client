import { useTranslation } from 'react-i18next';
import { Order } from '@shared/types';
import { Card, Flex, Spin, Typography } from 'antd';
const { Text } = Typography;
type Props = {
  order: Order;
};
export const OrderScreenContent = ({ order }: Props) => {
  const { t } = useTranslation();

  if (order.items === undefined)
    return (
      <div className="flex flex-col items-center mt-5">
        <Spin size="default" />
      </div>
    );

  return (
    <Flex gap={5} className=" overflow-x-scroll">
      {order.items.map((item) => (
        <Card
          key={item.id}
          hoverable
          className="w-44 shrink-0"
          cover={
            <img
              className=" object-contain aspect-video"
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
