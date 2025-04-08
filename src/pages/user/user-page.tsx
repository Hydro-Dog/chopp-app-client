import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { UserProfileForm } from './components';
export const UserPage = () => {
  const { t } = useTranslation();

  return (
    <ChoppSubPage title={t('PROFILE')} path="/" icon={<HomeOutlined />}>
      <ChoppShadowCard>
        <UserProfileForm />
      </ChoppShadowCard>
    </ChoppSubPage>
  );
};
