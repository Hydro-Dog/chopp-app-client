import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { PRODUCT_STATE, useSuperDispatch } from '@shared/index';
import { FETCH_STATUS, PaginationRequestQuery, PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';
import { RootState } from '@store/store';
import { Col, Flex, Row, Spin } from 'antd';
import { ProductCard } from './components';
import { useProductsContext } from '@pages/products/context';

export const ProductsGrid = () => {
  const { products, fetchProductsStatus } = useSelector((state: RootState) => state.products);
  // const {
  //   value: isDeleteModalOpen,
  //   setTrue: openDeleteModal,
  //   setFalse: closeDeleteModal,
  // } = useBoolean();

  // const [currentItemData, setCurrentItemData] = useState<Product>();

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

  return (
    <Flex>
      <Row gutter={[16, 16]}>
        {pageProducts?.map((product) => (
          <Col
            key={product.id}
            xs={24} // на самом маленьком экране занимает половину ширины (2 карточки в ряд)
            sm={12} // на небольших экранах занимает одну треть (3 карточки в ряд)
            md={8} // на средних экранах аналогично
            lg={6} // на больших экранах занимает одну четверть (4 карточки в ряд)
            xl={6} // на очень больших экранах также одну четверть
          >
            <ProductCard item={product} />
          </Col>
        ))}
      </Row>
      {fetchProductsStatus === FETCH_STATUS.LOADING && <Spin size="large" />}
    </Flex>
  );
};
