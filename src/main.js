// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import Layout from '@/components/Layout/index.vue'
import './style.css'
import 'virtual:uno.css'

// https://vitepress.dev/guide/extending-default-theme#layout-slots
export default {
  ...Theme,
  Layout,
}
