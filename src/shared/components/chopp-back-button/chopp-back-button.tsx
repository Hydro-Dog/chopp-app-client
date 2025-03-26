import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Props = {
  path: string;
  title?: ReactNode;
  icon?: ReactNode;
};

export const ChoppBackButton = ({ path, title, icon }: Props) => {
  const navigate = useNavigate();

  return (
    <Button
      shape={title ? 'default' : 'circle'}
      type="primary"
      icon={icon || <ArrowLeftOutlined />}
      onClick={() => {
        navigate(path);
      }}>
      {title}
    </Button>
  );
};
