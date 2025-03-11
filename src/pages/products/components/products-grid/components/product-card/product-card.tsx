import { useTranslation } from 'react-i18next';
import { PlusOutlined } from '@ant-design/icons';
import { Product } from '@shared/types';
import { Badge, Button, Flex, Typography, Card } from 'antd';

const { Text } = Typography;

type Props = {
  item: Product;
};

export const ProductCard = ({ item }: Props) => {
  const { t } = useTranslation();
  const isShoppingCartItem = 1;

  return (
    <Card
      size="small"
      styles={{
        body: { padding: '8px' },
      }}
      hoverable
      cover={
        <div className="flex h-40 items-center justify-center overflow-hidden">
          <img
            className="aspect-video object-cover"
            alt={item.title}
            src={import.meta.env.VITE_BASE_URL_FILES + item.images[0].path}
          />
        </div>
      }>
      <Flex gap={2} vertical>
        <Text strong>{item.title}</Text>

        <Text className="h-14 overflow-hidden text-ellipsis line-clamp-3 text-sm">
          {item.description}
        </Text>

        <Flex justify="space-between" align="center" className="mt-4">
          <Text strong className="text-base">
            {item.price}₽
          </Text>
          <Flex justify="space-between" align="center">
            <Badge offset={[-40, 0]} count={isShoppingCartItem ? 5 : 0}>
              <Button type="primary" icon={<PlusOutlined />} size="large" />
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
