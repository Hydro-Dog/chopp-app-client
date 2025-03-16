import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { ChoppBottomDrawer, Product, useLoginGuard, useThemeToken } from '@shared/index';
import { RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';
import { useState, useEffect, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useDecrementShoppingCartItem, useIncrementShoppingCartItem } from '../../hooks';

const { Paragraph, Text, Title } = Typography;

type Props = {
  isOpened: boolean;
  onClose: () => void;
  product?: Product;
};

export const ProductDrawer = ({ isOpened, onClose, product }: Props) => {
  const { t } = useTranslation();
  const { loginGuard } = useLoginGuard();
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const decrement = useDecrementShoppingCartItem();
  const increment = useIncrementShoppingCartItem();
  const [isShoppingCartItem, setIsShoppingCartItem] = useState(false);

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

  return (
    <ChoppBottomDrawer open={isOpened} onClose={onClose} title={product?.title}>
      <Flex
        gap={12}
        className="h-96 flex-col md:flex-row items-center md:items-start overflow-scroll">
        <div className="w-full md:w-1/2  flex h-74 sm:h-[380px] items-center justify-center">
          <div className="rounded-lg overflow-hidden">
            <img
              className="aspect-video object-cover"
              alt={product?.title}
              src={import.meta.env.VITE_BASE_URL_FILES + product?.images[0].path}
            />
          </div>
        </div>
        <Flex
          className="relative w-full md:w-1/2 h-1/2 md:h-full md:wrap"
          vertical
          justify="space-between">
          <Paragraph type="secondary" className="font-semibold" rootClassName="pb-20">
            {product?.description}
          </Paragraph>
          <Flex
            gap={12}
            className="w-full "
            justify="space-between"
            align="center"
            rootClassName="absolute bottom-0 left-0 pb-10">
            <Title className="!font-bold !m-0" level={2}>
              {product?.price}₽
            </Title>
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
                  {shoppingCart.items.find((el) => el.product.id === product?.id)?.quantity}
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
                icon={<ShoppingCartOutlined />}
                size="large">
                Добавить
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>
    </ChoppBottomDrawer>
  );
};
