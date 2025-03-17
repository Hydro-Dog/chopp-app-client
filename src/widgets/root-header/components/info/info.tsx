import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClockCircleOutlined, ShopOutlined } from '@ant-design/icons';
import { THEME, useTheme } from '@shared/index';
import { RootState } from '@store/index';
import { Flex } from 'antd';
import { Typography } from 'antd';
import { Space } from 'antd/lib';
import LogoDark from '../../../../../assets/logo-dark.png';
import LogoLight from '../../../../../assets/logo-light.png';

const { Text } = Typography;

export const Info = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { clientAppConfig } = useSelector((state: RootState) => state.clientAppConfig);

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
          {clientAppConfig?.location && (
            <Flex gap={5}>
              <ShopOutlined size={10} />
              <Text strong>[location]</Text>
            </Flex>
          )}
          {clientAppConfig?.openTime && clientAppConfig?.closeTime && (
            <Flex gap={5}>
              <ClockCircleOutlined />
              <Text>
                {clientAppConfig?.openTime} - {clientAppConfig?.closeTime}
              </Text>
            </Flex>
          )}
        </Flex>
      </Space>
    </div>
  );
};
