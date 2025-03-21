import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ChoppShadowButton } from '../chopp-shadow-button';

type Props = {
  path: string;
  title: ReactNode;
};

export const ChoppBackButton = ({ path, title }: Props) => {
  const navigate = useNavigate();

  return (
    <ChoppShadowButton
      className="w-fit"
      icon={<ArrowLeftOutlined />}
      onClick={() => {
        navigate(path);
      }}>
      {title}
    </ChoppShadowButton>
  );
};
