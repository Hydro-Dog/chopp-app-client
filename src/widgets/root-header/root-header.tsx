import { useThemeToken } from '@shared/index';
import { Layout } from 'antd';
import { Info } from './components/info';
import { Navigation } from './components/navigation';

const { Header } = Layout;

export const RootHeader = () => {
  const themeToken = useThemeToken();

  return (
    <Header
      className="h-16 px-3 flex justify-between items-center"
      style={{
        background: themeToken.colorBgBase,
        borderBottom: `1px solid ${themeToken.colorBorder}`,
      }}>
      <Info />
      <Navigation />
    </Header>
  );
};
