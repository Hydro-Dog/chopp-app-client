import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserProfileFormSchema } from '@pages/user/hooks';
import { useSuperDispatch, useThemeToken } from '@shared/hooks';
import { User } from '@shared/types';
import { formatPhoneNumber } from '@shared/utils';
import { updateCurrentUser } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Flex, Form, Input } from 'antd';
import { z } from 'zod';
const { Item } = Form;

export const UserProfileForm = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const themeToken = useThemeToken();
  const [numberInputIsFocus, setNumberInputFocus] = useState(false);
  const [isEdit, setEdit] = useState(false);

  const { superDispatch } = useSuperDispatch<User, unknown>();

  const userProfileFormSchema = useUserProfileFormSchema();
  type userProfileFormSchemaType = z.infer<typeof userProfileFormSchema>;

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<userProfileFormSchemaType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      phoneNumber: '',
      fullName: currentUser?.fullName,
      email: currentUser?.email,
    },
  });
  useEffect(() => {
    if (currentUser?.phoneNumber) {
      reset({
        phoneNumber: formatPhoneNumber(currentUser?.phoneNumber),
        fullName: currentUser.fullName,
        email: currentUser.email,
      });
    }
  }, [currentUser, reset]);
  const onSubmit: SubmitHandler<userProfileFormSchemaType> = (data) => {
    if (isEdit) {
      superDispatch({
        action: updateCurrentUser(data),
        thenHandler: () => {
          console.log('ok');
          setEdit(false);
        },
      });
    }
  };
  return (
    <Form>
      <Flex gap="small" vertical className="sm:items-start items-center" justify="center">
        <Flex gap="small" className="sm:flex-row flex-col">
          <Item validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message}>
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={t('NAME')}
                  value={value ?? ''}
                  onChange={(event) => {
                    setEdit(true);
                    onChange(event);
                  }}
                  onBlur={onBlur}
                  size="large"
                />
              )}
            />
          </Item>
          <Item
            validateStatus={errors.phoneNumber ? 'error' : ''}
            help={errors.phoneNumber?.message}>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputMask
                  mask="+7 (999) 999-99-99"
                  value={value}
                  onChange={(event) => {
                    setEdit(true);
                    onChange(event);
                  }}
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
        </Flex>
        <Flex vertical gap="small">
          <Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder={t('BY_EMAIL')}
                  value={value ?? ''}
                  onChange={(event) => {
                    setEdit(true);
                    onChange(event);
                  }}
                  onBlur={onBlur}
                  size="large"
                />
              )}
            />
          </Item>
          <Button disabled={!isEdit} type="primary" onClick={handleSubmit(onSubmit)}>
            {t('ACCEPT')}
          </Button>
        </Flex>
      </Flex>
    </Form>
  );
};
