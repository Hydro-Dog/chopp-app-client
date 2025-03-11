import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, Form, Input, Modal, Typography } from 'antd';
import { useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import InputMask from 'react-input-mask';
import { useSuperDispatch } from '@shared/hooks';
import { User } from '@shared/types';
import { loginByCode } from '@store/slices';

const { Item } = Form;

const { Text, Title } = Typography;

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const LoginModal = ({ isOpen, close }: Props) => {
  const { superDispatch } = useSuperDispatch<User, { phoneNumber: string }>();

  const phoneSchema = z.object({
    phoneNumber: z
      .string()
      .min(10, 'Введите корректный номер телефона')
    //   .regex(/^\+?\d{10,15}$/, 'Некорректный формат номера'),
  });

  type PhoneNumberFormType = z.infer<typeof phoneSchema>;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<PhoneNumberFormType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: '' },
  });

  const onSubmitSms: SubmitHandler<PhoneNumberFormType> = ({ phoneNumber }) => {
    console.log('Отправка номера:', phoneNumber);
  };

  const onSubmitTelegram: SubmitHandler<PhoneNumberFormType> = ({ phoneNumber }) => {
    superDispatch({
        action: loginByCode({ phoneNumber }),
        thenHandler: (user) => {
          console.log('user: ', user);
        },
      });
  };

  const onSendTelegram = (phoneNumber: string) => {
    
  };

  const handleSms = (phoneNumber: string) => {
    // onSendSms(phoneNumber);
    // onClose();
  };

  const handleTelegram = (phoneNumber: string) => {
    console.log('handleTelegram: ', phoneNumber);
    onSendTelegram(phoneNumber);
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      className="max-w-2xs"
      title={
        <Title className="!font-bold" level={4}>
          Вход
        </Title>
      }
      open={isOpen}
      onClose={handleClose}
      onCancel={handleClose}
      footer={false}>
      <Text>ПИН-код для входа на сайт будет передан в по СМС или в Telegram</Text>
      <Form >
        <Item validateStatus={errors.phoneNumber ? 'error' : ''} help={errors.phoneNumber?.message}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <InputMask
                {...field}
                ref={inputRef}
                mask="+7 (999) 999-99-99"
                maskChar="_"
                className="w-full p-2 border rounded-md mt-5"
                placeholder="+7 (___) ___-__-__"
              />
            )}
          />
        </Item>

        <Flex gap={8} vertical justify="space-between" className=" mt-8">
          <Button disabled size="large" type="primary" onClick={handleSubmit(onSubmitSms)}>
            Отправить по СМС
          </Button>
          <Button size="large" type="primary" onClick={handleSubmit(onSubmitTelegram)}>
            Отправить в Телеграм
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
