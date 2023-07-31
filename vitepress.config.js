// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config

import { generateSidebar } from 'vitepress-sidebar'
import dayjs from 'dayjs'
import async from './src/async/index.js'
import { appName } from './src/configs/index.js'

const sidebar = generateSidebar({
  documentRootPath: '/src/notes',
  useTitleFromFileHeading: true,
  collapsed: false,
  includeRootIndexFile: false,
  capitalizeFirst: true,
})[0]?.items || []
// console.log('sidebar', JSON.stringify(sidebar))

const memo = (() => {
  const value = (
    sidebar.find((item) => item.text === 'Memo')?.items || []
  ).filter((item) => item.text !== 'Index.md')
  return value
})()
// console.log('notes', JSON.stringify(notes))

const useImgTag = (src) =>
  `<img src="${src}" style="width: 20px; height: 20px;" class="hover:opacity-100 opacity-70 duration-500" />`

export default {
  title: appName,
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
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'lottie-player',
      },
    },
  },
  themeConfig: {
    logo: { src: '/images/avatar.gif', alt: appName },
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
        Released under the MIT License. 
      `,
      copyright: `Copyright © 2023-${dayjs().format('YYYY')} viarotel`,
    },
    async,
  },
  locales: {
    root: {
      label: '简体中文',
      titleTemplate: `这里是 ${appName}`,
      description: `这里是 ${appName}`,
      themeConfig: {
        nav: [
          { text: '主页', link: '/' },
          { text: '备忘', link: '/memo/' },
          { text: '书签', link: '/bookmarks' },
          { text: '关于我', link: '/about' },
        ],
        sidebar: [
          {
            text: '备忘录',
            items: [{ text: '前言', link: '/memo/' }, ...memo],
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
        returnToTopLabel: '返回顶部',
        outlineTitle: '当前页',
        lastUpdatedText: '最后更新时间',
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
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
          { text: 'Memo', link: '/en/memo/' },
          { text: 'Bookmarks', link: '/bookmarks' },
          { text: 'About me', link: '/en/about' },
        ],
        sidebar: [
          {
            text: 'Memo',
            items: [{ text: 'Preface', link: '/en/memo/' }, ...memo],
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
  lastUpdated: true,
}
