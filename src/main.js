// https://vitepress.dev/guide/custom-theme
// https://vitepress.dev/guide/extending-default-theme#layout-slots

import Theme from 'vitepress/theme'
import App from './App.vue'

import 'uno.css'
import './styles/index.js'

import './utils/gtag/index.js'

export default {
  ...Theme,
  Layout: App,
  enhanceApp: ({ app }) => {},
}
