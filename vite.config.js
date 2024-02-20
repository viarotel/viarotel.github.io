import path from 'node:path'
import useRemoveConsole from 'vite-plugin-remove-console'
import useUnoCSS from 'unocss/vite'
import rewrites from './src/rewrites/index.js'
import { proxyPort } from './src/configs/index.js'

export default {
  plugins: [useRemoveConsole(), useUnoCSS()],
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
