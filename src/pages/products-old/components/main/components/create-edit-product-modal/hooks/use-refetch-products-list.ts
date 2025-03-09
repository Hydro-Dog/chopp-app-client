import { useProductsContext } from '@pages/products-old/context';
import { useSearchParamValue, useSuperDispatch } from '@shared/hooks';
import { PaginationResponse, Product } from '@shared/types';
import { fetchProducts } from '@store/slices';

export const useRefetchProductList = () => {
  const {
    search,
    page,
    limit,
    pageProducts,
    productsState,
    setPage,
    setPageProducts,
    setTotalPages,
    setTotalItems,
    setLimit,
  } = useProductsContext();
  // const categoryId = useSearchParamValue('id') || '';
  const { categoryId } = useProductsContext();
  const { superDispatch } = useSuperDispatch<PaginationResponse<Product>, unknown>();

  const refetchProductList = () => {
    console.log('refetchProductList---');
    if (!categoryId) {
      return console.error(`ERROR categoryId: ${categoryId}`);
    }
    superDispatch({
      action: fetchProducts({
        categoryId,
        state: productsState,
        page: pageProducts.length === 1 ? page - 1 : page,
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
  };

  return { refetchProductList };
};
