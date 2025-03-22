import { useThemeToken } from '@shared/index';
import { Layout } from 'antd';
import { Info } from './components/info';
import { Navigation } from './components/navigation';

const { Header } = Layout;

type Props = { className?: string };

export const RootHeader = ({ className }: Props) => {
  const themeToken = useThemeToken();

  return (
    <Header
      className={`flex items-center px-4 ${className}`}
      style={{
        background: themeToken.colorBgBase,
        borderBottom: `1px solid ${themeToken.colorBorder}`,
      }}>
      <Info />
      <Navigation />
    </Header>
  );
};
