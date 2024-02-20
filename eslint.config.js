import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: false,
  markdown: false,
  ignores: [
    'node_modules',
    'src/notes/public',
    'dist',
    'index.html',
  ],
}, {
  rules: {
    'jsdoc/check-param-names': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/require-returns-description': 'off',

    'node/prefer-global/process': 'off',

    'no-console': 'off',
    'curly': 'off',
    'eqeqeq': 'off',
    'no-unused-vars': 'off',

    'unused-imports/no-unused-vars': 'off',

    'vue/html-self-closing': 'off',
    'vue/block-order': 'off',
  },
})
