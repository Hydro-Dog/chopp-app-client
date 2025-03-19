import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSuperDispatch } from '@shared/hooks';
import { Order } from '@shared/types';
import { formatPhoneNumber } from '@shared/utils';
import { createOrder } from '@store/slices';
import { CreateOrderDTO } from '@store/slices/orders-slice/types';
import { resetShoppingCart } from '@store/slices/shopping-cart-slice';
import { RootState } from '@store/store';
import { Flex, Form, Typography } from 'antd';
import { z } from 'zod';
import { MakePaymentBlock, OrderAdditionalInfoForm } from './components';
import { useOrderAdditionalInfoFormSchema } from './hooks';
const { Title } = Typography;

export const OrderAdditionalInfo = () => {
  const orderAdditionalInfoFormSchema = useOrderAdditionalInfoFormSchema();
  type OrderAdditionalInfoFormType = z.infer<typeof orderAdditionalInfoFormSchema>;
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<Order, unknown>();
  const dispatch = useDispatch();
  const [bannerMessage, setBannerMessage] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderAdditionalInfoFormType>({
    resolver: zodResolver(orderAdditionalInfoFormSchema),
    defaultValues: {
      name: '',
      street: '',
      house: '',
      apartment: '',
      entrance: '',
      floor: '',
      comment: '',
      phoneNumber: '',
    },
  });

  const onSubmit: SubmitHandler<OrderAdditionalInfoFormType> = (data) => {
    const address =
      'Улица: ' +
      data.street +
      '; Дом: ' +
      data.house +
      '; Квартира: ' +
      data.apartment +
      '; Подъезд: ' +
      data.entrance +
      '; Этаж: ' +
      data.floor;
    superDispatch({
      action: createOrder({
        comment: data?.comment,
        address,
        name: data.name,
        phoneNumber: data.phoneNumber,
      } as CreateOrderDTO),
      thenHandler: (order) => {
        dispatch(resetShoppingCart());
        try {
          if (!order.paymentUrl) throw new Error('URL не передан');
          window.open(order.paymentUrl, '_blank');
          navigate('/order');
        } catch (err) {
          console.error('Ошибка открытия ссылки:', err);
        }
      },
      catchHandler: (err) => {
        setBannerMessage(err.message);
      },
    });
  };
  useEffect(() => {
    if (currentUser?.phoneNumber) {
      reset({
        phoneNumber: formatPhoneNumber(currentUser?.phoneNumber),
      });
    }
  }, [currentUser, reset]);

  return (
    <Flex gap={18} vertical>
      <Title level={3} className="!font-bold !m-0">
        {t('REGISTRATION_ORDER')}
      </Title>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Flex gap={32} className="flex-col-reverse  md:flex-row">
          <OrderAdditionalInfoForm errors={errors} control={control} />
          <MakePaymentBlock error={bannerMessage} />
        </Flex>
      </Form>
    </Flex>
  );
};
