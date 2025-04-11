import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { STORAGE_KEYS } from '@shared/enum';
import { FETCH_STATUS } from '@shared/types';
import { logout, setLogoutStatus } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { useRootContext } from '@widgets/root-container/root-provider';
import { Button, Flex } from 'antd';
import { UserProfileForm } from './components';
export const UserPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { showNotification } = useNotificationContext();
  const { openLoginModal } = useRootContext();

  const onLogout = () => {
    dispatch(logout({ refreshToken: String(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) }));
  };
  useEffect(() => {
    if (logoutStatus === FETCH_STATUS.ERROR) {
      showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
    } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
      dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
    }
  }, [dispatch, logoutStatus, showNotification, openLoginModal]);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
      openLoginModal();
    }
  }, []);

  return (
    <ChoppSubPage
      title={
        <Flex className="justify-between items-center w-full">
          <div>{t('PROFILE')}</div>
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
