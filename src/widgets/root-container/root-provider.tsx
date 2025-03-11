import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDER_STATUS } from '@shared/enum';
import { Order, Product, PropsWithChildrenOnly } from '@shared/types';
import { LoginModal } from './components';
import { useBoolean } from 'usehooks-ts';

type RootContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  //   pageOrders: Order[];
  //   setPageOrders: Dispatch<SetStateAction<Order[]>>;
  //   status: string[];
  //   setStatus: Dispatch<SetStateAction<string[]>>;
  //   limit: number;
  //   setLimit: Dispatch<SetStateAction<number>>;
  //   totalPages: number;
  //   setTotalPages: Dispatch<SetStateAction<number>>;
  //   totalItems: number;
  //   setTotalItems: Dispatch<SetStateAction<number>>;
  //   search: string;
  //   setSearch: Dispatch<SetStateAction<string>>;
  //   page: number;
  //   setPage: Dispatch<SetStateAction<number>>;
  //   endDate: string;
  //   setEndDate: Dispatch<SetStateAction<string>>;
  //   startDate: string;
  //   setStartDate: Dispatch<SetStateAction<string>>;
};

const RootContext = createContext<RootContextType | undefined>(undefined);

export const RootProvider = ({ children }: PropsWithChildrenOnly) => {
  const {
    value: isLoginModalOpen,
    setTrue: openLoginModal,
    setFalse: closeLoginModal,
  } = useBoolean();

  //   const [searchParams, setSearchParams] = useSearchParams();
  //   const initialLimit = Number(searchParams.get('limit')) || 20;
  //   const initialSearch = searchParams.get('search') || '';
  //   const initialOrdersStatus =
  //     searchParams.get('status') !== null
  //       ? searchParams
  //           .get('status')!
  //           .split(',')
  //           .filter((status) => Object.values(ORDER_STATUS).includes(status as ORDER_STATUS))
  //       : Object.values(ORDER_STATUS);
  //   const initialPage = searchParams.get('page') || '';
  //   const initialStartDate = searchParams.get('startDate') || '';
  //   const initialEndDate = searchParams.get('endDate') || '';

  //   const [limit, setLimit] = useState(initialLimit);
  //   const [endDate, setEndDate] = useState(initialEndDate);
  //   const [startDate, setStartDate] = useState(initialStartDate);
  //   const [status, setStatus] = useState(initialOrdersStatus);

  //   const [search, setSearch] = useState(initialSearch);
  //   const [pageOrders, setPageOrders] = useState<Order[]>([]);
  //   const [page, setPage] = useState(Number(initialPage) || 1);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const [totalItems, setTotalItems] = useState(0);

  //   useEffect(() => {
  //     const params = new URLSearchParams(searchParams);
  //     params.set('limit', String(limit));
  //     params.set('search', String(search));
  //     params.set('status', String(status));
  //     params.set('startDate', String(startDate));
  //     params.set('endDate', String(endDate));
  //     params.set('page', String(page));
  //     setSearchParams(params);
  //   }, [limit, search, page, startDate, endDate, status, setSearchParams]);

  return (
    <RootContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        // pageOrders,
        // setPageOrders,
        // page,
        // setPage,
        // totalPages,
        // setTotalPages,
        // totalItems,
        // setTotalItems,
        // search,
        // setSearch,
        // limit,
        // setLimit,
        // endDate,
        // setEndDate,
        // startDate,
        // setStartDate,
        // status,
        // setStatus,
      }}>
      {children}
      <LoginModal close={closeLoginModal} isOpen={isLoginModalOpen} />
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used with RootProvider.');
  }
  return context;
};
