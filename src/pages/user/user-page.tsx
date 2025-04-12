import { useTranslation } from 'react-i18next';
import { HomeOutlined } from '@ant-design/icons';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { STORAGE_KEYS } from '@shared/enum';
import { useSuperDispatch } from '@shared/hooks';
import { logout } from '@store/slices';
import { Button, Flex, Typography } from 'antd';
import { UserProfileForm } from './components';
const { Title } = Typography;

export const UserPage = () => {
  const { t } = useTranslation();
  const { showNotification } = useNotificationContext();
  const { superDispatch } = useSuperDispatch();

  const onLogout = () => {
    superDispatch({
      action: logout({ refreshToken: String(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) }),
      catchHandler: () => {
        showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
      },
    });
  };

  return (
    <ChoppSubPage
      title={
        <Flex className="justify-between items-center w-full">
          <Title level={3} className="!m-0 !font-bold">
            {t('PROFILE')}
          </Title>
          <Button onClick={onLogout} danger size="large">
            {t('EXIT')}
          </Button>
        </Flex>
      }
      path="/"
      icon={<HomeOutlined />}>
      <ChoppShadowCard>
        <UserProfileForm />
      </ChoppShadowCard>
    </ChoppSubPage>
  );
};
