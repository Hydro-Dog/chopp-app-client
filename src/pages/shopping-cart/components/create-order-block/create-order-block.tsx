import { RootState } from '@store/store';
import { Card, Flex, Button, Typography } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

export const CreateOrderBlock = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);

  return (
    <Card className="md:w-1/4">
      <Flex className="flex-row md:flex-col justify-between align-center" gap={24}>
        <Flex gap={12} className="md:justify-between items-center">
          <Title level={5} type="secondary" className="!m-0">
            Итого:
          </Title>
          <Title level={5} className="!m-0">
            {shoppingCart.totalPrice}₽
          </Title>
        </Flex>

        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </Flex>
    </Card>
  );
};
