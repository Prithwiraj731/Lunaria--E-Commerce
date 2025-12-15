import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Only proxy backend API routes, not frontend routes
      '/user': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/admin/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/admin\/api/, '/admin'),
      },
      '/product/': {  // Note the trailing slash - only matches /product/something, not /products
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/cart': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/order': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
    allowedHosts: ['b3dcc04ca3c5.ngrok-free.app'],
  },
  preview: {
    port: 5173,
  }
});
