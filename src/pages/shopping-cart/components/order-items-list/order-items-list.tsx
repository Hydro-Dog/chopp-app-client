import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddToCartButton, ChoppShadowCard, ProductDrawer } from '@shared/index';
import { Product } from '@shared/types';
import { RootState } from '@store/store';
import { Typography, Flex } from 'antd';
import { useBoolean } from 'usehooks-ts';

const { Title } = Typography;

export const OrderItemsList = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  const {
    value: isProductDrawerOpened,
    setTrue: openProductDrawerOpened,
    setFalse: closeProductDrawerOpened,
  } = useBoolean();

  const [currentItem, setCurrentItem] = useState<Product>();

  const onProductClick = (item: Product) => {
    setCurrentItem(item);
    openProductDrawerOpened();
  };

  const onCloseProductDrawer = () => {
    closeProductDrawerOpened();
    setCurrentItem(undefined);
  };

  return (
    <>
      <ChoppShadowCard className="md:w-3/4">
        <Flex gap={32} vertical>
          {shoppingCart?.items?.map((item) => (
            <Flex
              key={item.product.id}
              justify="space-between"
              onClick={() => {
                onProductClick(item.product);
              }}>
              <Flex justify="space-between" align="center" className="w-full cursor-pointer">
                <Flex align="center" gap={24}>
                  <div className="rounded-lg overflow-hidden">
                    <img
                      className="h-20 aspect-video object-cover"
                      alt={item.product?.title}
                      src={import.meta.env.VITE_BASE_URL_FILES + item.product?.images[0].path}
                    />
                  </div>
                  <Title level={5} className="!font-bold">
                    {item?.product.title}
                  </Title>
                </Flex>

                <AddToCartButton product={item?.product} showDelete />
              </Flex>
            </Flex>
          ))}
        </Flex>
      </ChoppShadowCard>

      <ProductDrawer
        isOpened={isProductDrawerOpened}
        onClose={onCloseProductDrawer}
        product={currentItem}
      />
    </>
  );
};
