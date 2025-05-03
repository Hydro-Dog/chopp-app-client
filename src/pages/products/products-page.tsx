import { Flex } from 'antd';
import { ProductsCategories } from './components/products-categories';
import { ProductsGrid } from './components/products-grid';

const ProductsPage = () => {
  return (
    <Flex vertical gap={20}>
      <ProductsCategories />
      <ProductsGrid />
    </Flex>
  );
};

export default ProductsPage;
