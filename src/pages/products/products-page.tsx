import { useEffect } from 'react';
import {
  PaginationRequestQuery,
  PaginationResponse,
  Product,
  PRODUCT_STATE,
  useSuperDispatch,
} from '@shared/index';
import { fetchProducts } from '@store/slices';
import { ProductsGrid } from './components/products-grid';
import { useProductsContext } from './context';

export const ProductsPage = () => {
  return <ProductsGrid />;
  //   return <Row gutter={[16, 16]}>
  //   <Col span={8} ><div>Column</div></Col>
  //   <Col span={8} ><div>Column</div></Col>
  //   <Col span={8} ><div>Column</div></Col>

  //   <Col span={8} ><div>Column</div></Col>
  //   <Col span={8} ><div>Column</div></Col>
  //   <Col span={8} ><div>Column</div></Col>
  // </Row>
};
