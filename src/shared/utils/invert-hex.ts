/** Возвращает инверсию HEX-цвета вида #RRGGBB или #RGB */
export function invertHex(hex: string): string {
  // убираем «#» и разворачиваем короткую форму #RGB → #RRGGBB
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map((c) => c + c).join('');
  }

  // r, g, b → 0‒255 и инвертируем
  const num = parseInt(color, 16);
  const r = 255 - ((num >> 16) & 255);
  const g = 255 - ((num >> 8) & 255);
  const b = 255 - (num & 255);

  // обратно в #RRGGBB
  const inverted =
    '#' +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('');

  return inverted;
}