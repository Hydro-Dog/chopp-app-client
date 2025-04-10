import { Dispatch, SetStateAction, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChoppPhoneInput } from '@shared/components';
import { useAutoFocus, useSuperDispatch } from '@shared/hooks';
import { User } from '@shared/types';
import { getVerificationCode } from '@store/slices';
import { Button, Flex, Form, Typography } from 'antd';
import { z } from 'zod';
import { VIEW_MODE } from '../../enum/view-mode';

const { Item } = Form;

const { Text, Title, Link } = Typography;

type Props = {
  setViewMode: Dispatch<SetStateAction<VIEW_MODE>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
};

export const SendCodeModal = ({ setViewMode, setPhoneNumber }: Props) => {
  const { t } = useTranslation();
  const phoneSchema = z.object({
    phoneNumber: z
      .string()
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, `${t('FORM_ERRORS.INVALID_PHONE_NUMBER')}`),
    //   .regex(/^\+?\d{10,15}$/, 'Некорректный формат номера'),
  });

  type PhoneNumberFormType = z.infer<typeof phoneSchema>;

  const inputRef = useRef<HTMLInputElement>(null);

  const { superDispatch } = useSuperDispatch<User, { phoneNumber: string }>();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<PhoneNumberFormType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: '' },
  });

  const a = watch('phoneNumber');
  console.log('a: ', a);
  console.log('isValid: ', isValid);

  const onSubmitSms: SubmitHandler<PhoneNumberFormType> = ({ phoneNumber }) => {
    console.log('Отправка номера:', phoneNumber);
  };

  const onSubmitTelegram: SubmitHandler<PhoneNumberFormType> = ({ phoneNumber }) => {
    superDispatch({
      action: getVerificationCode({ phoneNumber }),
      thenHandler: (user) => {
        setViewMode(VIEW_MODE.TELEGRAM);
        setPhoneNumber(phoneNumber);
      },
    });
  };

  useAutoFocus({ open: true, inputRef });

  return (
    <Flex vertical>
      <Flex vertical gap={12}>
        <Text>ПИН-код для входа на сайт будет передан в Telegram</Text>

        <Flex vertical gap={4}>
          <Text>
            1. Перейдите в нашего{' '}
            <Link target="_blank" href={`https://t.me/${import.meta.env.VITE_TELEGRAM_BOT_LINK}`}>
              Телеграм-бота
            </Link>
          </Text>
          <Text>2. Нажминте /start</Text>
          <Text>3. Предоставьте боту доступ к номеру телефона</Text>
          <Text>4. Введите номер в поле ниже</Text>
        </Flex>
      </Flex>

      <Form>
        <Item validateStatus={errors.phoneNumber ? 'error' : ''} help={errors.phoneNumber?.message}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ChoppPhoneInput
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                errors={errors.phoneNumber}
              />
            )}
          />
        </Item>

        <Flex gap={8} vertical justify="space-between" className=" my-8">
          {/* <Button disabled size="large" type="primary" onClick={handleSubmit(onSubmitSms)}>
            Отправить по СМС
          </Button> */}
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
