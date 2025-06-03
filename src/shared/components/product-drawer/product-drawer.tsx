import { AddToCartButton, ChoppBottomDrawer, Product } from '@shared/index';
import { Flex, Typography } from 'antd';
import { DeliveryAnimatedCover } from './delivery-animated-cover';

const { Paragraph, Title } = Typography;

type Props = {
  isOpened: boolean;
  onClose: () => void;
  product?: Product;
};

export const ProductDrawer = ({ isOpened, onClose, product }: Props) => {
  console.log('product: ', product);

  // return <ChoppBottomDrawer open={isOpened} onClose={onClose} title={product?.title}>
  //   <DeliveryAnimatedCover />
  //   </ChoppBottomDrawer>;

  return (
    <ChoppBottomDrawer open={isOpened} onClose={onClose} title={product?.title}>
      <Flex gap={12} className="flex-col md:flex-row md:items-start relative">
        <div className="max-h-[300px] md:max-h-[400px] w-full md:w-1/2 flex justify-center ">
          <div className="relative rounded-lg overflow-hidden bg-white w-full">
            {/* <img
              className="absolute inset-0 object-fill"
              alt={product?.title}
              src={import.meta.env.VITE_BASE_URL_FILES + product?.images[0].path}
              style={{ filter: 'blur(50px)' }}
            /> */}
            {product?.id === import.meta.env.VITE_DELIVERY_PRODUCT_ID ? (
              <DeliveryAnimatedCover
                isOpened={false}
                onClose={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            ) : (
              <img
                className="relative aspect-video object-cover h-full w-full"
                alt={product?.title}
                src={import.meta.env.VITE_BASE_URL_FILES + product?.images[0].path}
              />
            )}
          </div>
        </div>
        <Flex
          className="w-full md:w-1/2 md:wrap max-h-[300px] md:max-h-[400px] pb-20"
          vertical
          justify="space-between">
          <Paragraph type="secondary" className="font-semibold overflow-y-scroll h-full !m-0">
            {product?.description}
          </Paragraph>
          <Flex
            gap={20}
            className="w-full "
            align="center"
            justify="end"
            rootClassName="absolute bottom-0 right-0">
            <Title className="!font-bold !m-0" level={2}>
              {product?.price}₽
            </Title>
            {product?.id !== import.meta.env.VITE_DELIVERY_PRODUCT_ID && (
              <AddToCartButton product={product} />
            )}
          </Flex>
        </Flex>
      </Flex>
    </ChoppBottomDrawer>
  );
};
