import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Card, Typography } from 'antd';
const { Title } = Typography;
export const UserPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PROFILE')}>
      <Card>
        <Title level={3}>{t('PERSONAL_INFO')}</Title>
      </Card>
    </TitlePage>
  );
};
