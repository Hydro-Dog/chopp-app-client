/* chopp-gradient-button.tsx */
import { useRef } from 'react';
import { Button, type ButtonProps } from 'antd';
import classNames from 'classnames';
import { useThemeToken } from '@shared/hooks';
import styles from './chopp-gradient-button.module.css';
import { invertHex } from '@shared/utils';

/** Дополнение к стандартным пропсам Ant Design-кнопки */
interface ChoppGradientButtonProps extends ButtonProps {
  /** использовать градиент вместо обычного цвета (по умолчанию — да) */
  gradient?: boolean;
}

export const ChoppGradientButton = ({
  type = 'primary',
  gradient,
  className,
  ...rest
}: ChoppGradientButtonProps) => {
  const token  = useThemeToken();
  const btnRef = useRef<HTMLButtonElement>(null);

  /* ——— служебные вещи (не менялись) ——— */
  const skipHoverOut = useRef(false);
  const play = (cls: string) => {
    const el = btnRef.current;
    if (!el) return;
    el.classList.remove(styles.hoverIn, styles.hoverOut, styles.glow);
    void el.offsetWidth;             /* reflow – «обнулить» анимацию */
    el.classList.add(cls);
  };

  /* ——— handlers (как было) ——— */
  const handleMouseEnter = () => play(styles.hoverIn);
  const handleMouseLeave = () => {
    if (skipHoverOut.current) { skipHoverOut.current = false; return; }
    play(styles.hoverOut);
  };
  const handleClick: React.MouseEventHandler<HTMLElement> = (e) => {
    play(styles.glow);
    skipHoverOut.current = true;
    rest.onClick?.(e);
  };

  /* ——— вычисляем фон ——— */
  const background =
    type === 'primary' && gradient
      ? `linear-gradient(135deg, ${token.colorPrimary} 0%, ${invertHex(token.colorPrimary)} 100%)`
      : undefined;      /* если gradient=false — фон оставляем как есть */

  /* ——— render ——— */
  return (
    <Button
      {...rest}
      ref={btnRef}
      type={type}
      className={classNames(styles.button, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ ...rest.style, border: 0, background }}
    />
  );
};
