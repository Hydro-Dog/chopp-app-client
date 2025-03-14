import { ShoppingCartOutlined } from '@ant-design/icons';
import { ChoppBottomDrawer, Product, useThemeToken } from '@shared/index';
import { Button, Flex, Typography } from 'antd';
import { createStyles } from 'antd-style';

const { Paragraph, Title } = Typography;

type Props = {
  isOpened: boolean;
  onClose: () => void;
  product?: Product;
};

export const ProductDrawer = ({ isOpened, onClose, product }: Props) => {
  const themeToken = useThemeToken();

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
        <Flex className="relative w-full md:w-1/2 h-1/2 md:h-full md:wrap" vertical justify="space-between">
          <Paragraph type="secondary" className="font-semibold" rootClassName="pb-20">
            {product?.description}
          </Paragraph>
          {/* <Flex
            gap={12}
            className="w-full "
            justify="space-between"
            align="center"
            rootClassName="absolute bottom-0 left-0 pb-10"> */}
          {/* <Title className="!font-bold !m-0" level={2}>
              
            </Title> */}
          <Button
            iconPosition="end"
            size="large"
            className="w-40 h-12 text-xl font-semibold fixed right-4 bottom-4 drop-shadow-md inset-shadow-xs"
            type="primary"
            icon={<ShoppingCartOutlined />}>
            {product?.price}₽
          </Button>
          {/* </Flex> */}
        </Flex>
      </Flex>
    </ChoppBottomDrawer>
  );
};
