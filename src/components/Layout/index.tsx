import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, theme } from 'antd';
import reactSvg from '@/assets/react.svg';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';

const { Content, Footer } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 侧边栏Logo部分
  const sidebarLogo = (
    <div className="h-[64px] flex items-center justify-center p-[10px] overflow-hidden">
      <div className="flex items-center">
        <img src={reactSvg} alt="Logo" className="h-[34px] mr-[8px]" />
        {!collapsed && (
          <h1 className="text-black text-[18px] whitespace-nowrap m-0">
            管理系统
          </h1>
        )}
      </div>
    </div>
  );

  // 如果菜单加载中，显示加载状态
  // if (loading) {
  //   return (
  //     <Layout className="min-h-screen">
  //       <div className="flex-1 flex items-center justify-center">
  //         <Spin size="large" tip="菜单加载中..." />
  //       </div>
  //     </Layout>
  //   );
  // }

  return (
    <Layout className="min-h-screen">
      {/* 使用独立的侧边栏组件，传入菜单数据 */}
      <Sidebar
        collapsed={collapsed}
        onBreakpoint={(broken) => setCollapsed(broken)}
        logo={sidebarLogo}
      />

      {/* 主布局 */}
      <Layout>
        {/* 顶部导航栏 */}
        <HeaderBar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          colorBgContainer={colorBgContainer}
        />

        {/* 内容区域 */}
        <Content className="m-[16px]">
          <div
            className="p-[16px] min-h-[calc(100vh-120px)] border-[4px]"
            style={{ background: colorBgContainer }}
          >
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