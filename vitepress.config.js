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
      titleTemplate: 'This is viarotel',
      description: 'This is viarotel',
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
