import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { STORAGE_KEYS } from '@shared/enum';
import { useSuperDispatch } from '@shared/hooks';
import { logout } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';
import { UserProfileForm } from './components';
const { Title } = Typography;

export const UserPage = () => {
  const { t } = useTranslation();
  const { showErrorNotification } = useNotificationContext();
  const { superDispatch } = useSuperDispatch();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [isAuth, setAuth] = useState<boolean>(currentUser !== null);

  const onLogout = () => {
    if (!localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN))
      showErrorNotification({
        type: 'error',
        message: t('ERROR'),
        description: t('ERRORS.ERROR_OF_LOGOUT'),
      });
    else
      superDispatch({
        action: logout({ refreshToken: String(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) }),
        catchHandler: () => {
          showErrorNotification({
            type: 'error',
            message: t('ERROR'),
            description: t('ERRORS.ERROR_OF_LOGOUT'),
          });
        },
      });
  };
  useEffect(() => {
    if (!currentUser) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [currentUser]);

  return (
    <ChoppSubPage
      title={
        <Flex className="justify-between items-center w-full">
          <Title level={3} className="!m-0 !font-bold">
            {t('PROFILE')}
          </Title>
          {isAuth && (
            <Button onClick={onLogout} danger size="large">
              {t('EXIT')}{' '}
            </Button>
          )}
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
