import react from '@vitejs/plugin-react';
import 'dotenv/config';
import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/uniweek-miniapp',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  server: {
    host: true,
    proxy: {
      '^/api': {
        target: process.env.API_SERVER,
      },
    },
  },
});
