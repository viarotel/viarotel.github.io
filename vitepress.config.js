// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config
import path from 'node:path'
import useUnoCSS from 'unocss/vite'
import useEslint from 'vite-plugin-eslint'
import useRemoveConsole from 'vite-plugin-remove-console'
import { generateSidebar } from 'vitepress-sidebar'
import dayjs from 'dayjs'

const sidebar = generateSidebar({
  root: '/src/notes',
  useTitleFromFileHeading: true,
  collapsed: false,
  withIndex: false,
  capitalizeFirst: true,
})[0]?.items || []
// console.log('sidebar', JSON.stringify(sidebar))

const notes = (() => {
  const category = sidebar.find((item) => item.text === 'Category')?.items || []
  return category.filter((item) => item.text !== 'Index.md')
})()
// console.log('notes', JSON.stringify(notes))

const useImgTag = (src) =>
  `<img src="${src}" style="width: 20px; height: 20px;" class="hover:opacity-100 opacity-70 duration-500" />`

export default {
  title: 'viarotel',
  lang: 'zh-CN',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/avatar.jpg',
      },
    ],
    // 百度统计工具
    [
      'script',
      {
        src: 'https://hm.baidu.com/hm.js?8731b7a102ed9bd8d70286c74cedea79',
      },
    ],
    // 不蒜子统计工具
    [
      'script',
      {
        src: 'https://busuanzi.9420.ltd/js',
      },
    ],
  ],
  srcDir: './src/notes',
  outDir: './dist',
  vite: {
    plugins: [useRemoveConsole(), useEslint({ fix: true }), useUnoCSS()],
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
          { text: '书签', link: '/bookmarks' },
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
              { text: '书签', link: '/bookmarks' },
            ],
          },
        ],
        lastUpdatedText: '最后更新时间',
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
          { text: 'Bookmarks', link: '/bookmarks' },
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
              { text: 'Bookmarks', link: '/bookmarks' },
            ],
          },
        ],
      },
    },
  },
  themeConfig: {
    logo: { src: '/images/avatar.gif', alt: 'viarotel' },
    search: {
      provider: 'algolia',
      options: {
        appId: 'XY26T0U1UR',
        apiKey: 'd92446a9ce99be7089c291a2dae47778',
        indexName: 'viarotelio',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消',
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除',
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接',
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者',
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈',
                },
              },
            },
          },
        },
      },
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
      message: `
        Views <span id="busuanzi_site_pv"></span>
        ,
        Visitors <span id="busuanzi_site_uv"></span>
        <br />
        Released under the Apache License. 
      `,
      copyright: `Copyright © 2023-${dayjs().format('YYYY')} viarotel`,
    },
  },
  lastUpdated: true,
}
