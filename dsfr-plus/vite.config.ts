import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import libCss from 'vite-plugin-libcss';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    svgr(),
    libCss(),
    tsConfigPaths(),
    dts({ insertTypesEntry: false }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    emptyOutDir: true,
    rollupOptions: {
      external: [
        '@gouvfr/dsfr',
        'classnames',
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
      output: {
        exports: 'named',
        // preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
}))