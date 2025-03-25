import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProductsContext } from '@pages/products/context';
import { useSuperDispatch } from '@shared/hooks';
import { Category } from '@shared/types';
import { fetchCategories } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';

const { Text } = Typography;

export const ProductsCategories = () => {
  const { superDispatch } = useSuperDispatch<Category[], unknown>();
  const { categoryId, setCategoryId } = useProductsContext();
  const { categories } = useSelector((state: RootState) => state.productCategory);

  useEffect(() => {
    superDispatch({
      action: fetchCategories(),
      thenHandler: (categories) => {
        if (!categoryId) {
          setCategoryId(
            categories.find((item) => item.order === 1)?.id ||
              categories.find((item) => item.order === 0)?.id ||
              '',
          );
        }
      },
    });
  }, []);
  
  return (
    <Flex gap={4} wrap={false} className="overflow-scroll">
      {categories?.map((item) => (
        <Button
          onClick={() => setCategoryId(item.id)}
          key={item.id}
          //@ts-ignore
          type={categoryId !== item.id && 'text'}>
          <Text strong>{item.title}</Text>
        </Button>
      ))}
    </Flex>
  );
};
