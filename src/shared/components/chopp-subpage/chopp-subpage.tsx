import { PropsWithChildren, ReactNode } from 'react';
import { Flex, Typography } from 'antd';
import { ChoppBackButton } from '../chopp-back-button';

const { Title } = Typography;

type Props = {
  title: ReactNode;
  path?: string;
};

export const ChoppSubPage = ({ title, children, path }: PropsWithChildren<Props>) => {
  return (
    <Flex gap={18} vertical className="pb-5">
      <Flex gap={16}>
        {path && <ChoppBackButton path={path} />}

        <Title level={3} className="!font-bold !m-0">
          {title}
        </Title>
      </Flex>

      {children}
    </Flex>
  );
};
