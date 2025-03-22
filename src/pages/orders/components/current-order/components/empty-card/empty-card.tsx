import { useTranslation } from 'react-i18next';
import { Empty, Flex, Typography } from 'antd';
const { Text } = Typography;

export const EmptyCard = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Flex align="center" justify="center">
        <Empty
          description={
            <Text disabled className="!m-0">
              {t('NO_CURRENT_ORDER')}
            </Text>
          }
        />
      </Flex>
    </div>
  );
};
