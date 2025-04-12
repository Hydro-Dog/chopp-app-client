import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { ChoppShadowCard, ChoppSubPage } from '@shared/components';
import { useNotificationContext } from '@shared/context';
import { STORAGE_KEYS } from '@shared/enum';
import { useSuperDispatch } from '@shared/hooks';
import { FETCH_STATUS } from '@shared/types';
import { logout, setLogoutStatus } from '@store/slices';
import { AppDispatch, RootState } from '@store/store';
import { Button, Flex, Typography } from 'antd';
import { UserProfileForm } from './components';
const { Title } = Typography;

export const UserPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { logoutStatus } = useSelector((state: RootState) => state.user);
  const { showNotification } = useNotificationContext();
  const { superDispatch } = useSuperDispatch();

  const onLogout = () => {
    superDispatch({
      action: logout({ refreshToken: String(localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)) }),
      thenHandler: () => {
        if (logoutStatus === FETCH_STATUS.ERROR) {
          showNotification({ type: 'error', message: 'Ошибка', description: 'Неудачный логаут' });
        } else if (logoutStatus === FETCH_STATUS.SUCCESS) {
          dispatch(setLogoutStatus(FETCH_STATUS.IDLE));
        }
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
