/// <reference types="./src/env"/>
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = {
    VITE_VERSION: 'default',
    VITE_BUILD_TIMESTAMP: new Date().toISOString(),
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    base: '',
    server: {
      port: Number.parseInt(process.env.VITE_PORT, 10) || 4001,
      open: mode !== 'test', // open only when mode is different from test
      watch: {
        ignored: ['**/coverage/**'],
      },
    },
    preview: {
      port: Number.parseInt(process.env.VITE_PORT || '3333', 10),
      strictPort: true,
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      react(),
      svgr(),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/', '.nyc_output', 'coverage'],
        extension: ['.js', '.ts', '.tsx'],
        requireEnv: false,
        forceBuildInstrument: mode === 'test',
        checkProd: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
