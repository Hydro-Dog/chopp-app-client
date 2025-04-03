import { useTranslation } from 'react-i18next';
import { AddToCartButton, ChoppBottomDrawer, Product } from '@shared/index';
import { Flex, Typography } from 'antd';

const { Paragraph, Title } = Typography;

type Props = {
  isOpened: boolean;
  onClose: () => void;
  product?: Product;
};

export const ProductDrawer = ({ isOpened, onClose, product }: Props) => {
  const { t } = useTranslation();
  return (
    <ChoppBottomDrawer open={isOpened} onClose={onClose} title={product?.title}>
      <Flex gap={12} className="flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:h-[400px] md:w-1/2 flex items-center justify-center ">
          <div className=" md:h-[400px] relative rounded-lg overflow-hidden bg-white w-full">
            <img
              className="absolute inset-0 object-cover h-full w-full"
              alt={product?.title}
              src={import.meta.env.VITE_BASE_URL_FILES + product?.images[0].path}
              style={{ filter: 'blur(50px)' }}
            />
            <img
              className=" relative aspect-video object-contain h-full w-full"
              alt={product?.title}
              src={import.meta.env.VITE_BASE_URL_FILES + product?.images[0].path}
            />
          </div>
        </div>
        <Flex
          className=" relative w-full md:w-1/2 md:wrap md:h-[400px] max-h-[400px] pb-20"
          vertical
          gap={12}>
          <Paragraph type="secondary" className="font-semibold text-lg sticky top-0 z-10">
            {t('DESCRIPTION')}:
          </Paragraph>
          <Paragraph type="secondary" className="font-semibold overflow-y-auto">
            {product?.description}
          </Paragraph>
          <Flex
            gap={20}
            className="w-full "
            align="center"
            justify="end"
            rootClassName="absolute bottom-0">
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
