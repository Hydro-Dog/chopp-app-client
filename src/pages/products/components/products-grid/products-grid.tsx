import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useProductsContext } from '@pages/products/context';
import { PRODUCT_STATE, useSuperDispatch } from '@shared/index';
import { FETCH_STATUS, PaginationRequestQuery, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Col, Flex, Row, Spin } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ProductCard, ProductDrawer } from './components';
import { useRootContext } from '@widgets/root-container/root-provider';
import { ChoppDrawer } from '@shared/components/chopp-drawer/chopp-drawer';

export const ProductsGrid = () => {
  const { fetchProductsStatus } = useSelector((state: RootState) => state.products);

  const {
    value: isProductDrawerOpened,
    setTrue: openProductDrawerOpened,
    setFalse: closeProductDrawerOpened,
  } = useBoolean();

  const [currentItem, setCurrentItem] = useState<Product>();

  const {
    search,
    page,
    pageProducts,
    limit,
    categoryId,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<
    PaginationResponse<Product>,
    { categoryId: string } & PaginationRequestQuery
  >();

  useEffect(() => {
    if (categoryId !== undefined) {
      superDispatch({
        action: fetchProducts({
          state: PRODUCT_STATE.DEFAULT,
          categoryId,
          page,
          search,
          limit,
        }),
        thenHandler: (response) => {
          setPageProducts(response.items);
          setPage(response.pageNumber);
          setTotalItems(response.totalItems);
          setTotalPages(response.totalPages);
          setLimit(response.limit);
        },
      });
    }
  }, [categoryId]);

  const onProductClick = (item: Product) => {
    setCurrentItem(item);
    openProductDrawerOpened();
  };

  return (
    <>
      <Flex>
        <Row gutter={[16, 16]}>
          {pageProducts?.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <ProductCard product={product} onClick={() => onProductClick(product)} />
            </Col>
          ))}
        </Row>
        {fetchProductsStatus === FETCH_STATUS.LOADING && <Spin size="large" />}
      </Flex>
      <ProductDrawer
        isOpened={isProductDrawerOpened}
        onClose={closeProductDrawerOpened}
        product={currentItem}
      />
    </>
  );
};
