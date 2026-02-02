import { lazy } from 'react';

// Layouts - Usually kept as standard imports if they are small, 
// but can be lazy loaded too if they contain heavy components.
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ErrorPage from '@/pages/ErrorPage';
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from './PublicRoute';

// Lazy load all Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginWithMicrosoftPage = lazy(() => import('@/pages/LoginWithMicrosoftPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));

export const authRouteRoot = 'auth';
export const loginPath = 'login';
export const routerConfig = [
  {
    element: <PublicRoute />,
    children: [
      {
        path: `/${authRouteRoot}`,
        element: <AuthLayout />,
        errorElement: <ErrorPage />,
        children: [
          { path: loginPath, element: <LoginWithMicrosoftPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
        ],
      },
    ]
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            handle: { title: 'Dashboard' },
          },
        ],
      },
    ],
  },
];
