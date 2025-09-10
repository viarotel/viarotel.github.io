import { defineConfig } from 'vitepress'
import { withI18n } from 'vitepress-i18n'
import { withSidebar } from 'vitepress-sidebar'
import { appName } from './src/configs/index.js'
import viteConfig from './vite.config.js'

export const defaultLocale = 'zhHans'
export const locales = [defaultLocale, 'en']

export function useImgTag(src) {
  return `<img src="${src}" style="width: 20px; height: 20px;" class="hover:opacity-100 opacity-70 duration-500" />`
}

const vitePressConfig = {
  srcDir: './src/contents',
  outDir: './dist',
  title: appName,
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
        src: 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js',
        async: true,
      },
    ],
  ],

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: { src: '/images/avatar.gif', alt: appName },
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
          svg: useImgTag('/images/logo-gitcode.png'),
        },
        link: 'https://gitcode.com/viarotel-org',
      },
      {
        icon: {
          svg: useImgTag(
            'https://static.hdslb.com/images/favicon.ico',
          ),
        },
        link: 'https://space.bilibili.com/274990176',
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
        <span id="busuanzi_container_site_pv"> Views <span id="busuanzi_value_site_pv"></span> </span>
        ,
        <span id="busuanzi_container_site_uv"> Visitors <span id="busuanzi_value_site_uv"></span> </span>
        <br />
        Released under the MIT License. 
      `,
      copyright: `Copyright © 2023-${new Date().getFullYear()} viarotel`,
    },
  },

  rewrites: {
    'zhHans/:rest*': ':rest*',
  },

  sitemap: {
    hostname: 'https://viarotel.eu.org',
  },

  vite: viteConfig,

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: tag => tag === 'lottie-player',
      },
    },
  },
}

const vitePressI18nConfig = {
  locales,
  rootLocale: defaultLocale,
  searchProvider: 'algolia',
  searchOptions: {
    appId: 'XY26T0U1UR',
    apiKey: 'd92446a9ce99be7089c291a2dae47778',
    indexName: 'viarotelio',
  },
  description: {
    en: `This is ${appName}`,
    zhHans: `这里是 ${appName}`,
  },
  themeConfig: {
    zhHans: {
      nav: [
        { text: '备忘', link: '/memo/' },
        { text: '书签', link: '/about/bookmarks' },
        { text: '关于', link: '/about/' },
        { text: 'Escrcpy', link: 'https://viarotel.eu.org/zhHans/' },
      ],
    },
    en: {
      nav: [
        { text: 'Memo', link: '/en/memo/' },
        { text: 'Bookmarks', link: '/en/about/bookmarks' },
        { text: 'About', link: '/en/about/' },
        { text: 'Escrcpy', link: 'https://viarotel.eu.org/' },
      ],
    },
  },
}

const vitePressSidebarConfig = [
  ...locales.map(lang => ({
    ...(defaultLocale === lang
      ? { basePath: '/', resolvePath: '/' }
      : { basePath: `/${lang}/`, resolvePath: `/${lang}/` }),
    documentRootPath: `/src/contents/${lang}`,
    collapsed: false,
    useTitleFromFrontmatter: true,
    capitalizeFirst: true,
    useFolderLinkFromIndexFile: true,
    includeFolderIndexFile: false,
    useFolderTitleFromIndexFile: true,
    manualSortFileNameByPriority: ['memo', 'donate', 'about'],
  })),
]

// https://vitepress.dev/reference/site-config
export default defineConfig(
  // @ts-ignore
  withSidebar(withI18n(vitePressConfig, vitePressI18nConfig), vitePressSidebarConfig),
)
