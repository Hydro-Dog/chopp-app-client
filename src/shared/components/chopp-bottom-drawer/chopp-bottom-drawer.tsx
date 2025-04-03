import { PropsWithChildren } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { useThemeToken } from '@shared/hooks';
import { Drawer, Button, Typography, Flex } from 'antd';

const { Title } = Typography;

type Props = {
  open: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  title?: string;
};

export const ChoppBottomDrawer = ({
  open,
  onClose,
  placement,
  children,
  title,
}: PropsWithChildren<Props>) => {
  const themeToken = useThemeToken();
  return (
    <Drawer
      placement="bottom"
      height={'auto'}
      onClose={onClose}
      open={open}
      title={<Title className="!m-0 !text-2xl md:!text-4xl">{title}</Title>}
      className="chopp-drawer-bottom max-h-[90vh] overflow-y-scroll"
      closeIcon={null}>
      <Flex vertical>
        <Button
          onClick={onClose}
          type="text"
          size="large"
          icon={<CloseOutlined style={{ color: themeToken.colorBgBase }} />}
          className="absolute right-5 -top-12"
        />
        {children}
      </Flex>
    </Drawer>
  );
};
