import { useTranslation } from 'react-i18next';
import { Empty, Flex, Typography } from 'antd';
const { Text } = Typography;

export const EmptyOrderPlaceholder = () => {
  const { t } = useTranslation();
  return (
    <Flex align="center" justify="center">
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text disabled className="!m-0">
            {t('NO_CURRENT_ORDER')}
          </Text>
        }
      />
    </Flex>
  );
};
