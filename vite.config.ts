import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Gym-Tracker-rep/',
  server: {
    port: 5173,
    strictPort: false,
  },
});
