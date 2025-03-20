import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Alert, Button, Card, Flex, Typography } from 'antd';

const { Title } = Typography;

type Props = {
  error: string | undefined;
};

export const MakePaymentBlock = ({ error }: Props) => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const { t } = useTranslation();

  return (
    <div className="md:w-1/4 h-auto">
      <Card>
        <Flex vertical gap={12}>
          <Flex className="flex-row md:flex-col justify-between align-center" gap={24}>
            <Flex gap={12} className="md:justify-between items-center">
              <Title level={5} type="secondary" className="!m-0">
                {t('IN_ALL')}
              </Title>
              <Title level={5} className="!m-0">
                {shoppingCart.totalPrice}₽
              </Title>
            </Flex>
            <Button htmlType="submit" type="primary" size="large">
              {t('MAKE_PAYMENT')}
            </Button>
          </Flex>
          {error !== undefined && <Alert description={error} type="error" />}
        </Flex>
      </Card>
    </div>
  );
};
