import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ORDER_STATUS } from '@shared/enum';
import { useWsNotification } from '@shared/index';
import { ClientAppConfig, Order, Product, PropsWithChildrenOnly } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { useBoolean } from 'usehooks-ts';
import { LoginModal } from './components';
import { AppConfig } from 'antd/es/app/context';
import { RootState } from '@store/index';
import { useSelector } from 'react-redux';

type RootContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isAppDisabled: boolean;
  disableApp: () => void;
  enableApp: () => void;
};

const RootContext = createContext<RootContextType | undefined>(undefined);

export const RootProvider = ({ children }: PropsWithChildrenOnly) => {
  const {
    value: isLoginModalOpen,
    setTrue: openLoginModal,
    setFalse: closeLoginModal,
  } = useBoolean();

  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);
  const {
    value: isAppDisabled,
    setTrue: disableApp,
    setFalse: enableApp,
  } = useBoolean(clientAppConfig?.disabled);

  const { lastMessage: appConfigNotification } = useWsNotification<ClientAppConfig>(
    WS_MESSAGE_TYPE.CLIENT_APP_CONFIG_STATUS,
  );

  useEffect(() => {
    if (clientAppConfig?.disabled) {
      disableApp();
    } else {
      enableApp();
    }
  }, [clientAppConfig?.disabled]);

  useEffect(() => {
    console.log('appConfigNotification: ', appConfigNotification);
    if (appConfigNotification?.payload) {
      if (appConfigNotification?.payload?.disabled) {
        console.log('!!! disableApp !!!');
        disableApp();
      } else {
        console.log('!!! enableApp !!!');
        enableApp();
      }
    }
  }, [appConfigNotification, appConfigNotification?.payload?.disabled, disableApp, enableApp]);

  return (
    <RootContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        isAppDisabled,
        disableApp,
        enableApp,
      }}>
      {children}
      <LoginModal close={closeLoginModal} isOpen={isLoginModalOpen} />
    </RootContext.Provider>
  );
};

export const useRootContext = () => {
  const context = useContext(RootContext);
  if (!context) {
    throw new Error('useRootContext must be used with RootProvider.');
  }
  return context;
};
