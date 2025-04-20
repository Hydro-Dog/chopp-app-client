import { KeyboardEventHandler, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAutoFocus, useSuperDispatch } from '@shared/hooks';
import { useNotificationContext } from '@shared/index';
import { User } from '@shared/types';
import { AppDispatch } from '@store/index';
import { fetchCurrentUser, UserAuthorization, verifyByCode, wsConnect } from '@store/slices';
import { fetchShoppingCart } from '@store/slices/shopping-cart-slice';
import { Button, Flex, Input } from 'antd';

type Props = {
  phoneNumber: string;
  closeModal: () => void;
};

export const InputCodeModal = ({ closeModal, phoneNumber }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  //   TODO: выяснить почему не работает автофокус
  useAutoFocus({ open: true, inputRef });

  const [code, setCode] = useState('');

  const { superDispatch: superDispatchVerify } = useSuperDispatch<
    UserAuthorization,
    { code: string }
  >();
  const { superDispatch: superDispatchFetchCurrentUser } = useSuperDispatch<User, void>();
  const { showSuccessNotification } = useNotificationContext();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (code: string) => {
    superDispatchVerify({
      action: verifyByCode({ code, phoneNumber }),
      thenHandler: (data) => {
        console.log('data: ', data);
        dispatch(
          wsConnect({
            url: `${import.meta.env.VITE_BASE_WS}`,
          }),
        );
        superDispatchFetchCurrentUser({
          action: fetchCurrentUser(),
          thenHandler: () => {
            closeModal();
            dispatch(fetchShoppingCart());
            showSuccessNotification({ message: 'success login' });
          },
        });
      },
    });
  };
  const onEnter: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Enter' && code.length === 6) {
      onSubmit(code);
    }
  };
  return (
    <Flex vertical gap={20}>
      <Flex justify="center">
        <Input.OTP onKeyDown={onEnter} onChange={setCode} />
      </Flex>
      <Button onClick={() => onSubmit(code)} disabled={code.length < 6} size="large" type="primary">
        Отправить
      </Button>
    </Flex>
  );
};
