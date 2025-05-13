import { useTranslation } from 'react-i18next';
import { Empty, Flex, Typography } from 'antd';
const { Text } = Typography;

export const EmptyShoppingCart = () => {
  const { t } = useTranslation();
  return (
    <Flex flex={1} align="center" justify="center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text disabled className="!m-0">
            {t('EMPTY_SHOPPING_CART')}
          </Text>
        }
      />
    </Flex>
  );
};
