import React from 'react';
import { Link } from 'react-router-dom';
import type { AppRouteObject } from '@/routes';

// 定义菜单项类型
type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: React.ReactNode;
  children?: MenuItem[];
};

// 递归转换 routes → Menu items
export const buildMenuItems = (routes: AppRouteObject[]): MenuItem[] =>
  routes
    .filter((r) => !r.hideInMenu)
    .map((route) => ({
      key: route.key,
      icon: route.icon,
      label: route.path ? (
        <Link to={route.path}>{route.label}</Link>
      ) : (
        route.label
      ),
      children: route.children ? buildMenuItems(route.children) : undefined,
    }));