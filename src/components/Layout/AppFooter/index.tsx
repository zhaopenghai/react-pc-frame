import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

const AppFooter: React.FC = () => {
  return (
    <Footer className="text-center">
      <Text type="secondary">
        My AntD App ©{new Date().getFullYear()} | Version:{' '}
        {import.meta.env.VITE_API_BASE_URL} | Env: {import.meta.env.VITE_ENV}
      </Text>
    </Footer>
  );
};

export default AppFooter;
