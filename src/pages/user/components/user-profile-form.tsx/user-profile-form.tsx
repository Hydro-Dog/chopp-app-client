import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserProfileFormSchema } from '@pages/user/hooks';
import { ChoppPhoneInput } from '@shared/components';
import { useSuperDispatch } from '@shared/hooks';
import { User } from '@shared/types';
import { formatPhoneNumber, sanitizePhoneNumber } from '@shared/utils';
import { updateCurrentUser } from '@store/slices';
import { RootState } from '@store/store';
import { Button, Flex, Form, Input } from 'antd';
import { z } from 'zod';
const { Item } = Form;

export const UserProfileForm = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.user);
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
      fullName: '',
      email: '',
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
    console.log('data', data);
    if (isEdit) {
      superDispatch({
        action: updateCurrentUser({
          id: currentUser?.id || '',
          phoneNumber: sanitizePhoneNumber(data.phoneNumber),
          fullName: data.fullName,
          email: data.email,
        }),
        thenHandler: () => {
          console.log('ok');
          setEdit(false);
        },
      });
    }
  };

  return (
    <Form className="md:w-1/2 w-full">
      <Flex gap="small" vertical justify="center">
        <Item validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message}>
          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder={t('FULL_NAME')}
                value={value ?? ''}
                onChange={(event) => {
                  setEdit(event.target.value !== (currentUser?.fullName || '') ? true : false);
                  onChange(event);
                }}
                onBlur={onBlur}
                size="large"
              />
            )}
          />
        </Item>
        <Item validateStatus={errors.phoneNumber ? 'error' : ''} help={errors.phoneNumber?.message}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <ChoppPhoneInput
                value={value}
                onChange={(event) => {
                  setEdit(
                    event.target.value !== (formatPhoneNumber(currentUser?.phoneNumber) || '')
                      ? true
                      : false,
                  );
                  onChange(event);
                }}
                onBlur={onBlur}
                errors={errors.phoneNumber}
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
                onChange={(event) => {
                  setEdit(event.target.value !== (currentUser?.email || '') ? true : false);
                  onChange(event);
                }}
                onBlur={onBlur}
                size="large"
              />
            )}
          />
        </Item>
        <Button disabled={!isEdit} type="primary" onClick={handleSubmit(onSubmit)}>
          {t('SAVE')}
        </Button>
      </Flex>
    </Form>
  );
};
