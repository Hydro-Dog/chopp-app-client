import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginGuard, useSuperDispatch } from '@shared/hooks';
import { ChoppSubPage } from '@shared/index';
import { Order } from '@shared/types';
import { formatPhoneNumber } from '@shared/utils';
import { createOrder } from '@store/slices';
import { CreateOrderDTO } from '@store/slices/orders-slice/types';
import { resetShoppingCart } from '@store/slices/shopping-cart-slice';
import { RootState } from '@store/store';
import { Flex, Form, message } from 'antd';
import { z } from 'zod';
import { OrderButtonBlock, CreateOrderForm } from './components';
import { useCreateOrderFormSchema } from './hooks';

export const CreateOrder = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const { superDispatch } = useSuperDispatch<Order, unknown>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginGuard } = useLoginGuard();
  const [messageApi, contextHolder] = message.useMessage();

  const createOrderFormSchema = useCreateOrderFormSchema();
  type CreateOrderFormType = z.infer<typeof createOrderFormSchema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateOrderFormType>({
    resolver: zodResolver(createOrderFormSchema),
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

  const onSubmit: SubmitHandler<CreateOrderFormType> = (data) => {
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
          loginGuard(() => navigate('/order'));
        } catch (err) {
          console.error('Ошибка открытия ссылки:', err);
        }
      },
      catchHandler: (err) => {
        messageApi.open({
          type: 'error',
          content: err.message,
        });
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
    <>
      {contextHolder}
      <ChoppSubPage title={t('CREATE_ORDER_TITLE')} path="/cart">
        <Form onFinish={handleSubmit(onSubmit)}>
          <Flex gap={32} className="flex-col-reverse  md:flex-row">
            <CreateOrderForm errors={errors} control={control} />
            <OrderButtonBlock />
          </Flex>
        </Form>
      </ChoppSubPage>
    </>
  );
};
