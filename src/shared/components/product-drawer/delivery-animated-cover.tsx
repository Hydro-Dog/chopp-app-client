import { TruckOutlined } from '@ant-design/icons';
import { Flex } from 'antd';
import { useThemeToken } from '@shared/hooks';
import styles from './delivery-animated-cover.module.css';

type Props = {
  isOpened: boolean;
  onClose: () => void;
};

export const DeliveryAnimatedCover = ({ isOpened, onClose }: Props) => {
  const themeToken = useThemeToken();

  return (
    <Flex className={styles.wrapper} style={{ background: themeToken.colorPrimaryBg }}>
      <div
        className={styles.truckIcon}
        style={{
          color: themeToken.colorPrimary,
          fontSize: '4rem',
        }}>
        <TruckOutlined style={{ fontSize: '6rem', color: themeToken.colorPrimary }} />
      </div>

      {/* Двигающиеся штрихи "дороги" */}
      <div
        className={styles.roadLine}
        style={{
          background: themeToken.colorPrimary,
        }}></div>
      <div
        className={styles.roadLine}
        style={{
          background: themeToken.colorPrimary,
        }}></div>
      {/* <div className={styles.roadLine}></div> */}
      <div
        className={styles.roadLine}
        style={{
          background: themeToken.colorPrimary,
        }}></div>
    </Flex>
  );
};
