// AppRoutes.js
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { routerConfig } from './routes.config';
import RootBrandingSpinner from '@/components/common/RootBrandingSpinner';

const router = createBrowserRouter(routerConfig);

export default function AppRoutes() {
  return (
    // Suspense is required when using React.lazy
    <Suspense fallback={<RootBrandingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}