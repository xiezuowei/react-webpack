import { lazy } from 'react';
import { AppRoute } from './types';

const routes: AppRoute[] = [
    {
        path: '/',
        element: lazy(() => import('@/pages/home'))
    }
];

const allRoutes = [...routes];

export default allRoutes;
