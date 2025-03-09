import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { PropsWithChildrenOnly } from '@shared/types';
import { Button } from 'antd';

export const BackLayout = ({ children }: PropsWithChildrenOnly) => {
  const navigate = useNavigate();

  return (
    <div className="w-full py-2">
      <Button
        shape="round"
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)} // Навигация на один шаг назад
      >
        [Назад]
      </Button>
      {children}
    </div>
  );
};
