import { lazy } from 'react';

// Layouts - Usually kept as standard imports if they are small, 
// but can be lazy loaded too if they contain heavy components.
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ErrorPage from '@/pages/ErrorPage';

// Lazy load all Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));

export const routerConfig = [
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        path: "login", 
        element: <LoginPage /> 
      },
      { 
        path: "forgot-password", 
        element: <ForgotPasswordPage /> 
      }
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        element: <DashboardPage />,
        handle: { title: 'Dashboard' } 
      },
    ],
  },
];