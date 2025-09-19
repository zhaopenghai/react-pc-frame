// import React, { lazy, Suspense } from 'react';
// import { Route, Routes, Outlet } from 'react-router-dom';
// import { Spin } from 'antd';
// import AuthRoute from '@/components/AuthRoute';
// import Layout from '@/components/Layout'; // 假设你有一个布局组件
//
// const Home = lazy(() => import('@/pages/Home'));
// const About = lazy(() => import('@/pages/About'));
// const Dashboard = lazy(() => import('@/pages/Dashboard'));
// const Login = lazy(() => import('@/pages/Login'));
// const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
// const Analytics = lazy(() => import('@/pages/Analytics'));
// const NotFound = lazy(() => import('@/pages/NotFound'));
// const Settings = lazy(() => import('@/pages/Settings'));
//
// const AppRoutes: React.FC = () => {
//   return (
//     <Suspense
//       fallback={<Spin size="large" className="flex justify-center mt-1/5" />}
//     >
//       <Routes>
//         {/* 使用布局包裹公共路由 */}
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="about" element={<About />} />
//           <Route path="login" element={<Login />} />
//           <Route path="unauthorized" element={<Unauthorized />} />
//
//           {/* 受保护的路由 */}
//           <Route
//             path="dashboard"
//             element={
//               <AuthRoute roles={['admin', 'editor']}>
//                 <Outlet /> {/* 这里渲染子路由 */}
//               </AuthRoute>
//             }
//           >
//             <Route index element={<Dashboard />} />
//             <Route path="analytics" element={<Analytics />} />
//             <Route path="settings" element={<Settings />} />
//           </Route>
//
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </Suspense>
//   );
// };
//
// export default AppRoutes;
