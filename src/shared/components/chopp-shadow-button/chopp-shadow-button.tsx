import { Button, ButtonProps } from 'antd';

type Props = ButtonProps & {
  className?: string;
  children?: React.ReactNode;
};

export const ChoppShadowButton = ({ children, className, ...props }: Props) => {
  return (
    <Button className={`!shadow-md border-none ${className}`} {...props}>
      {children}
    </Button>
  );
};
