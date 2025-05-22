/*  CreateOrderBlock.tsx  */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginGuard } from '@shared/hooks';
import { ChoppShadowCard } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Button, Typography, Tooltip, Alert } from 'antd';

import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(tz);

const { Title } = Typography;

/** Фикс-зона магазина: берём из env или по умолчанию Europe/Moscow */
const SHOP_TZ = import.meta.env.VITE_SHOP_TZ || 'Europe/Moscow';

/** Проверяем, открыто ли сейчас (учитывая «через полночь») */
const isShopOpen = (openTime?: string, closeTime?: string) => {
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

export const CreateOrderBlock = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((s: RootState) => s.shoppingCart);
  const { clientAppConfig } = useSelector((s: RootState) => s.clientAppConfig);

  const { loginGuard } = useLoginGuard();
  const navigate = useNavigate();
  const navigateSecure = (path: string) => loginGuard(() => navigate(path));

  /* ---------- рабочие часы ---------- */
  const { openTime, closeTime } = clientAppConfig || {};
  const shopIsOpen = isShopOpen(openTime, closeTime);

  const btnDisabled = shoppingCart.items.length === 0 || !shopIsOpen;

  return (
    <ChoppShadowCard className="md:w-1/4">
      <Flex vertical gap={24}>
        {/* Итоговая сумма */}
        <Flex justify="space-between" align="center">
          <Title level={5} type="secondary" className="!m-0">
            {t('FINAL_AMOUNT')}
          </Title>
          <Title level={5} className="!m-0 !font-extrabold">
            {shoppingCart.totalPrice}₽
          </Title>
        </Flex>

        {/* Кнопка оформления заказа */}

        <Button
          type="primary"
          size="large"
          disabled={btnDisabled}
          onClick={() => navigateSecure('/cart/createOrder')}>
          {t('MAKE_ORDER')}
        </Button>
        <Alert
          message={
            !shopIsOpen
              ? t('SHOP_CLOSED_TOOLTIP', {
                  open: openTime,
                  close: closeTime,
                }) + ` (${SHOP_TZ})`
              : ''
          }
          type="info"
        />
      </Flex>
    </ChoppShadowCard>
  );
};
