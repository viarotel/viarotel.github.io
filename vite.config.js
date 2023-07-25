import path from 'node:path'
import useRemoveConsole from 'vite-plugin-remove-console'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import rewrites from './src/rewrites/index.js'

export default {
  plugins: [useRemoveConsole(), useEslint({ fix: true }), useUnoCSS()],
  resolve: {
    alias: {
      ...rewrites,
      '@': path.resolve(__dirname, './src/'),
    },
  },
  server: {
    proxy: {
      // https://ungh.cc/orgs/viarotel-org/repos
      '^/ungh': {
        target: 'https://ungh.cc',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp('^/ungh'), ''),
      },
    },
  },
}
