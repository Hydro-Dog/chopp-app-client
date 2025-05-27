/* eslint-disable max-len */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { RocketOutlined } from '@ant-design/icons';
import {
  ChoppAnimatedIcon,
  ClientAppConfig,
  Order,
  ORDER_STATUS_MAP,
  STORAGE_KEYS,
  useSuperDispatch,
  useThemeToken,
  useWsNotification,
} from '@shared/index';
import { ShoppingCart } from '@shared/types/shopping-cart';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { fetchClientAppConfig, fetchCurrentUser } from '@store/slices';
import { fetchShoppingCart } from '@store/slices/shopping-cart-slice';
import { AppDispatch, RootState } from '@store/store';
import { RootHeader } from '@widgets/root-header/root-header';
import { Button, Flex, Layout, message, Space } from 'antd';
import { DisabledAppScreen } from './components';
import { useRootContext } from './root-provider';
import { useTranslation } from 'react-i18next';

const { Content, Footer } = Layout;

const getTelHref = (rawPhone: string) =>
  rawPhone
    ? 'tel:' +
      rawPhone
        .replace(/\D/g, '') // "89991234567"
        .replace(/^8/, '+7') // "+79991234567"
    : undefined;

export const RootContainer = () => {
  const { t } = useTranslation();
  const themeToken = useThemeToken();
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);
  const { superDispatch: fetchShoppingCartDispatch } = useSuperDispatch<ShoppingCart, void>();
  const { superDispatch: fetchClientAppConfigCartDispatch } = useSuperDispatch<
    ClientAppConfig,
    void
  >();
  const dispatch = useDispatch<AppDispatch>();

  const [messageApi, contextHolder] = message.useMessage();
  const { lastMessage: orderStatusChangeNotification } = useWsNotification<Order>(
    WS_MESSAGE_TYPE.ORDER_STATUS,
  );

  const { isAppDisabled } = useRootContext();

  useEffect(() => {
    if (orderStatusChangeNotification) {
      messageApi.open({
        type: 'success',
        content: (
          <Space>
            {`${t('ORDER_STATUS_TITLE')}: ${t(ORDER_STATUS_MAP[orderStatusChangeNotification.payload!.orderStatus].title)}`}

            <ChoppAnimatedIcon animation="rotate" icon={<RocketOutlined rotate={50} />} />
          </Space>
        ),
      });
    }
  }, [messageApi, orderStatusChangeNotification]);

  useEffect(() => {
    fetchClientAppConfigCartDispatch({ action: fetchClientAppConfig() });

    if (localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
      fetchShoppingCartDispatch({ action: fetchShoppingCart() });
      dispatch(fetchCurrentUser());
    }
  }, []);

  return (
    <>
      <Flex vertical className="min-h-screen">
        <div className="sticky top-0 z-50">
          <RootHeader className="h-14" />
        </div>
        <Content style={{ background: themeToken.colorBgBase }} className="px-4 pt-6 flex-auto">
          <Outlet />
        </Content>

        <Footer
          className="!p-2"
          style={{
            background: themeToken.colorBgBase,
            borderTop: `1px solid ${themeToken.colorBorder}`,
          }}>
          <Flex vertical align="end">
            {clientAppConfig?.phoneNumber && (
              <Button type="link" href={getTelHref(clientAppConfig?.phoneNumber)} className='text-xs h-fit'>
                {clientAppConfig?.phoneNumber}
              </Button>
            )}
            <Button type="link" href="/delivery" className='text-xs h-fit'>
              Доставка и оплата
            </Button>
            <Button type="link" href="/description" className='text-xs h-fit'>
              О нас
            </Button>
            <Button type="link" href="/publicOffer" className='text-xs h-fit'>
              Публичная оферта
            </Button>
            {/* <Button type="link">[Политика конфиденциальности]</Button> */}
          </Flex>
        </Footer>
      </Flex>

      <DisabledAppScreen isOpen={isAppDisabled} />
      {/* TODO: вынести нотификации в отдельный компонент */}
      {contextHolder}
    </>
  );
};
