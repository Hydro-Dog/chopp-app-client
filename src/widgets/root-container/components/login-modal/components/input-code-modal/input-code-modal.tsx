import { useRef, useState } from 'react';
import { useAutoFocus, useSuperDispatch } from '@shared/hooks';
import { useNotificationContext } from '@shared/index';
import { User } from '@shared/types';
import { fetchCurrentUser, UserAuthorization, verifyByCode, wsConnect } from '@store/slices';
import { Button, Flex, Input, Typography } from 'antd';
import { AppDispatch } from '@store/index';
import { useDispatch } from 'react-redux';
import { fetchShoppingCart } from '@store/slices/shopping-cart-slice';

const { Text, Title, Link } = Typography;

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
  const { showErrorNotification, showSuccessNotification } = useNotificationContext();
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

  return (
    <Flex vertical gap={20}>
      <Flex justify="center">
        <Input.OTP onChange={setCode} />
      </Flex>
      <Button onClick={() => onSubmit(code)} disabled={code.length < 6} size="large" type="primary">
        Отправить
      </Button>
    </Flex>
  );
};
