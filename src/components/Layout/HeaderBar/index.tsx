import React from 'react';
import { Layout, Breadcrumb, Avatar, Dropdown, Space } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { routes } from '@/routes';
import { findRoutePath } from '@/utils/routerHelper';

interface HeaderBarProps {
  collapsed: boolean;
  onToggle: () => void;
  colorBgContainer: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  collapsed,
  onToggle,
  colorBgContainer,
}) => {
  const location = useLocation();

  // 用户下拉菜单
  const userDropdownItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: '个人中心' },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录' },
  ];

  // 自动生成面包屑
  const { breadcrumb } = findRoutePath(
    routes[0].children || [],
    location.pathname
  );

  return (
    <Layout.Header
      style={{ background: colorBgContainer }}
      className="bg-white p-0 flex items-center"
    >
      <div className="flex justify-between align-center px-[16px] py-0 w-full">
        <Space align="center">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className:
                'text-[18px] cursor-pointer transition-colors duration-300 hover:text-[#1890ff]',
              onClick: onToggle,
              style: { display: 'flex', alignItems: 'center', height: '100%' },
            }
          )}

          <Breadcrumb
            items={breadcrumb.map((item) => ({
              title: item.path ? (
                <Link to={item.path}>{item.title}</Link>
              ) : (
                item.title
              ),
            }))}
          />
        </Space>

        <Dropdown menu={{ items: userDropdownItems }} placement="bottomRight">
          <div className="inline-flex items-center cursor-pointer leading-none">
            <Avatar
              icon={<UserOutlined />}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            />
            <span className="ml-2 relative top-0.5">管理员</span>
          </div>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};

export default HeaderBar;
