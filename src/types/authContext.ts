// 定义AuthRoute组件props
export interface AuthRouteProps {
    children: React.ReactNode;
    roles?: string[];
}

// 定义AppSider组件props
export interface AppSiderProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

// 定义AppHeader组件props
export interface AppHeaderProps {
    onMenuClick?: () => void;
    isMobile?: boolean;
}
