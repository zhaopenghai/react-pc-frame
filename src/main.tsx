import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App.tsx';

import './index.css';
import 'antd/dist/reset.css'; // Ant Design v5推荐使用reset.css

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1890ff',
            borderRadius: 4,
            colorBgContainer: '#ffffff',
          },
          components: {
            Layout: {
              headerBg: '#ffffff',
              siderBg: '#f0f2f5',
            },
            Menu: {
              itemSelectedBg: '#e6f7ff',
              itemSelectedColor: '#1890ff',
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
