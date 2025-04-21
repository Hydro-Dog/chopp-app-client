import { PropsWithChildren, ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import { ChoppBackButton } from '../chopp-back-button';

const { Title } = Typography;

type Props = {
  title: ReactNode;
  path?: string;
  icon?: ReactNode;
};

export const ChoppSubPage = ({ title, children, path, icon }: PropsWithChildren<Props>) => {
  return (
    <Flex gap={18} vertical className="pb-5">
      <Flex align="center" gap={16}>
        {path && <ChoppBackButton path={path} icon={icon} />}

        <Title level={3} className="!font-bold !m-0 w-full">
          {title}
        </Title>
      </Flex>

      {children}
    </Flex>
  );
};
