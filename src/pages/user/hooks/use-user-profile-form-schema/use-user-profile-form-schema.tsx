import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const useUserProfileFormSchema = () => {
  const { t } = useTranslation();
  return z.object({
    phoneNumber: z
      .string()
      .min(1, `${t('FORM_ERRORS.REQUIRED_FIELD')}`)
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, `${t('FORM_ERRORS.INVALID_PHONE_NUMBER')}`),
    fullName: z
      .string()
      .min(8, `${t('FORM_ERRORS.MIN_LENGTH', { count: 8 })}`)
      .max(15, `${t('FORM_ERRORS.MAX_LENGTH', { count: 15 })}`),
    email: z.string().email(`${t('FORM_ERRORS.INVALID_EMAIL')}`),
    //birthday: z.string().regex(/\d{4}-\d{2}-\d{2}/, `${t('FORM_ERRORS.INVALID_DATE')}`),
  });
};
