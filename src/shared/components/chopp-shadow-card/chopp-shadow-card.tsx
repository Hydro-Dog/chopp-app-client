import { useTheme } from '@shared/context';
import { THEME } from '@shared/enum';
import { useThemeToken } from '@shared/hooks';
import { Card, CardProps } from 'antd';

type Props = CardProps & {
  className?: string;
  children?: React.ReactNode;
};

export const ChoppShadowCard = ({ children, className, ...props }: Props) => {
  const themeToken = useThemeToken();
  const { theme } = useTheme();

  return (
    <Card
      className={`border-none chopp-card-p4 ${className}`}
      style={{
        background: themeToken.colorBgBase,
        // eslint-disable-next-line max-len
        boxShadow: `0 4px 16px ${theme === THEME.DARK ? themeToken.colorBgSpotlight : themeToken.colorBorderSecondary}`, // 👈 твоя кастомная тень
        borderRadius: '16px',
        ...props.style,
      }}
      {...props}>
      {children}
    </Card>
  );
};
