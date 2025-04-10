import { RefObject } from 'react';
import { FieldErrors } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useThemeToken } from '@shared/hooks';

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errors: FieldErrors<{
    phoneNumber: string;
    fullName?: string | null | undefined;
    email?: string | null | undefined;
  }>;
  setNumberInputFocus: (value: boolean) => void;
  numberInputIsFocus: boolean;
  currentUser?: { phoneNumber?: string };
  ref?: RefObject<HTMLInputElement>;
};

export const ChoppPhoneInput = ({
  value,
  onChange,
  onBlur,
  ref,
  errors,
  setNumberInputFocus,
  numberInputIsFocus,
}: Props) => {
  const themeToken = useThemeToken();
  return (
    <InputMask
      inputRef={ref}
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="+7 (___) ___-__-__"
      onFocus={() => setNumberInputFocus(true)}
      maskChar="_"
      //Я понимаю что практика не очень хорошая, но чтоб стили были одинаковые - пришлось
      className="w-full outline-none text-[18px] px-[11px] py-[6px] rounded-lg"
      style={{
        background: themeToken.colorBgContainer,
        // eslint-disable-next-line max-len
        border: `1px solid ${errors.phoneNumber ? themeToken.colorError : numberInputIsFocus ? themeToken.colorPrimary : themeToken.colorBorder}`,
        transition: 'border-color 0.5s ease',
      }}></InputMask>
  );
};
