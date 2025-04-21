import { useEffect } from 'react';
import { Order } from '@shared/types';
import { WS_MESSAGE_TYPE } from '@shared/types/ws-message-type';
import { useWsNotification } from './use-ws-notification';
import { NotificationsState } from '@store/index';

/**
 * Аргументы хука useOnNewOrder
 */
type Args = {
  /** Коллбэк, вызываемый при получении нового заказа */
  cb: () => void;
  /** Массив зависимостей для useEffect */
  deps: React.DependencyList;
  /** Тип нотификации NotificationsState*/
  type: keyof NotificationsState;
};

/**
 * Хук подписывается на WebSocket-сообщения о новых заказах
 * и вызывает переданный коллбэк при получении такого сообщения.
 *
 * @param cb - функция, которая будет вызвана при поступлении нового заказа
 * @param deps - зависимости, при изменении которых useEffect перезапускается
 * @param type - тип нотификации
 */
export const useOnNewNotification = ({ cb, deps, type }: Args): void => {
  const { lastMessage: newOrderNotification } = useWsNotification<Order>(type);

  useEffect(() => {
    if (newOrderNotification) {
      cb();
    }
  }, deps);
};
