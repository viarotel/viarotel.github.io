// https://vitepress.dev/guide/custom-theme
// https://vitepress.dev/guide/extending-default-theme#layout-slots

import Theme from 'vitepress/theme'
import App from './App.vue'

import 'virtual:uno.css'
import './styles/index.js'

// 仅在浏览器端加载 lottie-player
if (!import.meta.env.SSR) {
  import('@lottiefiles/lottie-player').catch((e) => console.log(e))
}

export default {
  ...Theme,
  Layout: App,
  enhanceApp: ({ app }) => {
    // app.use(Vue3Lottie, { name: 'LottiePlayer' })
  },
}
