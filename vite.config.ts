import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  // 只在开发模式下启用某些配置
  const isDevelopment = mode === 'development';

  // 加载环境变量，只包含VITE_前缀的变量
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': resolve('src'), // 直接使用 resolve
      },
    },
    // 安全的环境变量暴露方式
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      __DEV__: isDevelopment,
      __PROD__: !isDevelopment
    },
    build: {
      minify: 'esbuild',
      esbuild: {
        drop: ['console', 'debugger']
      }
    }
  }
});