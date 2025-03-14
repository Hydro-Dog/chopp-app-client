import { useTranslation } from 'react-i18next';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Product } from '@shared/types';
import { Badge, Button, Flex, Typography, Card } from 'antd';
import { useThemeToken } from '@shared/index';

const { Text, Paragraph } = Typography;

type Props = {
  item: Product;
  onClick: () => void;
};

export const ProductCard = ({ item, onClick }: Props) => {
  const { t } = useTranslation();
  const isShoppingCartItem = 1;
  const themeToken = useThemeToken();

  return (
    <Card
      onClick={onClick}
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

        <Paragraph ellipsis={{ rows: 3 }} className="h-14 overflow-hidden text-sm">
          {item.description}
        </Paragraph>

        <Flex justify="space-between" align="center" className="mt-4">
          <Text strong className="text-base text-xl">
            {item.price}₽
          </Text>
          {isShoppingCartItem ? (
            <Flex justify="space-between" align="center" gap={4}>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="rounded-r-none"
                type="primary"
                icon={<MinusOutlined />}
                size="small"
              />
              <Text strong type="secondary">
                5
              </Text>
              <Button
                onClick={(e) => e.stopPropagation()}
                className="rounded-l-none"
                type="primary"
                icon={<PlusOutlined />}
                size="small"
              />
            </Flex>
          ) : (
            <Button
              onClick={(e) => e.stopPropagation()}
              type="primary"
              icon={<PlusOutlined />}
              size="large"
            />
          )}
        </Flex>
      </Flex>
    </Card>
  );
};
