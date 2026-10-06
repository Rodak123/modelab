import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import NoMatchPage from '../pages/NoMatchPage';
import { ROOT_ROUTES } from '../../global/routes';
import About from '../pages/About';
import Browser from '../pages/Browser';
import LandingPage from '../pages/LandingPage';
import ModelDetail from '../pages/ModelDetail';
import { AdminRoutes } from './AdminRoutes';

/**
- There should be no active HTML in this component, only wrapping of providers, routers etc.
 */
const Router: React.FC = () => {
  return (
    <Routes>
      <Route path={ROOT_ROUTES.LandingPage()} element={<LandingPage />} />
      <Route path={ROOT_ROUTES.Browser()} element={<Browser />} />
      <Route path={ROOT_ROUTES.About()} element={<About />} />
      <Route path={ROOT_ROUTES.ModelDetail()} element={<ModelDetail />} />
      {...AdminRoutes()}
      <Route path="*" element={<NoMatchPage />} />
    </Routes>
  );
};

export default Router;
