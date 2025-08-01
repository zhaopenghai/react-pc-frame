import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import AppRoutes from './routes';
import AppHeader from './components/Layout/AppHeader';
import AppSider from './components/Layout/AppSider';
import AppFooter from './components/Layout/AppFooter';
import { AuthProvider } from './contexts/AuthContext';

const { Content } = Layout;

const App: React.FC = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSiderCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  return (
    <AuthProvider>
      <Layout className='min-h-screen'>
        <AppSider
          collapsed={siderCollapsed}
          onCollapse={toggleSider}
        />
        {!siderCollapsed && (
          <div className="sider-mask" onClick={() => setSiderCollapsed(true)} />
        )}
        <Layout
          style={{ marginLeft: siderCollapsed ? 80 : 200}}
        >
          <AppHeader onMenuClick={toggleSider} />
          <Content className='mt-[24px] mx-[16px] mb-0'>
            <div className='p-[24px] min-h-[360px]'>
              <AppRoutes />
            </div>
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </AuthProvider>
  );
};

export default App;
