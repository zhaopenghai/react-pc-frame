import React from 'react';
import {
  Layout,
  Space,
  Breadcrumb,
  Dropdown,
  Avatar,
  type MenuProps,
} from 'antd';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { AppHeaderProps } from '@/types';

const { Header } = Layout;

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

const AppHeader: React.FC<AppHeaderProps> = ({ onMenuClick }) => {
  return (
    <Header className="bg-white p-0 flex items-center">
      <div className="flex justify-between align-center px-[16px] py-0 w-full">
        <Space align='center'>
          {React.createElement(
              onMenuClick ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'text-[18px] cursor-pointer transition-colors duration-300 hover:text-[#1890ff]',
                onClick: onMenuClick,
                style: {
                  display: 'flex',
                  alignItems: 'center',  // 确保图标自身垂直居中
                  height: '100%'        // 继承父容器高度
                }
              }
          )}
          <Breadcrumb>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>当前页面</Breadcrumb.Item>
          </Breadcrumb>
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
    </Header>
  );
};

export default AppHeader;
