import { RouteObject } from 'react-router';
import { ReactNode } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export type RouteMeta = {
    // 是否隐藏菜单
    hideMenu?: boolean;
    // 隐藏所有子菜单
    hideChildrenInMenu?: boolean;
    // icon菜单图标
    icon?: ReactNode;
    // 标题
    title: string;
};

export type AppRoute = {
    path: string;
    element?: React.FC<BrowserRouterProps> | (() => any);
    redirect?: string;
    meta?: RouteMeta;
    children?: AppRoute[];
}

export type MenuItem = {
    icon?: ReactNode | null;
    children?: MenuItem[];
    label: string;
    key: string;
}
