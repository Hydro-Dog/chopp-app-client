import { useTranslation } from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';
import { Order, PaginationResponse } from '@shared/types';
import { Button, Card, Dropdown, Flex, Space, Typography } from 'antd';
import dayjs from 'dayjs';
const { Title } = Typography;

type Props = {
  orders: PaginationResponse<Order> | undefined;
};

export const AllOrders = ({ orders }: Props) => {
  const { t } = useTranslation();
  return (
    <Card title={<Title level={4}>{t('HISTORY_ORDERS')}</Title>}>
      <Flex vertical gap={5}>
        {orders?.items.map((item) => (
          <Dropdown key={item.id} menu={{ items: [{ type: 'group', label: <div>come</div> }] }}>
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
    </Card>
  );
};
