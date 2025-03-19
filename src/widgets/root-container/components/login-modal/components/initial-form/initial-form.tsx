import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAutoFocus, useSuperDispatch } from '@shared/hooks';
import { User } from '@shared/types';
import { sanitizePhoneNumber } from '@shared/utils';
import { getVerificationCode } from '@store/slices';
import { Button, Flex, Form, Modal, Typography } from 'antd';
import { z } from 'zod';
import { VIEW_MODE } from '../../enum/view-mode';

const { Item } = Form;

const { Text, Title, Link } = Typography;

type Props = {
  setViewMode: Dispatch<SetStateAction<VIEW_MODE>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
};

export const InitialForm = ({ setViewMode, setPhoneNumber }: Props) => {
  const phoneSchema = z.object({
    phoneNumber: z.string().min(10, 'Некорректный номер телефона'),
    //   .regex(/^\+?\d{10,15}$/, 'Некорректный формат номера'),
  });

  type PhoneNumberFormType = z.infer<typeof phoneSchema>;
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const { superDispatch } = useSuperDispatch<User, { phoneNumber: string }>();

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
      action: getVerificationCode({ phoneNumber }),
      thenHandler: (user) => {
        setViewMode(VIEW_MODE.TELEGRAM);
        setPhoneNumber(phoneNumber);
        console.log('user: ', user);
      },
    });
  };

  useAutoFocus({ open: true, inputRef });

  return (
    <Flex vertical>
      <Text>ПИН-код для входа на сайт будет передан в по СМС или в Telegram</Text>
      <Form>
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

        <Flex gap={8} vertical justify="space-between" className=" my-8">
          <Button disabled size="large" type="primary" onClick={handleSubmit(onSubmitSms)}>
            Отправить по СМС
          </Button>
          <Button size="large" type="primary" onClick={handleSubmit(onSubmitTelegram)}>
            Отправить в Телеграм
          </Button>
        </Flex>

        <Text>
          Нажимая кнопку, вы принимаете{' '}
          <Link href="/" target="_blank">
            условия обработки персональных данных
          </Link>
        </Text>
      </Form>
    </Flex>
  );
};
