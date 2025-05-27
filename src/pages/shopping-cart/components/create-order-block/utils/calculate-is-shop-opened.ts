import { SHOP_TZ } from '@shared/index';
import dayjs from 'dayjs';

/** Проверяем, открыто ли сейчас (учитывая «через полночь») */
export const calculateIsShopOpened = (openTime?: string, closeTime?: string) => {
  if (!openTime || !closeTime) return true; // если часы ещё не пришли — считаем «открыто»

  const now = dayjs().tz(SHOP_TZ);
  const open = dayjs.tz(openTime, 'HH:mm', SHOP_TZ);
  const close = dayjs.tz(closeTime, 'HH:mm', SHOP_TZ);

  // Интервал через полночь: 22:00 – 06:00
  if (close.isBefore(open)) {
    return now.isAfter(open) || now.isBefore(close);
  }
  return now.isAfter(open) && now.isBefore(close);
};
