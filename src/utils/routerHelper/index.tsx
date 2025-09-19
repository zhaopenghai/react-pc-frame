import type { AppRouteObject } from '@/routes';
import { matchPath } from "react-router-dom";

export interface BreadcrumbItem {
  title: string | JSX.Element;
  path?: string;
}

/**
 * 根据 location.pathname 递归查找路由对应的面包屑和选中的菜单 key
 * @param routes 路由配置
 * @param pathname 当前 location.pathname
 */
export function findRoutePath(
  routes: AppRouteObject[],
  pathname: string
): {
  breadcrumb: BreadcrumbItem[];
  selectedKeys: string[];
  openKeys: string[];
} {
  const breadcrumb: BreadcrumbItem[] = [];
  const selectedKeys: string[] = [];
  const openKeys: string[] = [];

  function traverse(
    routes: AppRouteObject[],
    parentPaths: string[] = []
  ): boolean {
    for (const route of routes) {
      const fullPath = [...parentPaths, route.path].filter(Boolean).join("/");
      const pathToMatch = fullPath.startsWith("/") ? fullPath : "/" + fullPath;

      // 是否匹配当前路径
      if (matchPath({ path: pathToMatch, end: true }, pathname)) {
        if (route.label) breadcrumb.push({ title: route.label, path: pathToMatch });
        selectedKeys.push(route.key);
        openKeys.push(...parentPaths.map((_, i) => routes[i]?.key).filter(Boolean));
        return true;
      }

      // 如果有子路由，递归
      if (route.children && traverse(route.children, [...parentPaths, route.path || ""])) {
        if (route.label) breadcrumb.unshift({ title: route.label, path: "/" + [...parentPaths, route.path].filter(Boolean).join("/") });
        openKeys.push(route.key);
        return true;
      }
    }
    return false;
  }

  traverse(routes);
  return { breadcrumb, selectedKeys, openKeys };
}
