import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

import { ProductsProvider } from '@pages/products/context';
import { ChoppSubPage, ROUTES } from '@shared/index';
import { RootContainer } from '@widgets/root-container/root-container';
import { RootProvider } from '@widgets/root-container/root-provider';
import { GuardedRoute } from './utils/guarded-route';
import { InterceptorsWrapper } from './wrappers/interceptors-wrapper';

/* ---------- ленивые импорты ---------- */
const ProductsPage = lazy(() => import('@pages/products/products-page'));
const UserPage = lazy(() => import('@pages/user/user-page'));
const ShoppingCartPage = lazy(() => import('@pages/shopping-cart/shopping-cart-page'));
const CreateOrder = lazy(() => import('@pages/create-order/create-order'));
const OrdersPage = lazy(() => import('@pages/orders/orders-page'));
const DeliveryPage = lazy(() => import('@pages/delivery/delivery'));
const DescriptionPage = lazy(() => import('@pages/description/description'));
const PublicOfferPage = lazy(() => import('@pages/public-offer/public-offer'));

/* ---------- утилиты ---------- */
const suspense = (node: React.ReactNode) => <Suspense fallback={null}>{node}</Suspense>;
const guard = (node: React.ReactNode) => <GuardedRoute>{node}</GuardedRoute>;
const sub = (title: string, node: React.ReactNode) => (
  <ChoppSubPage path="/" icon={<HomeOutlined />} title={title}>
    {node}
  </ChoppSubPage>
);

/* ---------- layout корневого сегмента ---------- */
const RootLayout = () => (
  <>
    <InterceptorsWrapper />
    <RootProvider>
      <RootContainer />
      <Outlet />
    </RootProvider>
  </>
);

/* ---------- router ---------- */
export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT, // '/'
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: suspense(
          <ProductsProvider>
            <ProductsPage />
          </ProductsProvider>,
        ),
      },

      {
        path: ROUTES.USER, // 'users'
        element: guard(suspense(<UserPage />)),
      },

      {
        /* 'cart' пока нет в enum — оставляем строкой */
        path: ROUTES.CART,
        element: guard(<Outlet />),
        children: [
          { index: true, element: suspense(<ShoppingCartPage />) },
          { path: 'createOrder', element: suspense(<CreateOrder />) },
        ],
      },

      {
        path: ROUTES.ORDERS, // 'orders'
        element: guard(suspense(<OrdersPage />)),
      },

      { path: 'delivery', element: suspense(sub('Доставка и оплата', <DeliveryPage />)) },
      { path: 'description', element: suspense(sub('О нас', <DescriptionPage />)) },
      { path: 'publicOffer', element: suspense(sub('Публичная оферта', <PublicOfferPage />)) },
    ],
  },

  /* fallback */
  { path: '*', element: <Navigate to={ROUTES.ROOT} replace /> },
]);
