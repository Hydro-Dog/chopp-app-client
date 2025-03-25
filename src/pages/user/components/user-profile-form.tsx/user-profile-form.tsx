import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserProfileFormSchema } from '@pages/user/hooks';
import { useSuperDispatch, useThemeToken } from '@shared/hooks';
import { User } from '@shared/types';
import { updateCurrentUser } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Form, Input } from 'antd';
import { z } from 'zod';
const { Item } = Form;

export const UserProfileForm = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const themeToken = useThemeToken();
  const [numberInputIsFocus, setNumberInputFocus] = useState(false);

  const { superDispatch } = useSuperDispatch<User, unknown>();

  const userProfileFormSchema = useUserProfileFormSchema();
  type userProfileFormSchemaType = z.infer<typeof userProfileFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<userProfileFormSchemaType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      phoneNumber: currentUser?.phoneNumber,
      name: currentUser?.fullName,
      email: currentUser?.email,
    },
  });
  const onSubmit: SubmitHandler<userProfileFormSchemaType> = (data) => {
    superDispatch({
      action: updateCurrentUser({ ...data, id: currentUser?.id }),
      thenHandler: () => {
        console.log('ok');
      },
    });
  };
  return (
    <Form>
      <Item validateStatus={errors.phoneNumber ? 'error' : ''} help={errors.phoneNumber?.message}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMask
              mask="+7 (999) 999-99-99"
              value={value}
              onChange={onChange}
              onBlur={() => {
                setNumberInputFocus(false);
                onBlur();
              }}
              onFocus={() => setNumberInputFocus(true)}
              maskChar="_"
              //Я понимаю что практика не очень хорошая, но чтоб стили были одинаковые - пришлось
              className="w-full outline-none text-[18px] px-[11px] py-[6px] rounded-lg"
              style={{
                background: themeToken.colorBgBase,
                // eslint-disable-next-line max-len
                border: `1px solid ${errors.phoneNumber ? themeToken.colorError : numberInputIsFocus ? themeToken.colorPrimary : themeToken.colorBorder}`,
                transition: 'border-color 0.7s ease',
              }}></InputMask>
          )}
        />
      </Item>
      <Item validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={t('NAME')}
              value={value ?? ''}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </Item>
      <Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder={t('BY_EMAIL')}
              value={value ?? ''}
              onChange={onChange}
              onBlur={onBlur}
            />
          )}
        />
      </Item>
      <Button onClick={handleSubmit(onSubmit)}>{t('ACCEPT')}</Button>
    </Form>
  );
};
