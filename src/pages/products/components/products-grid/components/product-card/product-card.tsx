import { MouseEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useLoginGuard } from '@shared/index';
import { Product } from '@shared/types';
import { RootState } from '@store/store';
import { Button, Flex, Typography, Card } from 'antd';
import { useDecrementShoppingCartItem, useIncrementShoppingCartItem } from '../../hooks';

const { Text, Paragraph } = Typography;

type Props = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({ product, onClick }: Props) => {
  const { loginGuard } = useLoginGuard();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();
  const [isShoppingCartItem, setIsShoppingCartItem] = useState(false);

  useEffect(() => {
    if (shoppingCart?.items.find((el) => el.product.id === product.id)) {
      setIsShoppingCartItem(true);
    } else {
      setIsShoppingCartItem(false);
    }
  }, [shoppingCart]);

  const onAddToCartClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    loginGuard(() => increment({ itemId: product.id }));
  };

  const onRemoveFromCartClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    loginGuard(() => decrement({ itemId: product.id }));
  };

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
            alt={product.title}
            src={import.meta.env.VITE_BASE_URL_FILES + product.images[0].path}
          />
        </div>
      }>
      <Flex gap={2} vertical>
        <Text strong>{product.title}</Text>

        <Paragraph ellipsis={{ rows: 3 }} className="h-14 overflow-hidden text-sm">
          {product.description}
        </Paragraph>

        <Flex justify="space-between" align="center" className="mt-4">
          <Text strong className="text-base text-xl">
            {product.price}₽
          </Text>
          {isShoppingCartItem ? (
            <Flex justify="space-between" align="center" gap={4}>
              <Button
                onClick={onRemoveFromCartClick}
                className="rounded-r-none !w-8 h-10"
                type="primary"
                icon={<MinusOutlined />}
                size="small"
              />
              <Text strong className="text-lg px-1" type="secondary">
                {shoppingCart.items.find((el) => el.product.id === product.id)?.quantity}
              </Text>
              <Button
                onClick={onAddToCartClick}
                className="rounded-l-none !w-8 h-10"
                type="primary"
                icon={<PlusOutlined />}
                size="small"
              />
            </Flex>
          ) : (
            <Button
              onClick={onAddToCartClick}
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
