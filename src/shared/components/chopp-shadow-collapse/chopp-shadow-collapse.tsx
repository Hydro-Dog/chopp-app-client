import { useThemeToken } from '@shared/index';
import { Collapse, CollapseProps } from 'antd';

type Props = CollapseProps & {
  className?: string;
  children?: React.ReactNode;
};

export const ChoppShadowCollapse = ({ children, className, ...props }: Props) => {
  const themeToken = useThemeToken();

  return (
    <Collapse
      style={{ background: themeToken.colorBgBase }}
      className={`!shadow-lg border-none chopp-collapse ${className}`}
      {...props}>
      {children}
    </Collapse>
  );
};
