import { useTranslation } from 'react-i18next';
import { TitlePage } from '@shared/components';
import { Card } from 'antd';
import { UserProfileForm } from './components';
export const UserPage = () => {
  const { t } = useTranslation();

  return (
    <TitlePage title={t('PROFILE')}>
      <Card>
        <UserProfileForm />
      </Card>
    </TitlePage>
  );
};
