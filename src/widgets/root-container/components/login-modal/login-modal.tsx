import { useRef, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InputMask from 'react-input-mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperDispatch } from '@shared/hooks';
import { User } from '@shared/types';
import { Button, Flex, Form, Modal, Typography } from 'antd';
import { z } from 'zod';
import { SendCodeModal } from './components/send-code-modal/send-code-modal';
import { VIEW_MODE } from './enum/view-mode';
import { InputCodeModal } from './components/input-code-modal';

const { Item } = Form;

const { Text, Title, Link } = Typography;

type Props = {
  isOpen: boolean;
  close: () => void;
};

export const LoginModal = ({ isOpen, close }: Props) => {
  const [viewMode, setViewMode] = useState<VIEW_MODE>(VIEW_MODE.INITIAL);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { superDispatch } = useSuperDispatch<User, { phoneNumber: string }>();
  const { t } = useTranslation();

  const phoneSchema = z.object({
    phoneNumber: z
      .string()
      .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, `${t('FORM_ERRORS.INVALID_PHONE_NUMBER')}`),
  });

  type PhoneNumberFormType = z.infer<typeof phoneSchema>;

  const VIEW = {
    [VIEW_MODE.INITIAL]: (
      <SendCodeModal setViewMode={setViewMode} setPhoneNumber={setPhoneNumber} />
    ),
    [VIEW_MODE.TELEGRAM]: <InputCodeModal closeModal={close} phoneNumber={phoneNumber} />,
  };

  const { reset } = useForm<PhoneNumberFormType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: '' },
  });

  const handleClose = () => {
    reset();
    close();
    setViewMode(VIEW_MODE.INITIAL)
  };

  return (
    <Modal
      className="max-w-96"
      title={
        <Title className="!font-bold" level={4}>
          Вход
        </Title>
      }
      open={isOpen}
      onClose={handleClose}
      onCancel={handleClose}
      footer={false}>
      {VIEW[viewMode]}
    </Modal>
  );
};
