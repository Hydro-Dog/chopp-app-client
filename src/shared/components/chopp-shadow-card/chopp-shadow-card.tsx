import { Card, CardProps } from 'antd';

type Props = CardProps & {
  className?: string;
  children?: React.ReactNode;
};

export const ChoppShadowCard = ({ children, className, ...props }: Props) => {
  return (
    <Card className={`!shadow-lg border-none ${className}`} {...props}>
      {children}
    </Card>
  );
};
