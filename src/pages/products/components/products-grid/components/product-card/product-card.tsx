import { useTranslation } from 'react-i18next';
import { DownloadOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PRODUCT_STATE } from '@shared/index';
import { Product } from '@shared/types';
import { Badge, Button, Flex, FloatButton, Tooltip, Typography } from 'antd';
import { Card } from 'antd';
import { sortImages } from '../../utils/sort-images';

const { Meta } = Card;
const { Text, Title } = Typography;

type Props = {
  item: Product;
  // openCreateProductModal: () => void;
  // openMoveToTrashModal: () => void;
  // openDeleteModal: () => void;
  // setCurrentItemData: (item: Product) => void;
};

export const ProductCard = ({
  item,
  // openCreateProductModal,
  // openMoveToTrashModal,
  // openDeleteModal,
  // setCurrentItemData,
}: Props) => {
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
        <div className="!flex items-center justify-center overflow-hidden">
          <img
            className="aspect-video object-cover"
            alt={item.title}
            src={import.meta.env.VITE_BASE_URL_FILES + sortImages(item)?.[0]?.path}
          />
        </div>
      }>
      <Flex gap={2} vertical>
      <Text strong>{item.title}</Text>
        <Text>{item.description}</Text>
        <Flex justify="space-between" align="center">
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
