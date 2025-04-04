import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';

import { useProductsContext } from '@pages/products/context';
import { PRODUCT_STATE, ProductDrawer, useSuperDispatch } from '@shared/index';
import { FETCH_STATUS, PaginationRequestQuery, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Col, Row, Spin } from 'antd';
import { useBoolean } from 'usehooks-ts';
import { ProductCard } from './components';
// import { useRootContext } from '@widgets/root-container/root-provider';
// import { ChoppDrawer } from '@shared/components/chopp-drawer/chopp-drawer';

export const ProductsGrid = () => {
  const { fetchProductsStatus } = useSelector((state: RootState) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const {
    value: isProductDrawerOpened,
    setTrue: openProductDrawerOpened,
    setFalse: closeProductDrawerOpened,
  } = useBoolean();

  const [currentItem, setCurrentItem] = useState<Product>();
  const [page, setPage] = useState(1);

  const {
    search,
    totalPages,
    pageProducts,
    limit,
    categoryId,
    totalItems,
    setPageProducts,
    setTotalPages,
    setTotalItems,
  } = useProductsContext();
  const { superDispatch } = useSuperDispatch<
    PaginationResponse<Product>,
    { categoryId: string } & PaginationRequestQuery
  >();

  useEffect(() => {
    if (categoryId && !isLoading && pageProducts.length === 0) {
      superDispatch({
        action: fetchProducts({
          state: PRODUCT_STATE.DEFAULT,
          categoryId,
          page,
          search,
          limit,
        }),
        thenHandler: (response) => {
          setPageProducts((prev) => [...prev, ...response.items]);
          setPage(response.pageNumber);
          setTotalItems(response.totalItems);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        },
      });
    }
  }, [categoryId]);

  const loadMore = () => {
    if (categoryId && !isLoading) {
      setIsLoading(true);
      superDispatch({
        action: fetchProducts({
          state: PRODUCT_STATE.DEFAULT,
          categoryId,
          page: page + 1,
          search,
          limit,
        }),
        thenHandler: (response) => {
          setPageProducts((prev) => [...prev, ...response.items]);
          setPage(response.pageNumber);
          setTotalItems(response.totalItems);
          setTotalPages(response.totalPages);
          setIsLoading(false);
        },
      });
    }
  };

  const onProductClick = (item: Product) => {
    setCurrentItem(item);
    openProductDrawerOpened();
  };

  return (
    <>
      <InfiniteScroll
        initialScrollY={0}
        className="!overflow-x-hidden"
        next={loadMore}
        hasMore={!isLoading && page < totalPages}
        loader={null}
        dataLength={totalItems}
        scrollableTarget="scrollable-container">
        <Row
          id="scrollable-container"
          className="max-h-screen pb-8 overflow-y-auto"
          gutter={[16, 16]}>
          {pageProducts?.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
              <ProductCard product={product} onClick={() => onProductClick(product)} />
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      {fetchProductsStatus === FETCH_STATUS.LOADING && <Spin size="large" />}
      <ProductDrawer
        isOpened={isProductDrawerOpened}
        onClose={closeProductDrawerOpened}
        product={currentItem}
      />
    </>
  );
};
