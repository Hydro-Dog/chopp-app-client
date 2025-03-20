import { useTranslation } from 'react-i18next';
import { EllipsisOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
const { Title } = Typography;
type Props = {
  message: string;
};

export const EmptyCard = ({ message }: Props) => {
  const { t } = useTranslation();
  return (
    <div>
      <Flex align="center" justify="center" vertical>
        <Title level={3} className="!m-0">
          {t('NO_CURRENT_ORDER')}
        </Title>
        <EllipsisOutlined style={{ fontSize: 100 }} />
      </Flex>
    </div>
  );
};
