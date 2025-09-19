import React from 'react';
import { Layout, Menu, Spin, Alert } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChartOutlined,
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
} from '@ant-design/icons';

interface SidebarProps {
  collapsed: boolean;
  onBreakpoint?: (broken: boolean) => void;
  logo?: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
}

const { Sider } = Layout;
// 侧边栏菜单项
const menuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: <Link to="/">首页</Link>,
  },
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: <Link to="/dashboard">仪表盘</Link>,
    children: [
      {
        key: 'analytics',
        icon: <BarChartOutlined />,
        label: <Link to="/dashboard/analytics">数据分析</Link>,
      },
      {
        key: 'settings',
        icon: <SettingOutlined />,
        label: <Link to="/dashboard/settings">系统设置</Link>,
      },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onBreakpoint,
  logo,
  loading = false,
  error = null,
}) => {
  const location = useLocation();
  // 获取当前选中的菜单项
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const selectedKeys = pathSnippets.length ? [pathSnippets[0]] : ['home'];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      breakpoint="lg"
      onBreakpoint={onBreakpoint}
    >
      {logo}
      {loading ? (
        <div style={{ padding: 16, textAlign: 'center' }}>
          <Spin />
        </div>
      ) : error ? (
        <Alert message="菜单加载失败" type="error" />
      ) : (
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
