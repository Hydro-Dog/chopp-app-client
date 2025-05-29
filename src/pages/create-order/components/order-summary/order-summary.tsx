import { useTranslation } from 'react-i18next';
import { ChoppShadowCard } from '@shared/index';
import { OrderSummaryBlock } from '@widgets/index';
import { Button, Flex } from 'antd';

export const OrderSummary = () => {
  const { t } = useTranslation();

  return (
    <ChoppShadowCard className="md:w-1/4 h-fit">
      <Flex className="flex flex-col justify-between align-center" gap={24}>
        <OrderSummaryBlock />
        <Button htmlType="submit" type="primary" size="large">
          {t('MAKE_PAYMENT')}
        </Button>
      </Flex>
    </ChoppShadowCard>
  );
};
