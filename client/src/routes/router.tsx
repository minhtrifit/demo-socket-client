import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTE } from './route.constant';

import Layout from '@/components/global/layout/Layout';
import DashboardLayout from '@/components/global/layout/DashboardLayout';

import { HomePage } from '@/pages/home/HomePage';
import { NotFoundPage } from '@/pages/not-found-page/NotFoundPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ProductPage from '@/pages/product/ProductPage';
import AddProductPage from '@/pages/add-product/AddProductPage';
import EditProductPage from '@/pages/edit-product/EditProductPage';

export const router = createBrowserRouter([
  {
    path: APP_ROUTE.HOME,
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
  {
    path: APP_ROUTE.DASHBOARD,
    element: <DashboardLayout />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
  {
    path: APP_ROUTE.MANAGMENT,
    element: <DashboardLayout />,
    children: [
      { path: APP_ROUTE.PRODUCTS, element: <ProductPage /> },
      { path: APP_ROUTE.ADD_PRODUCT, element: <AddProductPage /> },
      { path: APP_ROUTE.EDIT_PRODUCT, element: <EditProductPage /> },
      { path: APP_ROUTE.DETAIL_PRODUCT, element: <div>DetailProductPage</div> },
      { path: APP_ROUTE.CARTS, element: <div>CartsPage</div> },
    ],
  },
  {
    path: APP_ROUTE.ROLE,
    element: <DashboardLayout />,
    children: [
      { path: APP_ROUTE.CUSTOMERS, element: <div>CustomersPage</div> },
      { path: APP_ROUTE.STAFFS, element: <div>StaffsPage</div> },
    ],
  },
  {
    path: APP_ROUTE.SETTINGS,
    element: <DashboardLayout />,
    children: [{ index: true, element: <div>SettingsPage</div> }],
  },
  { path: '/*', element: <NotFoundPage /> },
]);
