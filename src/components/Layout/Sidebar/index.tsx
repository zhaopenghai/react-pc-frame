import React, { useEffect, useState } from 'react';
import { Layout, Menu, Spin, Alert } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildMenuItems } from '@/utils/menu';
import { routes } from '@/routes';

interface SidebarProps {
  collapsed: boolean;
  onBreakpoint?: (broken: boolean) => void;
  logo?: React.ReactNode;
  loading?: boolean;
  error?: Error | null;
}

const { Sider } = Layout;

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onBreakpoint,
  logo,
  loading = false,
  error = null,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 根据当前路径更新状态
  useEffect(() => {
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    if (pathSnippets.length > 0) {
      setSelectedKeys([pathSnippets[pathSnippets.length - 1]]);
    } else {
      setSelectedKeys(['home']);
    }

    // 根据路径自动展开对应的父级菜单
    const getParentKeys = () => {
      if (
        location.pathname.includes('/dashboard/analytics') ||
        location.pathname.includes('/dashboard/settings')
      ) {
        return ['dashboard'];
      }
      return [];
    };

    setOpenKeys(getParentKeys());
  }, [location.pathname]);

  // 处理菜单点击
  const handleMenuClick = ({ key }: { key: string }) => {
    const findPathByKey = (items: any[]): string | null => {
      for (const item of items) {
        if (item.key === key && item.path) {
          return item.path;
        }
        if (item.children) {
          const found = findPathByKey(item.children);
          if (found) return found;
        }
      }
      return null;
    };

    const path = findPathByKey(routes[0].children || []);
    if (path) {
      navigate(path);
    }
  };

  // 只允许一个子菜单展开
  const onOpenChange = (keys: string[]) => {
    // 只保留最后一个展开的菜单项
    if (keys.length > 1) {
      setOpenKeys([keys[keys.length - 1]]);
    } else {
      setOpenKeys(keys);
    }
  };

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
          openKeys={openKeys}
          items={buildMenuItems(routes[0].children || [])}
          onClick={handleMenuClick}
          onOpenChange={onOpenChange}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
