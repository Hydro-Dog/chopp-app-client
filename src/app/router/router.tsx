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
import { OrderAdditionalInfo } from '@pages/shopping-cart/pages/order-additional-info';
import { MainMenu, ROUTES } from '@shared/index';
import { BackLayout } from '@widgets/index';
import { RootContainer } from '@widgets/root-container/root-container';
import { RootProvider } from '@widgets/root-container/root-provider';
import { GuardedRoute } from './utils/guarded-route';
import { InterceptorsWrapper } from './wrappers/interceptors-wrapper';
import { CurrentOrder } from '@pages/orders/components/current-order';

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
        element: (
          <BackLayout>
            <UserPage />
          </BackLayout>
        ),
      },
      {
        path: 'cart',
        element: (
          // <BackLayout>
          <Outlet />
          // </BackLayout>
        ),
        children: [
          {
            path: '',
            element: <ShoppingCartPage />,
          },
          {
            path: 'createOrder',
            element: <OrderAdditionalInfo />,
          },
        ],
      },
      {
        path: 'order',
        element: <OrdersPage />,
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
