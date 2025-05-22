import { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWsNotification } from '@shared/index';
import { ClientAppConfig, PropsWithChildrenOnly } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { RootState } from '@store/index';
import { useBoolean } from 'usehooks-ts';
import { LoginModal } from './components';

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
  } = useBoolean(!!clientAppConfig?.disabled);

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
