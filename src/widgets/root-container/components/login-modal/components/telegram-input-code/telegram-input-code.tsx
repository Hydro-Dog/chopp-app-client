import { useAutoFocus, useSuperDispatch } from '@shared/hooks';
import { UserAuthorization, verifyByCode } from '@store/slices';
import { Button, Flex, Input, Typography } from 'antd';
import { useRef, useState } from 'react';

const { Text, Title, Link } = Typography;

type Props = {
  phoneNumber: string;
};

export const TelegramInputCode = ({ phoneNumber }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  //   TODO: выяснить почему не работает автофокус
  useAutoFocus({ open: true, inputRef });

  const [code, setCode] = useState('');

  const { superDispatch } = useSuperDispatch<UserAuthorization, { code: string }>();

  const onSubmit = (code: string) => {
    superDispatch({
      action: verifyByCode({ code, phoneNumber }),
      thenHandler: (data) => {
        console.log('data: ', data);
      },
    });
  };

  return (
    <Flex vertical gap={20}>
      <Flex vertical gap={4}>
        <Text>
          1. Перейдите в нашего <Link>Телеграм-бота</Link>
        </Text>
        <Text>2. Нажминте /start</Text>
        <Text>3. Предоставьте доступ номеру телефона</Text>
        <Text>4. Получите код и введите в поле ниже</Text>
      </Flex>
      <Flex justify="center">
        <Input.OTP onChange={setCode} />
      </Flex>
      <Button onClick={() => onSubmit(code)} disabled={code.length < 6} size="large" type="primary">
        Отправить
      </Button>
    </Flex>
  );
};
