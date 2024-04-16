import antfu from '@antfu/eslint-config'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const autoImport = require('./.eslintrc-auto-import.json')

export default antfu(
  {
    typescript: false,
    markdown: false,
    ignores: ['node_modules', 'src/notes/public', 'dist', 'index.html'],
  },
  {
    languageOptions: {
      globals: {
        ...autoImport.globals,
      },
    },
    rules: {
      'jsdoc/check-param-names': 'off',
      'jsdoc/check-types': 'off',
      'jsdoc/require-returns-description': 'off',

      'node/prefer-global/process': 'off',

      'no-console': 'off',
      curly: 'off',
      eqeqeq: 'off',
      'no-unused-vars': 'off',

      'unused-imports/no-unused-vars': 'off',

      'vue/html-self-closing': 'off',
      'vue/block-order': 'off',
    },
  }
)
