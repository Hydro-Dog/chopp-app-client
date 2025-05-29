import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginGuard } from '@shared/hooks';
import { ChoppShadowCard, SHOP_TZ } from '@shared/index';
import { RootState } from '@store/store';
import { OrderSummaryBlock } from '@widgets/index';
import { Flex, Button, Alert } from 'antd';
import { calculateIsShopOpened } from './utils';

export const CreateOrderBlock = () => {
  const { t } = useTranslation();
  const { shoppingCart } = useSelector((s: RootState) => s.shoppingCart);
  const { clientAppConfig } = useSelector((s: RootState) => s.clientAppConfig);

  const { loginGuard } = useLoginGuard();
  const navigate = useNavigate();
  const navigateSecure = (path: string) => loginGuard(() => navigate(path));

  /* ---------- рабочие часы ---------- */
  const { openTime, closeTime } = clientAppConfig || {};
  const shopIsOpen = calculateIsShopOpened(openTime, closeTime);
  const btnDisabled = shoppingCart.items.length === 0 || !shopIsOpen;

  return (
    <ChoppShadowCard className="md:w-1/4">
      <Flex vertical gap={24}>
        <OrderSummaryBlock />

        {/* Кнопка оформления заказа */}
        <Button
          type="primary"
          size="large"
          disabled={btnDisabled}
          onClick={() => navigateSecure('/cart/createOrder')}>
          {t('MAKE_ORDER')}
        </Button>

        {/* Сообщение про график работы */}
        {openTime && closeTime && (
          <Alert
            message={
              t('SHOP_CLOSED_TOOLTIP', {
                open: openTime,
                close: closeTime,
              }) + ` (${SHOP_TZ})`
            }
            type="info"
          />
        )}
      </Flex>
    </ChoppShadowCard>
  );
};
