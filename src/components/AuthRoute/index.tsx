import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { AuthRouteProps } from "@/types";

const AuthRoute: React.FC<AuthRouteProps> = ({ children, roles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};

export default AuthRoute;