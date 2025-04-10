import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import {
  AnalyticsPage,
  SignInPage,
  UsersPage,
  RegisterPage,
  ChatsPage,
  OrdersPage,
  UserPage,
  ProductsPage,
  SettingsPage,
  DeliveryPage,
  DescriptionPage,
  PublicOfferPage,
} from '@pages/index';

import { OrdersProvider } from '@pages/orders/context';
import { PaymentsPage } from '@pages/payments';
import { ProductsProvider } from '@pages/products/context';
import {
  PricingSettingsPage,
  VisualSettingsPage,
  PaymentSettingsPage,
} from '@pages/settings/pages';
import { ShoppingCartPage } from '@pages/shopping-cart';
import { CreateOrder } from '@pages/create-order';
import { ChoppBackButton, ChoppSubPage, MainMenu, ROUTES } from '@shared/index';
import { BackLayout } from '@widgets/index';
import { RootContainer } from '@widgets/root-container/root-container';
import { RootProvider } from '@widgets/root-container/root-provider';
import { GuardedRoute } from './utils/guarded-route';
import { InterceptorsWrapper } from './wrappers/interceptors-wrapper';
import { CurrentOrderCard } from '@pages/orders/components/current-order';
import { HomeOutlined } from '@ant-design/icons';

export const router = createBrowserRouter([
  // {
  //   path: ROUTES.SIGN_IN,
  //   element: <SignInPage />,
  // },
  // {
  //   path: ROUTES.REGISTER,
  //   element: <RegisterPage />,
  // },
  {
    path: ROUTES.ROOT,
    element: (
      // <GuardedRoute>
      <>
        <InterceptorsWrapper />
        <RootProvider>
          <RootContainer />
        </RootProvider>
      </>
      // <MainMenu />
      //  <Navigate to={ROUTES.ORDERS} replace />
      // </GuardedRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <ProductsProvider>
            <ProductsPage />
          </ProductsProvider>
        ),
      },
      {
        path: 'user',
        element: <UserPage />,
      },
      {
        path: 'cart',
        element: <Outlet />,
        children: [
          { index: true, element: <ShoppingCartPage /> },
          { path: 'createOrder', element: <CreateOrder /> },
        ],
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'delivery',
        element: (
          <ChoppSubPage path={'/'} icon={<HomeOutlined />} title="Доставка и оплата">
            <DeliveryPage />
          </ChoppSubPage>
        ),
      },
      {
        path: 'description',
        element: (
          <ChoppSubPage path={'/'} icon={<HomeOutlined />} title="О нас">
            <DescriptionPage />
          </ChoppSubPage>
        ),
      },
      {
        path: 'publicOffer',
        element: (
          <ChoppSubPage path={'/'} icon={<HomeOutlined />} title="Публичная оферта">
            <PublicOfferPage />
          </ChoppSubPage>
        ),
      },

      // {
      //   path: '',
      //   element: (
      //     <OrdersProvider>
      //       <OrdersPage />
      //     </OrdersProvider>
      //   ),
      // },
      // {
      //   path: ROUTES.PRODUCTS,
      //   element: (
      //     <ProductsProvider>
      //       <ProductsPage />
      //     </ProductsProvider>
      //   ),
      // },
      // {
      //   path: ROUTES.CHATS,
      //   element: <ChatsPage />,
      // },
      {
        path: ROUTES.SETTINGS,
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <SettingsPage />,
          },
          {
            path: ROUTES.VISUAL_SETTINGS,
            element: <VisualSettingsPage />,
          },
          // {
          //   path: ROUTES.PRICING_SETTINGS,
          //   element: <PricingSettingsPage />,
          // },
          // {
          //   path: ROUTES.PAYMENT_SETTINGS,
          //   element: <PaymentSettingsPage />,
          // },
        ],
      },
      // {
      //   path: ROUTES.PAYMENTS,
      //   element: <PaymentsPage />,
      // },
      // {
      //   path: ROUTES.ANALYTICS,
      //   element: <AnalyticsPage />,
      // },
      // {
      //   path: `${ROUTES.USERS}/:id`, // Updated path for user profiles
      //   element: <UserPage />,
      // },
    ],
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.ORDERS} replace />,
  },
]);
