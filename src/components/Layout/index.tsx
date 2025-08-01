// src/components/Layout/index.tsx
import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, theme, Avatar, Dropdown, Space } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  HomeOutlined,
  DashboardOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import reactSvg from '@/assets/react.svg';

const { Header, Sider, Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 获取当前选中的菜单项
  const pathSnippets = location.pathname.split('/').filter((i) => i);
  const selectedKeys = pathSnippets.length ? [pathSnippets[0]] : ['home'];

  // 用户下拉菜单
  const userDropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

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
  return (
    <Layout className="min-h-screen">
      {/* 侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <div className='h-[64px] flex align-center justify-center p-[10px] overflow-hidden'>
          <img src={reactSvg} alt="Logo"  className='h-[34px] mr-[8px]'/>
          {!collapsed && <h1 className='text-white text-[18px] whitespace-nowrap m-0'>管理系统</h1>}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={['dashboard']}
          items={menuItems}
        />
      </Sider>

      {/* 主布局 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header style={{ background: colorBgContainer }} className='p-0'>
          <div className="flex justify-between align-center px-[16px] py-0">
            <Space>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'text-[18px] cursor-pointer transition-colors duration-300 hover:text-[#1890ff]',
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>当前页面</Breadcrumb.Item>
              </Breadcrumb>
            </Space>

            <Dropdown
              menu={{ items: userDropdownItems }}
              placement="bottomRight"
            >
              <div className="flex align-center cursor-pointer">
                <Avatar icon={<UserOutlined />} />
                {!collapsed && <span className="mr-[8px]">管理员</span>}
              </div>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区域 */}
        <Content className="m-[16px]">
          <div className="p-[16px] min-h-[calc(100vh-120px)] border-[4px]" style={{ background: colorBgContainer }}>
            {/* 这里渲染子路由 */}
            <Outlet />
          </div>
        </Content>

        {/* 页脚 */}
        <Footer className="text-center py-[16px] px-0">
          © {new Date().getFullYear()} 公司名称 - 所有权利保留
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
