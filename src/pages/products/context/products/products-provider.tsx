import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, PropsWithChildrenOnly } from '@shared/index';
//Для отладки скролла
export const LIMIT = 5;

type ProductsContextType = {
  pageProducts: Product[];
  setPageProducts: Dispatch<SetStateAction<Product[]>>;
  categoryId: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  totalItems: number;
  setTotalItems: Dispatch<SetStateAction<number>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  // productsState: PRODUCT_STATE | PRODUCT_STATE[];
  // setProductsState: Dispatch<SetStateAction<PRODUCT_STATE | PRODUCT_STATE[]>>;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: PropsWithChildrenOnly) => {
  const [searchParams, setSearchParams] = useSearchParams();
  //const initialLimit = Number(searchParams.get('limit')) || LIMIT;
  const initialSearch = searchParams.get('search') || '';
  const initialCategoryId = searchParams.get('categoryId') || '';
  // const initialProductsState = [PRODUCT_STATE.DEFAULT, PRODUCT_STATE.HIDDEN];

  const [pageProducts, setPageProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState(initialSearch);
  const [categoryId, setCategoryId] = useState(initialCategoryId);
  // const [productsState, setProductsState] = useState(initialProductsState);
  const [limit, setLimit] = useState(LIMIT);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('search', String(search));
    params.set('categoryId', String(categoryId));
    setSearchParams(params);
  }, [limit, search, categoryId, setSearchParams]);

  return (
    <ProductsContext.Provider
      value={{
        pageProducts,
        setPageProducts,
        categoryId,
        setCategoryId,
        // productsState,
        // setProductsState,
        limit,
        setLimit,
        totalPages,
        setTotalPages,
        totalItems,
        setTotalItems,
        search,
        setSearch,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
