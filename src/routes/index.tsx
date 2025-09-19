import {
  BarChartOutlined,
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import AppLayout from "@/components/Layout";

// 页面组件
const Home = lazy(() => import("@/pages/Home"));
const Analytics = lazy(() => import("@/pages/Dashboard/Analytics"));
const Settings = lazy(() => import("@/pages/Dashboard/Settings"));

// 自定义 route 配置，扩展 meta 用于菜单
export type AppRouteObject = RouteObject & {
  key: string;
  icon?: React.ReactNode;
  label?: string;
  hideInMenu?: boolean;
  children?: AppRouteObject[];
};

export const routes: AppRouteObject[] = [
  {
    key: "root",
    path: "/",
    element: <AppLayout />,
    children: [
      {
        key: "home",
        path: "/",
        element: <Home />,
        icon: <HomeOutlined />,
        label: "首页",
      },
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: "仪表盘",
        children: [
          {
            key: "analytics",
            path: "/dashboard/analytics",
            element: <Analytics />,
            icon: <BarChartOutlined />,
            label: "数据分析",
          },
          {
            key: "settings",
            path: "/dashboard/settings",
            element: <Settings />,
            icon: <SettingOutlined />,
            label: "系统设置",
          },
        ],
      },
    ],
  },
];
