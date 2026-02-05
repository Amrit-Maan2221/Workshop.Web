import { lazy } from 'react';

// Layouts - Usually kept as standard imports if they are small, 
// but can be lazy loaded too if they contain heavy components.
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ErrorPage from '@/pages/ErrorPage';
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from './PublicRoute';
import DummyDt from '@/dummy/DummyDt';
import CreateEstimateForm from '@/dummy/CreateEstimateForm';

// Lazy load all Pages
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const LoginWithMicrosoftPage = lazy(() => import('@/pages/LoginWithMicrosoftPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage'));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const EstimatePage = lazy(() => import("@/dummy/EstimatePage"));
const ServiceRequestPage = lazy(() => import("@/dummy/ServiceRequestPage"));
const Tickets = lazy(() => import("@/dummy/Tickets"));
const Workorders = lazy(() => import("@/dummy/Workorders"));
const VehicleInspection = lazy(() => import("@/dummy/VehicleInspection"));
const Invoices = lazy(() => import("@/dummy/Invoices"));

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
        handle: { title: 'Workshop' },
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
            handle: { title: 'Dashboard' },
          },
           {
            path: 'service-requests',
            element: <ServiceRequestPage />,
            handle: { title: 'Service Requests' },
          },
           {
            path: 'estimates',
            element: <EstimatePage />,
            handle: { title: 'Estimates' },
          },
           {
            path: 'tickets',
            element: <Tickets />,
            handle: { title: 'Tickets' },
          },
           {
            path: 'workorders',
            element: <Workorders />,
            handle: { title: 'Workorders' },
          },
           {
            path: 'vehicle-inspections',
            element: <VehicleInspection />,
            handle: { title: 'Vehicle Inspection' },
          },
           {
            path: 'invoices',
            element: <Invoices />,
            handle: { title: 'Invoices' },
          },
          {
            path: 'estimates',
            handle: { title: 'Estimates' },
            children: [
              {
                index: true,
                element: <EstimatePage />,
              },
              {
                path: 'create',
                element: <CreateEstimateForm />,
                handle: { title: 'Create New Estimate' },
              },
            ]
          },
          {
            path: '*',
            element: <DummyDt />,
            handle: { title: 'Dummy Data Table' },
          }
        ],
      },
    ],
  },
];
