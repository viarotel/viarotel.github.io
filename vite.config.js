import path from 'node:path'
import useUnoCSS from 'unocss/vite'
import useAutoImport from 'unplugin-auto-import/vite'
import useAutoComponents from 'unplugin-vue-components/vite'
import useRemoveConsole from 'vite-plugin-remove-console'
import { proxyPort } from './src/configs/index.js'
import rewrites from './src/rewrites/index.js'

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
