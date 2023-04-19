import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
// https://vitepress.dev/reference/default-theme-config

export default {
  title: "vianote",
  description: "",
  locales: {
    root: {
      label: "简体中文",
      lang: "zh-CN",
      themeConfig: {
        nav: [
          { text: "主页", link: "/" },
          { text: "关于我", link: "/personal" },
          { text: "个人简历", link: "/resume" },
        ],
        sidebar: [
          {
            text: "目录",
            items: [
              { text: "关于我", link: "/personal" },
              { text: "个人简历", link: "/resume" },
            ],
          },
        ],
        socialLinks: [
          { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
      },
    },
    en: {
      label: "English",
      lang: "en",
      themeConfig: {
        nav: [
          { text: "Home", link: "/" },
          { text: "Examples", link: "/markdown-examples" },
        ],
        sidebar: [
          {
            text: "Examples",
            items: [
              { text: "Markdown Examples", link: "/markdown-examples" },
              { text: "Runtime API Examples", link: "/api-examples" },
            ],
          },
        ],
        socialLinks: [
          { icon: "github", link: "https://github.com/vuejs/vitepress" },
        ],
      },
    },
  },
};
