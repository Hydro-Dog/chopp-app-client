import { THEME, useTheme, useThemeToken } from '@shared/index';
import { Collapse, CollapseProps } from 'antd';

type Props = CollapseProps & {
  className?: string;
  children?: React.ReactNode;
};

export const ChoppShadowCollapse = ({ children, className, ...props }: Props) => {
  const themeToken = useThemeToken();
  const { theme } = useTheme();

  return (
    <Collapse
      style={{
        background: themeToken.colorBgBase,
        boxShadow: `0 4px 16px ${theme === THEME.DARK ? themeToken.colorBgSpotlight : themeToken.colorBorderSecondary}`,
      }}
      className={`border-none chopp-collapse ${className}`}
      {...props}>
      {children}
    </Collapse>
  );
};
