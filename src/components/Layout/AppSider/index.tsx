import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import type { AppSiderProps } from '@/types';
import reactSvg from '@/assets/react.svg';

const { Sider } = Layout;

const AppSider: React.FC<AppSiderProps> = ({ collapsed, onCollapse }) => {
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '2',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '3',
      icon: <InfoCircleOutlined />,
      label: <Link to="/about">About</Link>,
    },
  ];

  return (
    <Sider
      width={200}
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={() => onCollapse(!collapsed)}
      breakpoint="lg"
      collapsedWidth={80}
      trigger={null}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <div className="h-[64px] flex items-center ml-[25px]">
        <img
          src={reactSvg}
          alt="Logo"
          className="h-[34px] mr-[8px] w-[34px]" // 关键修改
        />
        {!collapsed && (
          <span className="block text-blue-400 text-[16px]">管理系统</span>
        )}
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        inlineCollapsed={collapsed}
        className='h-full border-r-0'
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSider;
