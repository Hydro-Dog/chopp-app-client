import { PropsWithChildren } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Drawer, Button, Typography, Flex } from 'antd';
import { useThemeToken } from '@shared/hooks';

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
      // width={500}
      height={window.innerHeight * 0.9}
      onClose={onClose}
      open={open}
      className="chopp-drawer-bottom"
      headerStyle={{ height: 0, padding: 0 }}
      closeIcon={<></>}>
      <Flex vertical>
        <Button
          onClick={onClose}
          type="text"
          size="large"
          icon={<CloseOutlined style={{ color: themeToken.colorBgBase }} />}
          className="absolute right-5 -top-12"
        />
        {title && <Title>{title}</Title>}
        {children}
      </Flex>
    </Drawer>
  );
};
