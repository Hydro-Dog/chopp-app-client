import React from 'react';
import { Button, Result } from 'antd';
import { MehOutlined, SmileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  isOpen: boolean;
};

export const DisabledAppScreen: React.FC<Props> = ({ isOpen }) => {
    const { t } = useTranslation();
  if (!isOpen) return null;


  return (
    <div
      className="
        fixed inset-0 z-[1200]
        bg-white/60 backdrop-blur
        flex items-center justify-center
        pointer-events-auto
      ">
      <div
        className="
          bg-white/95 rounded-2xl
          px-6 py-12
          text-xl font-medium text-gray-900 text-center
          shadow-2xl max-w-xs w-full
        ">
        <Result
        //   icon={<MehOutlined /> }
          title={t('APP_DISABLED_TITLE')}
          subTitle={t('APP_DISABLED_SUBTITLE')}
        />
      </div>
    </div>
  );
};
