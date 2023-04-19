import path from 'node:path'
import useUnoCSS from 'unocss/vite'
import useEslint from 'vite-plugin-eslint'
import { getSidebar } from 'vitepress-plugin-auto-sidebar'

// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config
const sidebar = getSidebar({
  contentRoot: '/src/notes',
  contentDirs: ['category'],
  collapsible: false,
  collapsed: false,
})

export default {
  title: 'viarotel',
  titleTemplate: "Viarotel's home.",
  description: "Viarotel's home.",
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2ada642e95f4f588c911eb2deaee1f2~tplv-k3u1fbpfcp-watermark.image?',
      },
    ],
  ],
  srcDir: './src/notes',
  outDir: './dist',
  vite: {
    plugins: [useUnoCSS(), useEslint({ fix: true })],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/'),
      },
    },
  },
  locales: {
    root: {
      label: '简体中文',
      themeConfig: {
        nav: [
          { text: '主页', link: '/index' },
          { text: '个人简介', link: '/personal' },
          { text: '与我联系', link: '/contact' },
        ],
        sidebar: [
          {
            text: '关于我',
            items: [
              { text: '个人简介', link: '/personal' },
              { text: '与我联系', link: '/contact' },
            ],
          },
          // @ts-ignore
          ...sidebar.map((item) => ({ ...item, text: '我的笔记' })),
        ],
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/index' },
          { text: 'Personal Profile', link: '/en/personal' },
          { text: 'Contact me', link: '/en/contact' },
        ],
        sidebar: [
          {
            text: 'About me',
            items: [
              { text: 'Personal Profile', link: '/en/personal' },
              { text: 'Contact me', link: '/en/contact' },
            ],
          },
          // @ts-ignore
          ...sidebar.map((item) => ({ ...item, text: 'My notes' })),
        ],
      },
    },
  },
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/viarotel/viarotel.github.io',
      },
    ],
    footer: {
      message: 'Released under the Apache License.',
      copyright: 'Copyright © 2023-present viarotel',
    },
  },
}
