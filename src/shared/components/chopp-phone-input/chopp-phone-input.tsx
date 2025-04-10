import { RefObject, useState } from 'react';
import { FieldError } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useThemeToken } from '@shared/hooks';

type Props = {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errors: FieldError | undefined;
  currentUser?: { phoneNumber?: string };
  ref?: RefObject<HTMLInputElement>;
};

export const ChoppPhoneInput = ({ value, onChange, onBlur, ref, errors }: Props) => {
  const themeToken = useThemeToken();
  const [numberInputIsFocus, setNumberInputFocus] = useState(false);

  return (
    <InputMask
      inputRef={ref}
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={onChange}
      onBlur={() => {
        onBlur();
        setNumberInputFocus(false);
      }}
      placeholder="+7 (___) ___-__-__"
      onFocus={() => setNumberInputFocus(true)}
      maskChar="_"
      className="w-full outline-none text-[18px] px-[11px] py-[6px] rounded-lg"
      style={{
        background: themeToken.colorBgContainer,
        border: `1px solid ${
          errors
            ? themeToken.colorError
            : numberInputIsFocus
              ? themeToken.colorPrimary
              : themeToken.colorBorder
        }`,
        transition: 'border-color 0.5s ease',
      }}></InputMask>
  );
};
