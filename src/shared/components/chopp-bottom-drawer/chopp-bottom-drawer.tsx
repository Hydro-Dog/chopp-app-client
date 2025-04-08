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
      className="chopp-drawer-bottom max-h-auto overflow-y-scroll"
      closeIcon={null}>
      <Flex vertical>
        <Button
          onClick={onClose}
          type="text"
          size="large"
          icon={<CloseOutlined style={{ color: themeToken.colorBgBase }} />}
          className="absolute right-5 -top-12"
        />
        {title && <Title className='!text-xl sm:!text-3xl'>{title}</Title>}
        {children}
      </Flex>
    </Drawer>
  );
};
