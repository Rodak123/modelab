import * as React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import NoMatchPage from '../pages/NoMatchPage';
import { ADMIN_ROUTES, ROOT_ROUTES } from '../../global/routes';
import Login from '../pages/admin/Login';
import AdminPanel from '../pages/admin/AdminPanel';
import { CLEARANCE } from '../../store/types';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

/**
 * There should be no active HTML in this component, only wrapping of providers, routers etc.
 */
const AdminRouter: React.FC = () => {
  return (
    <Routes>
      <Route path={ADMIN_ROUTES.Login} element={<Login />} />

      <Route element={<AdminMiddleware />}>
        <Route
          path="/"
          element={<Navigate to={ROOT_ROUTES.AdminRoot + ADMIN_ROUTES.Panel} replace />}
        />
        <Route path={ADMIN_ROUTES.Panel} element={<AdminPanel />} />
      </Route>

      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  );
};

const AdminMiddleware: React.FC = () => {
  const User = useSelector((state: RootState) => state.User);

  if (!User.auth.isInitialized) {
    return; // wait
  }

  if (!User.auth.isAuthenticated) {
    return <Navigate to={ROOT_ROUTES.AdminRoot + ADMIN_ROUTES.Login} replace />;
  }

  if (User.auth.clearance < CLEARANCE.ADMIN) {
    return <Navigate to={ROOT_ROUTES.LandingPage} replace />;
  }

  return <Outlet />;
};

export default AdminRouter;
