import { useRef } from 'react';
import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import { useThemeToken } from '@shared/hooks';
import styles from './chopp-explosion-button.module.css';
import { invertHex } from '@shared/utils';

export interface ChoppExplosionButtonProps extends ButtonProps {
  /** если `true` — фон кнопки будет градиентным, иначе сплошным */
  gradient?: boolean;
}

export const ChoppExplosionButton = ({
  type = 'primary',
  gradient = false,
  className,
  ...rest
}: ChoppExplosionButtonProps) => {
  const token  = useThemeToken();
  const btnRef = useRef<HTMLButtonElement>(null);

  /** ⏩ пропустить ближайший hover-out, если только что был click-explosion */
  const skipHoverOut = useRef(false);

  /** helper: перезапуск нужной анимации */
  const play = (cls: string) => {
    const el = btnRef.current;
    if (!el) return;

    el.classList.remove(styles.hoverIn, styles.hoverOut, styles.explode);
    void el.offsetWidth;          // ⚡️ reflow
    el.classList.add(cls);
  };

  /* ─── handlers ─── */
  const handleMouseEnter = () => play(styles.hoverIn);
  const handleMouseLeave = () => {
    if (skipHoverOut.current) {
      skipHoverOut.current = false;
      return;
    }
    play(styles.hoverOut);
  };
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    play(styles.explode);
    skipHoverOut.current = true;
    rest.onClick?.(e);
  };

  /* ─── вычисляем фон ─── */
  const getBackground = () => {
    if (type === 'primary') {
      return gradient
        ? `linear-gradient(135deg, ${token.colorPrimary} 0%, ${invertHex(token.colorPrimary)} 100%)`
        : token.colorPrimary;
    }
    if (type === 'default') {
      return gradient
        ? `linear-gradient(135deg, ${token.colorBgContainer} 0%, ${token.colorFillContent} 100%)`
        : token.colorBgContainer;
    }
    return undefined; // остальные типы (ghost / dashed / text) не трогаем
  };

  /* ─── render ─── */
  return (
    <Button
      {...rest}
      ref={btnRef}
      type={type}
      className={classNames(styles.button, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        ...rest.style,
        border: 0,
        background: getBackground(),
        color: type === 'default' ? token.colorText : undefined,
      }}
    />
  );
};
