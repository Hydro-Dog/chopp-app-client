import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Order, OrderItem, Product } from '@shared/types';
import { Card, Flex, Spin, Typography } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ProductDrawer, useThemeToken } from '@shared/index';
import { TruckOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

type Props = {
  order?: Order;
};

export const OrderCardContent = ({ order }: Props) => {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
  const [currentItem, setCurrentItem] = useState<Product>();

  const {
    value: isProductDrawerOpened,
    setTrue: openProductDrawerOpened,
    setFalse: closeProductDrawerOpened,
  } = useBoolean();

  const onProductClick = async (item: OrderItem) => {
    setCurrentItem(item.product);
    openProductDrawerOpened();
  };

  if (!order?.items)
    return (
      <div className="flex flex-col items-center mt-5">
        <Spin size="default" />
      </div>
    );

  return (
    <>
      <Flex gap={5} className="overflow-x-scroll">
        {order.items.map((item) => {
          const isDelivery = item.product.id === import.meta.env.VITE_DELIVERY_PRODUCT_ID;

          return (
            <Card
              key={item.id}
              rootClassName="chopp-card"
              hoverable={!isDelivery}
              className="w-44 shrink-0 m-2 mb-3"
              style={{
                background: themeToken.colorBgElevated,
                color: themeToken.colorText,
              }}
              onClick={() => onProductClick(item)}
              cover={
                isDelivery ? (
                  <div
                    className="aspect-video !flex items-center justify-center rounded-t-lg"
                    style={{
                      background: themeToken.colorPrimaryBg,
                      color: themeToken.colorPrimary,
                      fontSize: '4rem',
                    }}>
                    <TruckOutlined className='margin-auto'/>
                  </div>
                ) : (
                  <img
                    className="aspect-video object-cover"
                    alt={item.product.title}
                    src={import.meta.env.VITE_BASE_URL_FILES + item.product.images?.[0]?.path}
                  />
                )
              }>
              <Title level={5} className="!m-0" type="secondary">
                {item.product.title}
              </Title>
              <Flex gap={8}>
                <Text className="font-bold">{item.product.price}₽</Text>
                <Text strong type="secondary">
                  ×
                </Text>
                <Text strong style={{ color: themeToken.colorPrimary }}>
                  {item.quantity}
                </Text>
              </Flex>
            </Card>
          );
        })}
      </Flex>

      <ProductDrawer
        isOpened={isProductDrawerOpened}
        onClose={closeProductDrawerOpened}
        product={currentItem}
      />
    </>
  );
};
