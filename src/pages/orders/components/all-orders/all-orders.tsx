import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { useSuperDispatch } from '@shared/hooks';
import { Order } from '@shared/types';
import { fetchOrders } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Card, Dropdown, Flex, Space, Spin, Typography } from 'antd';
import dayjs from 'dayjs';
import { OrderScreen } from '../order-screen';

const { Title } = Typography;

type Props = {
  arrayOrders: Order[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  updateOrders: Dispatch<SetStateAction<Order[] | undefined>>;
  page: number;
};

export const AllOrders = ({ arrayOrders, updateOrders, setPage, page }: Props) => {
  const { orders } = useSelector((state: RootState) => state.orders);
  const { t } = useTranslation();
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
    <Card title={<Title level={4}>{t('HISTORY_ORDERS')}</Title>}>
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
          {arrayOrders?.map((item) => (
            <Dropdown
              key={item.id}
              menu={{
                items: [{ type: 'group', label: <OrderScreen order={item} /> }],
              }}
              getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              overlayStyle={{
                width: '80%',
                overflowX: 'auto',
                whiteSpace: 'nowrap',
              }}>
              <Button>
                <Space>
                  {t('ORDERS_ID')}
                  {item.id} {dayjs(item.createdAt).format('YYYY-MM-DD')}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          ))}
        </Flex>
      </InfiniteScroll>
    </Card>
  );
};
