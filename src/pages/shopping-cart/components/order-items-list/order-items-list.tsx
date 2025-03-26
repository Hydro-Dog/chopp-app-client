import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AddToCartButton, ChoppShadowCard, ProductDrawer } from '@shared/index';
import { Product } from '@shared/types';
import { RootState } from '@store/store';
import { Typography, Flex } from 'antd';
import { useBoolean } from 'usehooks-ts';

const { Title, Text } = Typography;

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
              <Flex
                justify="space-between"
                align="center"
                className="w-full cursor-pointer"
                gap={16}>
                <Flex align="center" gap={24}>
                  <div className="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.product?.title}
                      src={import.meta.env.VITE_BASE_URL_FILES + item.product?.images[0].path}
                    />
                  </div>
                </Flex>

                <Flex className="justify-between w-full flex-col sm:flex-row">
                  <Title
                    level={5}
                    className="max-w-40 !text-sm md:!text-lg md:max-w-60 lg:max-w-xl overflow-hidden overflow-hidden text-ellipsis whitespace-nowrap">
                    {item?.product.title}
                  </Title>

                  <Flex gap={16} align="center" className="justify-between">
                    <Text className="!font-bold !text-sm md:!text-lg min-w-20">
                      {item.product.price}₽
                    </Text>
                    <AddToCartButton product={item?.product} showDelete />
                  </Flex>
                </Flex>
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
