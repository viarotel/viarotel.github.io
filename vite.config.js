import path from 'node:path'
import useAutoImport from 'unplugin-auto-import/vite'
import useAutoComponents from 'unplugin-vue-components/vite'
import useRemoveConsole from 'vite-plugin-remove-console'
import useUnoCSS from 'unocss/vite'
import rewrites from './src/rewrites/index.js'
import { proxyPort } from './src/configs/index.js'

const resolvers = []

export default {
  plugins: [
    useAutoImport({
      resolvers,
      imports: ['vue', 'pinia', 'vitepress'],
      eslintrc: {
        enabled: true,
      },
    }),
    useAutoComponents({
      resolvers,
    }),
    useRemoveConsole(),
    useUnoCSS(),
  ],
  resolve: {
    alias: {
      ...rewrites,
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    port: proxyPort,
    proxy: {},
  },
}
