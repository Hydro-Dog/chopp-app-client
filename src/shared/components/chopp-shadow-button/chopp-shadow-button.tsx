import { THEME } from '@shared/enum';
import { useThemeToken } from '@shared/hooks';
import { useTheme } from '@shared/index';
import { Button, ButtonProps } from 'antd';

type Props = ButtonProps & {
  className?: string;
  children?: React.ReactNode;
  selected?: boolean;
};

export const ChoppShadowButton = ({ children, selected, className, ...props }: Props) => {
  const themeToken = useThemeToken();
  const { theme } = useTheme();

  return (
    <Button
      style={{
        background: selected ? themeToken.colorPrimaryBg : themeToken.colorBgBase,
        // eslint-disable-next-line max-len
        boxShadow: `0 4px 16px ${theme === THEME.DARK ? themeToken.colorBgSpotlight : themeToken.colorBorderSecondary}`, // 👈 твоя кастомная тень
      }}
      className={`border-none ${className}`}
      {...props}>
      {children}
    </Button>
  );
};
