import { useEffect, useState, useCallback } from 'react';
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

export const ProductsGrid = () => {
  // --- Redux state ---
  const { fetchProductsStatus } = useSelector((state: RootState) => state.products);

  // --- Локальные состояния ---
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState<Product>();

  const {
    value: isProductDrawerOpened,
    setTrue: openProductDrawer,
    setFalse: closeProductDrawer,
  } = useBoolean();

  // --- Контекст с продуктами ---
  const {
    search,
    totalPages,
    pageProducts,
    limit,
    categoryId,
    setPageProducts,
    setTotalPages,
    setTotalItems,
  } = useProductsContext();

  // --- Кастомный диспатч с thenHandler ---
  const { superDispatch } = useSuperDispatch<
    PaginationResponse<Product>,
    { categoryId: string } & PaginationRequestQuery
  >();

  // --- Загрузка продуктов при смене категории ---
  useEffect(() => {
    if (!categoryId || isLoading) return;

    setPageProducts([]);
    superDispatch({
      action: fetchProducts({
        state: PRODUCT_STATE.DEFAULT,
        categoryId,
        page: 1,
        search,
        limit,
      }),
      thenHandler: (response) => {
        setPageProducts(response.items);
        setPage(response.pageNumber);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setIsLoading(false);
      },
    });
  }, [categoryId]);

  // --- Функция подгрузки следующей страницы ---
  const loadMore = useCallback(() => {
    if (!categoryId || isLoading) return;

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
  }, [categoryId, isLoading, page, search, limit]);

  // --- Клик по карточке продукта ---
  const onProductClick = useCallback(
    (item: Product) => {
      setCurrentItem(item);
      openProductDrawer();
    },
    [openProductDrawer],
  );

  return (
    <>
      <InfiniteScroll
        className="!overflow-x-hidden"
        next={loadMore}
        hasMore={!isLoading && page < totalPages}
        loader={null}
        dataLength={pageProducts?.length || 0}
        scrollableTarget="scrollable-container"
        initialScrollY={0}>
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

      {/* Прелоадер при начальной загрузке */}
      {fetchProductsStatus === FETCH_STATUS.LOADING && <Spin size="large" />}

      {/* Боковая панель с информацией о продукте */}
      <ProductDrawer
        isOpened={isProductDrawerOpened}
        onClose={closeProductDrawer}
        product={currentItem}
      />
    </>
  );
};
