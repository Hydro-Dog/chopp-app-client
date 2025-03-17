import { MouseEventHandler, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AddToCartButton, useLoginGuard, useThemeToken } from '@shared/index';
import { Product } from '@shared/types';
import { RootState } from '@store/store';
import { Button, Flex, Typography, Card } from 'antd';

const { Text, Paragraph } = Typography;

type Props = {
  product: Product;
  onClick: () => void;
};

export const ProductCard = ({ product, onClick }: Props) => {

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
          <AddToCartButton product={product} />
        </Flex>
      </Flex>
    </Card>
  );
};
