// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If deploying to GitHub Pages, set base to '/<repo-name>/'.
// Example: base: '/nicholas-portfolio/'
export default defineConfig({
  plugins: [react()],
  base: process.env.GH_PAGES ? '/nicholas-portfolio/' : '/'
});
