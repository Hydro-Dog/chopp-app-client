import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserProfileFormSchema } from '@pages/user/hooks';
import { RootState } from '@store/store';
import { Form, Input } from 'antd';
import Item from 'antd/es/descriptions/Item';
import { z } from 'zod';

export const UserProfileForm = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.user);

  const userProfileFormSchema = useUserProfileFormSchema();
  type userProfileFormSchemaType = z.infer<typeof userProfileFormSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<userProfileFormSchemaType>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      phoneNumber: currentUser?.phoneNumber,
      name: currentUser?.fullName,
      email: currentUser?.email,
    },
  });
  return (
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
      <Item validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
        <Controller
          name="name"
          control={control}
          render={({ value, onChange, onBlur }) => (
            <Input placeholder={t('NAME')} value={value} onChange={onChange} onBlur={onBlur} />
          )}
        />
      </Item>
      <Item validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
        <Controller
          name="email"
          control={control}
          render={({ value, onChange, onBlur }) => (
            <Input placeholder={t('BY_EMAIL')} value={value} onChange={onChange} onBlur={onBlur} />
          )}
        />
      </Item>
    </Form>
  );
};
