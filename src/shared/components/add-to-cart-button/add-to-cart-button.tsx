import { useState, useEffect, MouseEventHandler } from 'react';
import { useSelector } from 'react-redux';
import { DeleteFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useDecrementShoppingCartItem,
  useDeleteShoppingCartPosition,
  useIncrementShoppingCartItem,
  useLoginGuard,
  useThemeToken,
} from '@shared/hooks';
import { ChoppExplosionButton, ChoppGradientButton, Product } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Button, Typography } from 'antd';

const { Text } = Typography;

type Props = {
  product?: Product;
  showDelete?: boolean;
};

export const AddToCartButton = ({ product, showDelete }: Props) => {
  const { loginGuard } = useLoginGuard();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();
  const deletePosition = useDeleteShoppingCartPosition();
  const [isShoppingCartItem, setIsShoppingCartItem] = useState(false);
  const themeToken = useThemeToken();

  useEffect(() => {
    if (shoppingCart?.items.find((el) => el.product.id === product?.id)) {
      setIsShoppingCartItem(true);
    } else {
      setIsShoppingCartItem(false);
    }
  }, [shoppingCart]);

  const onAddToCartClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    loginGuard(() => increment({ itemId: product!.id }));
  };

  const onRemoveFromCartClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    loginGuard(() => decrement({ itemId: product!.id }));
  };

  const onDeleteClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    deletePosition({ itemId: product!.id });
  };

  if (!product) return;

  return isShoppingCartItem ? (
    <Flex style={{ background: 'transparent' }} justify="space-between" align="center" gap={16}>
      <Flex gap={4}>
        <ChoppExplosionButton
        gradient
          onClick={onRemoveFromCartClick}
          className="rounded-r-none !w-6 h-9"
          type="primary"
          icon={<MinusOutlined style={{ fontSize: 12 }} />}
          size="small"
        />
        <Text className="text-lg px-1 pt-1" type="secondary">
          {shoppingCart.items.find((el) => el.product.id === product.id)?.quantity}
        </Text>
        <ChoppGradientButton
        gradient
          onClick={onAddToCartClick}
          className="rounded-l-none !w-6 h-9"
          type="primary"
          icon={<PlusOutlined style={{ fontSize: 12 }} />}
          size="small"
        />
      </Flex>

      {showDelete && (
        <Button
          onClick={onDeleteClick}
          icon={<DeleteFilled style={{ fontSize: 12 }} />}
          size="small"
          danger
        />
      )}
    </Flex>
  ) : (
    <Button
      onClick={onAddToCartClick}
      type="primary"
      className="!w-9 !h-9"
      icon={<PlusOutlined />}
    />
  );
};
