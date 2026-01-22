import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'widget-route',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/widget' || (req.url?.startsWith('/widget?') && !req.url.includes('/widget/index.html'))) {
            const queryString = req.url.includes('?') ? '?' + req.url.split('?')[1] : '';
            req.url = '/widget/index.html' + queryString;
          }
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        widget: resolve(__dirname, 'widget/index.html'),
      },
    },
  },
});
