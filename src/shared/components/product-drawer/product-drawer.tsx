import { AddToCartButton, ChoppBottomDrawer, Product } from '@shared/index';
import { Flex, Typography } from 'antd';

const { Paragraph, Title } = Typography;

type Props = {
  isOpened: boolean;
  onClose: () => void;
  product?: Product;
};

export const ProductDrawer = ({ isOpened, onClose, product }: Props) => {

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
        <Flex className=" w-full md:w-1/2 h-1/2 md:h-full md:wrap" vertical justify="space-between">
          <Paragraph type="secondary" className="font-semibold" rootClassName="pb-20">
            {product?.description}
          </Paragraph>
          <Flex
            gap={20}
            className="w-full "
            align="center"
            rootClassName="absolute bottom-0  pb-10">
            <Title className="!font-bold !m-0" level={2}>
              {product?.price}₽
            </Title>
            <AddToCartButton product={product} />
          </Flex>
        </Flex>
      </Flex>
    </ChoppBottomDrawer>
  );
};
