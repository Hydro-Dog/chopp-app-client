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
  // --- Получение экшена-диспатчера ---
  const { superDispatch } = useSuperDispatch<Category[], unknown>();

  // --- Текущий выбранный ID категории и функция для его изменения ---
  const { categoryId, setCategoryId } = useProductsContext();

  // --- Список категорий из Redux-хранилища ---
  const { categories } = useSelector((state: RootState) => state.productCategory);

  // --- Получение списка категорий при монтировании ---
  useEffect(() => {
    superDispatch({
      action: fetchCategories(),
      thenHandler: (categories) => {
        // Если категория ещё не выбрана — выбрать первую по порядку
        if (!categoryId) {
          const defaultId =
            categories.find((item) => item.order === 1)?.id ??
            categories.find((item) => item.order === 0)?.id ??
            '';
          setCategoryId(defaultId);
        } else {
          setCategoryId(categoryId);
        }
      },
    });
  }, [categoryId]);

  return (
    <Flex gap={4} wrap className="overflow-scroll">
      {categories
        ?.filter((item) => item.title !== 'Другое')
        ?.map((item) => (
          <Button
            key={item.id}
            onClick={() => setCategoryId(item.id)}
            type={String(categoryId) !== String(item.id) ? 'text' : undefined}>
            <Text strong>{item.title}</Text>
          </Button>
        ))}
    </Flex>
  );
};
