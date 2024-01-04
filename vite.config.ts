import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    //Registering alias paths
    alias: {
      '@api': '/src/api',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@styles': '/src/styles',
      '@routes': '/src/routes',
      '@appTypes': '/src/types',
      '@utils': '/src/utils'
    }
  }
});
