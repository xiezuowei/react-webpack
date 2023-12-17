import React, { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '@/routes/types';
import routes from '@/routes';

/**
 * 生成路由
 * @param routes
 */
function renderRoutes(routes: AppRoute[]) {
    if (!routes || routes.length === 0) {
        return [];
    }

    return routes.map((route, index) => {
        if (route.redirect) {
            return <Route key={index} path={route.path} element={<Navigate to={route.redirect} replace />}/>;
        }

        const Component = route.element;
        if (route.children && route.children.length > 0) {
            return (
                <Route key={index} path={route.path} element={Component ? <Component/> : null}>
                    {renderRoutes(route.children)}
                </Route>
            );
        }

        if (Component) {
            return <Route key={route.path} path={route.path} element={<Component/>}/>;
        }

        return null;
    });
}

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {renderRoutes(routes)}
        </Routes>
    )
}

export default memo(AppRouter);