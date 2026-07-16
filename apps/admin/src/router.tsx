import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminLayout } from '@/layouts/AdminLayout';
import { AssetStatsPage } from '@/pages/AssetStats';
import { AttractionsPage } from '@/pages/Attractions';
import { ContentPage } from '@/pages/Content';
import { DashboardPage } from '@/pages/Dashboard';
import { DevicesPage } from '@/pages/Devices';
import { FinancePage } from '@/pages/Finance';
import { LoginPage } from '@/pages/Login';
import { OrdersPage } from '@/pages/Orders';
import { ProjectDetailPage } from '@/pages/ProjectDetail';
import { ProjectOperationsPage } from '@/pages/ProjectOperations';
import { SettingsPage } from '@/pages/Settings';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'attractions', element: <AttractionsPage /> },
      { path: 'attractions/:projectId', element: <ProjectDetailPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'devices', element: <DevicesPage /> },
      { path: 'content', element: <ContentPage /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'project-operations', element: <ProjectOperationsPage /> },
      { path: 'asset-stats', element: <AssetStatsPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);
