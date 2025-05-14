import { Dispatch, SetStateAction, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { useSuperDispatch } from '@shared/hooks';
import { ChoppShadowCollapse, ORDER_STATUS } from '@shared/index';
import { Order } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { RootState } from '@store/store';
import { Flex, Spin } from 'antd';
import { OrderCard } from '../order-card';

type Props = {
  arrayOrders: Order[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  updateOrders: Dispatch<SetStateAction<Order[] | undefined>>;
  page: number;
};

export const AllOrders = ({ arrayOrders, updateOrders, setPage, page }: Props) => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const superDispatch = useSuperDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    superDispatch.superDispatch({
      action: fetchOrders({
        page: page,
        limit: 10,
      }),
      thenHandler: (value) => {
        setPage((prev) => prev + 1);
        setIsLoading(false);
        updateOrders((prev) => [...(prev || []), ...(value?.items || [])]);
      },
    });
  };

  if (arrayOrders === undefined && orders === undefined) {
    return (
      <div className="flex flex-col items-center mt-5">
        <Spin size="default" />
      </div>
    );
  }

  return (
    // <ChoppShadowCard>
    <ChoppShadowCollapse
      items={[
        {
          key: '1',
          label: 'История заказов',
          children: (
            <InfiniteScroll
              initialScrollY={0}
              next={loadMore}
              hasMore={!isLoading && (arrayOrders?.length || 0) < (orders?.totalItems || 0)}
              loader={null}
              dataLength={arrayOrders?.length || 0}
              scrollableTarget="scrollable-container">
              <Flex
                id="scrollable-container"
                vertical
                gap={5}
                style={{ overflowY: 'auto', maxHeight: '300px' }}>
                {arrayOrders
                  ?.filter((item) => item.orderStatus === ORDER_STATUS.DELIVERED)
                  .map((item) => <OrderCard key={item.id} order={item} />)}
              </Flex>
            </InfiniteScroll>
          ),
        },
      ]}></ChoppShadowCollapse>
    // </ChoppShadowCard>
  );
};
