import React, { Suspense } from 'react';
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { routes } from "@/routes";

const AppRoutes = () => {
  const element = useRoutes(routes);
  return <Suspense>{element}</Suspense>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;