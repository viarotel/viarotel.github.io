// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config
import path from 'node:path'
import useUnoCSS from 'unocss/vite'
import useEslint from 'vite-plugin-eslint'
import { generateSidebar } from 'vitepress-sidebar'

const sidebar = generateSidebar({
  root: '/src/notes',
  useTitleFromFileHeading: true,
  collapsed: false,
  withIndex: false,
})[0]?.items || []
// console.log('sidebar', JSON.stringify(sidebar))

const notes = (() => {
  const category = sidebar.find((item) => item.text === 'category')?.items || []
  return category.filter((item) => item.text !== 'index.md')
})()
// console.log('notes', JSON.stringify(notes))

const useImgTag = (src) =>
  `<img src="${src}" style="width: 20px; height: 20px;" class="hover:opacity-100 opacity-70 duration-500" />`

export default {
  title: 'viarotel',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/avatar.jpg',
      },
    ],
  ],
  srcDir: './src/notes',
  outDir: './dist',
  vite: {
    optimizeDeps: {
      exclude: ['@lottiefiles/lottie-player'],
    },
    plugins: [useUnoCSS(), useEslint({ fix: true })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'lottie-player',
      },
    },
  },
  locales: {
    root: {
      label: '简体中文',
      titleTemplate: '这里是 viarotel',
      description: '这里是 viarotel',
      themeConfig: {
        nav: [
          { text: '主页', link: '/' },
          { text: '备忘', link: '/category/' },
          { text: '关于我', link: '/about' },
        ],
        sidebar: [
          {
            text: '备忘录',
            items: [{ text: '前言', link: '/category/' }, ...notes],
          },
          {
            text: '关于我',
            items: [
              { text: '简介', link: '/about' },
              { text: '联系', link: '/contact' },
            ],
          },
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      titleTemplate: 'This is viarotel',
      description: 'This is viarotel',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Memo', link: '/en/category/' },
          { text: 'About me', link: '/en/about' },
        ],
        sidebar: [
          {
            text: 'Memorandum',
            items: [{ text: 'Preface', link: '/en/category/' }, ...notes],
          },
          {
            text: 'About me',
            items: [
              { text: 'About', link: '/en/about' },
              { text: 'Contact', link: '/en/contact' },
            ],
          },
        ],
      },
    },
  },
  themeConfig: {
    logo: '/images/avatar.jpg',
    search: {
      provider: 'local',
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/viarotel/viarotel.github.io',
      },
      {
        icon: {
          svg: useImgTag('https://gitee.com/favicon.ico'),
        },
        link: 'https://gitee.com/viarotel',
      },
      {
        icon: {
          svg: useImgTag(
            'https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png',
          ),
        },
        link: 'https://juejin.cn/user/1275089219751944',
      },
    ],
    footer: {
      message: 'Released under the Apache License.',
      copyright: 'Copyright © 2023-present viarotel',
    },
  },
}
