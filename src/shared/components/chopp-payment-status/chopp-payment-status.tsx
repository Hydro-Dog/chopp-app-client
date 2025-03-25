import { useTranslation } from 'react-i18next';
import { PAYMENT_STATUS, PAYMENT_STATUS_MAP } from '@shared/index';
import { Tag, Tooltip } from 'antd';

type Props = {
  status: PAYMENT_STATUS;
};

export const ChoppPaymentStatus = ({ status }: Props) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t(PAYMENT_STATUS_MAP[status]?.tooltip)}>
      <Tag className="border-none cursor-pointer" color={PAYMENT_STATUS_MAP[status]?.color}>
        {t(PAYMENT_STATUS_MAP[status]?.title)}
      </Tag>
    </Tooltip>
  );
};
