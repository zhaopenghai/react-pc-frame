import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AppLayout from '@/components/Layout';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppLayout/>
    </AuthProvider>
  );
};

export default App;
