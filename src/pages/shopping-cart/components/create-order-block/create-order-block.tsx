/*  CreateOrderBlock.tsx  */
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginGuard } from '@shared/hooks';
import { ChoppShadowCard, SHOP_TZ } from '@shared/index';
import { RootState } from '@store/store';
import { Flex, Button, Typography, Alert } from 'antd';
import { calculateIsShopOpened } from './utils';

const { Title } = Typography;

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
