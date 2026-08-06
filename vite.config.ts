import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Force a strictly pure client-side static build (Zero Server Bundling)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
  },
  server: {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    hmr: process.env.DISABLE_HMR !== 'true',
    // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
    watch: process.env.DISABLE_HMR === 'true' ? null : {},
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    // Prevent rollup from looking for or bundling any backend server files
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: undefined,
      },
    },
    // Turn off heavy source map generation to streamline compilation
    sourcemap: false,
  },
});
