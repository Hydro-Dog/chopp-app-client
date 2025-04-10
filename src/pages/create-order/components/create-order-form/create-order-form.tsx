import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ChoppPhoneInput, ChoppShadowCard } from '@shared/index';
import { Flex, Form, Input } from 'antd';

const { Item } = Form;

type Props = {
  errors: FieldErrors<{
    name: string;
    street: string;
    comment: string;
    phoneNumber: string;
    house: string;
    apartment: string;
    entrance: string;
    floor: string;
  }>;
  control: Control<
    {
      name: string;
      street: string;
      comment: string;
      phoneNumber: string;
      house: string;
      apartment: string;
      entrance: string;
      floor: string;
    },
    unknown
  >;
};

export const CreateOrderForm = ({ errors, control }: Props) => {
  const { t } = useTranslation();

  return (
    <ChoppShadowCard className="md:w-3/4">
      <Flex vertical className="md:w-3/4" gap="small">
        <Flex gap="small" className="flex-col md:flex-row" justify="center" align="center">
          <Item
            validateStatus={errors.name ? 'error' : ''}
            help={errors.name?.message}
            className="flex-1 w-full">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  size="large"
                  value={value}
                  placeholder={t('FORM_INFO.NAME')}
                  onBlur={onBlur}
                  onChange={onChange}
                />
              )}
            />
          </Item>
          <Item
            validateStatus={errors.phoneNumber ? 'error' : ''}
            help={errors.phoneNumber?.message}
            className="flex-1 w-full">
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <ChoppPhoneInput
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  errors={errors.phoneNumber}
                />
              )}
            />
          </Item>
        </Flex>

        <Item validateStatus={errors.street ? 'error' : ''} help={errors.street?.message}>
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                placeholder={t('FORM_INFO.STREET')}
                onBlur={onBlur}
                onChange={onChange}
                size="large"
              />
            )}
          />
        </Item>

        <Flex className="sm:flex-row flex-col" justify="space-between" gap="small" align="center">
          <Item
            validateStatus={errors.house ? 'error' : ''}
            help={errors.house?.message}
            className="w-full">
            <Controller
              control={control}
              name="house"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  placeholder={t('FORM_INFO.HOUSE')}
                  onBlur={onBlur}
                  onChange={onChange}
                  size="large"
                />
              )}
            />
          </Item>

          <Item
            validateStatus={errors.apartment ? 'error' : ''}
            help={errors.apartment?.message}
            className="w-full">
            <Controller
              control={control}
              name="apartment"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  placeholder={t('FORM_INFO.APARTMENT')}
                  onBlur={onBlur}
                  onChange={onChange}
                  size="large"
                />
              )}
            />
          </Item>

          <Item
            validateStatus={errors.entrance ? 'error' : ''}
            help={errors.entrance?.message}
            className="w-full">
            <Controller
              control={control}
              name="entrance"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  placeholder={t('FORM_INFO.ENTRANCE')}
                  onBlur={onBlur}
                  onChange={onChange}
                  size="large"
                />
              )}
            />
          </Item>

          <Item
            validateStatus={errors.floor ? 'error' : ''}
            help={errors.floor?.message}
            className="w-full">
            <Controller
              control={control}
              name="floor"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  placeholder={t('FORM_INFO.FLOOR')}
                  onBlur={onBlur}
                  onChange={onChange}
                  size="large"
                />
              )}
            />
          </Item>
        </Flex>

        <Item validateStatus={errors.comment ? 'error' : ''} help={errors.comment?.message}>
          <Controller
            control={control}
            name="comment"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input.TextArea
                value={value}
                placeholder={t('FORM_INFO.COMMENT')}
                onBlur={onBlur}
                onChange={onChange}
                autoSize={{ minRows: 3, maxRows: 5 }}
                size="large"
              />
            )}
          />
        </Item>
      </Flex>
    </ChoppShadowCard>
  );
};
