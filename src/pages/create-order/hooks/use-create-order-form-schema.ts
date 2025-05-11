import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useCreateOrderFormSchema = () => {
  const { t } = useTranslation();

  return z.object({
    name: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .min(2, `${t('FORM_ERRORS.MIN_LENGTH', { count: 2 })}`)
      .max(30, `${t('FORM_ERRORS.MAX_LENGTH', { count: 30 })}`),
    street: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .min(5, `${t('FORM_ERRORS.MIN_LENGTH', { count: 5 })}`)
      .max(20, `${t('FORM_ERRORS.MAX_LENGTH', { count: 20 })}`),
    house: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .max(15, `${t('FORM_ERRORS.MAX_LENGTH', { count: 15 })}`),
    apartment: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .max(15, `${t('FORM_ERRORS.MAX_LENGTH', { count: 15 })}`),
    entrance: z.string().min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`),
    floor: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .max(15, `${t('FORM_ERRORS.MAX_LENGTH', { count: 15 })}`),
    comment: z.string().max(2048, `${t('FORM_ERRORS.MAX_LENGTH', { count: 2048 })}`),
    phoneNumber: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, `${t('FORM_ERRORS.INVALID_PHONE_NUMBER')}`),
  });
};
