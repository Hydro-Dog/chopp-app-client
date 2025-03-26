import { useTranslation } from 'react-i18next';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { UserProfileForm } from './components';
export const UserPage = () => {
  const { t } = useTranslation();

  return (
    <ChoppSubPage title={t('PROFILE')} path="/">
      <ChoppShadowCard>
        <UserProfileForm />
      </ChoppShadowCard>
    </ChoppSubPage>
  );
};
