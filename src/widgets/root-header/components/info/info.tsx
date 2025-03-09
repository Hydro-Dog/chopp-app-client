import { ClockCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { THEME, useTheme } from '@shared/index';
import { Flex } from 'antd';
import { Typography } from 'antd';
import { Space } from 'antd/lib';
import LogoDark from '../../../../../assets/logo-dark.png';
import LogoLight from '../../../../../assets/logo-light.png';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

export const Info = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center gap-5">
      <img
        onClick={() => navigate('/')}
        alt="logo"
        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        src={theme === THEME.DARK ? LogoDark : LogoLight}
      />

      <Space className="hidden sm:block">
        <Flex vertical>
          <Flex gap={5}>
            <ShopOutlined size={10} />
            <Text strong>[location]</Text>
          </Flex>
          <Flex gap={5}>
            <ClockCircleOutlined />
            <Text>[timeStart - timeEnd]</Text>
          </Flex>
        </Flex>
      </Space>
    </div>
  );
};
