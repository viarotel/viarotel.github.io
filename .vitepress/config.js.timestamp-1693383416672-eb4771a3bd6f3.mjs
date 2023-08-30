// vitepress.config.js
import { generateSidebar } from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+vitepress-sidebar@1.8.2/node_modules/vitepress-sidebar/dist/index.js";
import dayjs from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+dayjs@1.11.7/node_modules/dayjs/dayjs.min.js";

// src/utils/request/utils.js
function abortSignalTimeoutPolyfill() {
  if (AbortSignal.timeout) {
    return;
  }
  let timer = null;
  const controller = new AbortController();
  AbortSignal.timeout = (value) => {
    timer = setTimeout(() => controller.abort(), value);
    return controller.signal;
  };
  AbortSignal.clear = () => {
    clearTimeout(timer);
  };
}
async function binaryParser(response, { dataKey = "_data" } = {}) {
  return new Promise((resolve) => {
    const data = response[dataKey];
    let headers = response.headers;
    if (headers.toString() === "[object Headers]") {
      headers = Object.fromEntries(headers.entries());
    }
    let resData = "";
    let fileName;
    if (headers["content-disposition"]) {
      fileName = headers["content-disposition"].split(";")[1].split("=")[1];
    }
    const blob = data;
    if (!fileName) {
      const errorData = new FileReader();
      errorData.addEventListener("loadend", (data2) => {
        try {
          resData = JSON.parse(data2.target.result);
        } catch (e) {
          resData = "";
        }
        resolve(resData);
      });
      errorData.readAsText(blob);
    } else {
      resData = {
        fileName: window.decodeURIComponent(fileName),
        blob: data
      };
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = (e) => {
        const aEl = document.createElement("a");
        aEl.download = window.decodeURIComponent(resData.fileName);
        aEl.href = e.target.result;
        document.body.appendChild(aEl);
        aEl.click();
        document.body.removeChild(aEl);
        resData = {
          code: "0000",
          message: "\u6210\u529F"
        };
        resolve(resData);
      };
    }
  });
}

// src/utils/request/ofetch/index.js
import { ofetch } from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+ofetch@1.0.1/node_modules/ofetch/dist/node.mjs";
import qs from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+qs@6.11.1/node_modules/qs/lib/index.js";

// src/configs/index.js
var isProduction = process.env.NODE_ENV === "production";
var appName = "viarotel";
var requestURL = "";
var useProxy = false;
var proxyPath = "/proxy";

// src/configs/request.js
var isDevelopment = process.env.NODE_ENV === "development";
var tempURL = "";
if (useProxy) {
  tempURL = isDevelopment ? proxyPath : window.location.origin;
} else {
  tempURL = requestURL;
}
var baseURL = tempURL;
var timeout = 60 * 1e3;

// src/utils/request/ofetch/index.js
var defaultConfigs = {
  headers: {
    "content-type": "application/json;charset=utf-8"
  }
};
var ofetch_default = ({
  onRequest,
  onRequestError,
  onResponse,
  onResponseError
} = {}) => {
  const service = async ({
    url = "",
    method = "POST",
    headers = defaultConfigs.headers,
    ...options
  } = {}) => {
    abortSignalTimeoutPolyfill();
    if (method === "GET") {
      delete options.body;
    }
    const res = await ofetch(url, {
      baseURL: options.baseURL || baseURL,
      method,
      headers: {
        ...headers
      },
      signal: AbortSignal.timeout(options.timeout || timeout || 60 * 1e3),
      // signal: AbortSignal.timeout(5 * 1000),
      onRequest: service.onRequest,
      onRequestError: service.onRequestError,
      onResponse: service.onResponse,
      onResponseError: service.onResponseError,
      ...options
    }).catch((err) => console.warn(err));
    if (AbortSignal.clear)
      AbortSignal.clear();
    return res;
  };
  service.onRequest = ({ request, options }) => {
    onRequest({
      url: request,
      configs: options,
      bodyKey: "body",
      queryKey: "query"
    });
    if (options.method === "GET") {
      delete options.body;
    }
  };
  service.onRequestError = ({ request, options, error }) => onRequestError({
    url: request,
    configs: options,
    bodyKey: "body",
    queryKey: "query",
    error
  });
  service.onResponse = async ({ request, options, response }) => onResponse({
    url: request,
    configs: options,
    response,
    dataKey: "_data"
  });
  service.onResponseError = ({ request, options, response }) => onResponseError({
    url: request,
    configs: options,
    response,
    dataKey: "_data"
  });
  service.get = (url, params, { paramsKey = "query", ...options } = {}) => service({
    url,
    method: "GET",
    [paramsKey]: params,
    ...options
  });
  service.post = (url, params, { paramsKey = "body", ...options } = {}) => service({
    url,
    method: "POST",
    [paramsKey]: params,
    ...options
  });
  service.form = (url, params, { useFormData = true, paramsKey = "body", ...options } = {}) => {
    if (useFormData) {
      const formData = new FormData();
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value);
      });
      params = formData;
    }
    return service.post({
      url,
      method: "POST",
      [paramsKey]: params,
      headers: {
        "content-type": "multipart/form-data"
      },
      ...options
    });
  };
  service.query = (url, params, { useQuery = true, paramsKey = "body", ...options } = {}) => {
    if (useQuery) {
      const queryData = qs.stringify(params);
      params = queryData;
    }
    return service({
      url,
      method: "POST",
      [paramsKey]: params,
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      ...options
    });
  };
  return service;
};

// src/utils/request/index.js
var request_default = ofetch_default({
  onRequest({
    url,
    configs,
    bodyKey = "body",
    queryKey = "query"
  } = {}) {
    if (!configs[bodyKey]) {
      configs[bodyKey] = {};
    }
    const body = configs[bodyKey];
    const headers = configs.headers.toString() === "[object Headers]" ? Object.fromEntries(configs.headers.entries()) : configs.headers;
    return configs;
  },
  onRequestError(error) {
    console.log("onRequestError.error", error);
    return Promise.reject(error);
  },
  async onResponse({
    url,
    configs,
    response,
    dataKey = "data"
  } = {}) {
    if (configs.responseType === "blob") {
      response[dataKey] = await binaryParser(response, { dataKey });
    }
    const data = response[dataKey] || {};
    if (!(data == null ? void 0 : data.code)) {
      return response;
    }
    return response;
  },
  onResponseError({ response, dataKey = "data" } = {}) {
    const data = response[dataKey];
    const status = response.status;
    const statusText = response.statusText;
  }
});

// src/async/ungh.js
var baseURL2 = "https://ungh.cc";
async function getRepos() {
  const res = await request_default.get(`${baseURL2}/orgs/viarotel-org/repos`).catch((e) => console.warn(e));
  return (res == null ? void 0 : res.repos) || [];
}
var ungh_default = {
  repos: await getRepos()
};

// src/async/index.js
var async_default = {
  ...ungh_default
};

// vitepress.config.js
var _a;
var sidebar = ((_a = generateSidebar({
  documentRootPath: "/src/notes",
  useTitleFromFileHeading: true,
  collapsed: false,
  includeRootIndexFile: false,
  capitalizeFirst: true
})[0]) == null ? void 0 : _a.items) || [];
var memo = (() => {
  var _a2;
  const value = (((_a2 = sidebar.find((item) => item.text === "Memo")) == null ? void 0 : _a2.items) || []).filter((item) => item.text !== "Index.md");
  return value;
})();
function useImgTag(src) {
  return `<img src="${src}" style="width: 20px; height: 20px;" class="hover:opacity-100 opacity-70 duration-500" />`;
}
var vitepress_config_default = {
  title: appName,
  lang: "zh-CN",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/images/avatar.jpg"
      }
    ],
    // 百度统计工具
    [
      "script",
      {
        src: "https://hm.baidu.com/hm.js?8731b7a102ed9bd8d70286c74cedea79"
      }
    ],
    // 不蒜子统计工具
    [
      "script",
      {
        src: "https://busuanzi.9420.ltd/js"
      }
    ]
  ],
  srcDir: "./src/notes",
  outDir: "./dist",
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === "lottie-player"
      }
    }
  },
  themeConfig: {
    logo: { src: "/images/avatar.gif", alt: appName },
    search: {
      provider: "algolia",
      options: {
        appId: "XY26T0U1UR",
        apiKey: "d92446a9ce99be7089c291a2dae47778",
        indexName: "viarotelio",
        locales: {
          root: {
            placeholder: "\u641C\u7D22\u6587\u6863",
            translations: {
              button: {
                buttonText: "\u641C\u7D22",
                buttonAriaLabel: "\u641C\u7D22"
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  cancelButtonText: "\u53D6\u6D88",
                  cancelButtonAriaLabel: "\u53D6\u6D88"
                },
                startScreen: {
                  recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                  noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                  saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2",
                  removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                  favoriteSearchesTitle: "\u6536\u85CF",
                  removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664"
                },
                errorScreen: {
                  titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C",
                  helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5"
                },
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362",
                  closeText: "\u5173\u95ED",
                  searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005"
                },
                noResultsScreen: {
                  noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                  suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2",
                  reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                  reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988"
                }
              }
            }
          }
        }
      }
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/viarotel/viarotel.github.io"
      },
      {
        icon: {
          svg: useImgTag("https://gitee.com/favicon.ico")
        },
        link: "https://gitee.com/viarotel"
      },
      {
        icon: {
          svg: useImgTag(
            "https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web//static/favicons/favicon-32x32.png"
          )
        },
        link: "https://juejin.cn/user/1275089219751944"
      }
    ],
    footer: {
      message: `
        Views <span id="busuanzi_site_pv"></span>
        ,
        Visitors <span id="busuanzi_site_uv"></span>
        <br />
        Released under the MIT License. 
      `,
      copyright: `Copyright \xA9 2023-${dayjs().format("YYYY")} viarotel`
    },
    async: async_default
  },
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      titleTemplate: `\u8FD9\u91CC\u662F ${appName}`,
      description: `\u8FD9\u91CC\u662F ${appName}`,
      themeConfig: {
        nav: [
          { text: "\u4E3B\u9875", link: "/" },
          { text: "\u5907\u5FD8", link: "/memo/" },
          { text: "\u4E66\u7B7E", link: "/bookmarks" },
          { text: "\u5173\u4E8E\u6211", link: "/about" }
        ],
        sidebar: [
          {
            text: "\u5907\u5FD8\u5F55",
            items: [{ text: "\u524D\u8A00", link: "/memo/" }, ...memo]
          },
          {
            text: "\u5173\u4E8E\u6211",
            items: [
              { text: "\u7B80\u4ECB", link: "/about" },
              { text: "\u8054\u7CFB", link: "/contact" },
              { text: "\u4E66\u7B7E", link: "/bookmarks" }
            ]
          }
        ],
        returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
        outlineTitle: "\u5F53\u524D\u9875",
        lastUpdatedText: "\u6700\u540E\u66F4\u65B0\u65F6\u95F4",
        docFooter: {
          prev: "\u4E0A\u4E00\u9875",
          next: "\u4E0B\u4E00\u9875"
        }
      }
    },
    en: {
      label: "English",
      lang: "en",
      titleTemplate: "This is viarotel",
      description: "This is viarotel",
      themeConfig: {
        nav: [
          { text: "Home", link: "/en/" },
          { text: "Memo", link: "/en/memo/" },
          { text: "Bookmarks", link: "/bookmarks" },
          { text: "About me", link: "/en/about" }
        ],
        sidebar: [
          {
            text: "Memo",
            items: [{ text: "Preface", link: "/en/memo/" }, ...memo]
          },
          {
            text: "About me",
            items: [
              { text: "About", link: "/en/about" },
              { text: "Contact", link: "/en/contact" },
              { text: "Bookmarks", link: "/bookmarks" }
            ]
          }
        ]
      }
    }
  },
  lastUpdated: true
};

// vite.config.js
import path from "node:path";
import useRemoveConsole from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-remove-console@2.1.1/node_modules/vite-plugin-remove-console/dist/index.mjs";
import useEslint from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-eslint@1.8.1_eslint@8.41.0_vite@4.4.6/node_modules/vite-plugin-eslint/dist/index.mjs";
import useUnoCSS from "file:///D:/viarotel/Personals/Works/viarotel.github.io/node_modules/.pnpm/registry.npmmirror.com+unocss@0.53.6_postcss@8.4.27_vite@4.4.6/node_modules/unocss/dist/vite.mjs";

// src/rewrites/index.js
import { URL, fileURLToPath } from "node:url";
var __vite_injected_original_import_meta_url = "file:///D:/viarotel/Personals/Works/viarotel.github.io/src/rewrites/index.js";
var importComponent = (path2) => fileURLToPath(new URL(path2, __vite_injected_original_import_meta_url));
var rewrites_default = {
  "./VPHomeHero.vue": importComponent("./components/VPHomeHero/index.vue")
};

// vite.config.js
var __vite_injected_original_dirname = "D:\\viarotel\\Personals\\Works\\viarotel.github.io";
var vite_config_default = {
  plugins: [useRemoveConsole(), useEslint({ fix: true }), useUnoCSS()],
  resolve: {
    alias: {
      ...rewrites_default,
      "@": path.resolve(__vite_injected_original_dirname, "./src/")
    }
  },
  server: {
    proxy: {}
  }
};

// .vitepress/config.js
var config_default = {
  ...vitepress_config_default,
  vite: vite_config_default
};
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXByZXNzLmNvbmZpZy5qcyIsICJzcmMvdXRpbHMvcmVxdWVzdC91dGlscy5qcyIsICJzcmMvdXRpbHMvcmVxdWVzdC9vZmV0Y2gvaW5kZXguanMiLCAic3JjL2NvbmZpZ3MvaW5kZXguanMiLCAic3JjL2NvbmZpZ3MvcmVxdWVzdC5qcyIsICJzcmMvdXRpbHMvcmVxdWVzdC9pbmRleC5qcyIsICJzcmMvYXN5bmMvdW5naC5qcyIsICJzcmMvYXN5bmMvaW5kZXguanMiLCAidml0ZS5jb25maWcuanMiLCAic3JjL3Jld3JpdGVzL2luZGV4LmpzIiwgIi52aXRlcHJlc3MvY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFx2aXRlcHJlc3MuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aWFyb3RlbC9QZXJzb25hbHMvV29ya3Mvdmlhcm90ZWwuZ2l0aHViLmlvL3ZpdGVwcmVzcy5jb25maWcuanNcIjsvLyBodHRwczovL3ZpdGVwcmVzcy5kZXYvcmVmZXJlbmNlL3NpdGUtY29uZmlnXHJcbi8vIGh0dHBzOi8vdml0ZXByZXNzLmRldi9yZWZlcmVuY2UvZGVmYXVsdC10aGVtZS1jb25maWdcclxuXHJcbmltcG9ydCB7IGdlbmVyYXRlU2lkZWJhciB9IGZyb20gJ3ZpdGVwcmVzcy1zaWRlYmFyJ1xyXG5pbXBvcnQgZGF5anMgZnJvbSAnZGF5anMnXHJcbmltcG9ydCBhc3luYyBmcm9tICcuL3NyYy9hc3luYy9pbmRleC5qcydcclxuaW1wb3J0IHsgYXBwTmFtZSB9IGZyb20gJy4vc3JjL2NvbmZpZ3MvaW5kZXguanMnXHJcblxyXG5jb25zdCBzaWRlYmFyID0gZ2VuZXJhdGVTaWRlYmFyKHtcclxuICBkb2N1bWVudFJvb3RQYXRoOiAnL3NyYy9ub3RlcycsXHJcbiAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXHJcbiAgY29sbGFwc2VkOiBmYWxzZSxcclxuICBpbmNsdWRlUm9vdEluZGV4RmlsZTogZmFsc2UsXHJcbiAgY2FwaXRhbGl6ZUZpcnN0OiB0cnVlLFxyXG59KVswXT8uaXRlbXMgfHwgW11cclxuLy8gY29uc29sZS5sb2coJ3NpZGViYXInLCBKU09OLnN0cmluZ2lmeShzaWRlYmFyKSlcclxuXHJcbmNvbnN0IG1lbW8gPSAoKCkgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gKFxyXG4gICAgc2lkZWJhci5maW5kKGl0ZW0gPT4gaXRlbS50ZXh0ID09PSAnTWVtbycpPy5pdGVtcyB8fCBbXVxyXG4gICkuZmlsdGVyKGl0ZW0gPT4gaXRlbS50ZXh0ICE9PSAnSW5kZXgubWQnKVxyXG4gIHJldHVybiB2YWx1ZVxyXG59KSgpXHJcbi8vIGNvbnNvbGUubG9nKCdub3RlcycsIEpTT04uc3RyaW5naWZ5KG5vdGVzKSlcclxuXHJcbmZ1bmN0aW9uIHVzZUltZ1RhZyhzcmMpIHtcclxuICByZXR1cm4gYDxpbWcgc3JjPVwiJHtzcmN9XCIgc3R5bGU9XCJ3aWR0aDogMjBweDsgaGVpZ2h0OiAyMHB4O1wiIGNsYXNzPVwiaG92ZXI6b3BhY2l0eS0xMDAgb3BhY2l0eS03MCBkdXJhdGlvbi01MDBcIiAvPmBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHRpdGxlOiBhcHBOYW1lLFxyXG4gIGxhbmc6ICd6aC1DTicsXHJcbiAgaGVhZDogW1xyXG4gICAgW1xyXG4gICAgICAnbGluaycsXHJcbiAgICAgIHtcclxuICAgICAgICByZWw6ICdpY29uJyxcclxuICAgICAgICBocmVmOiAnL2ltYWdlcy9hdmF0YXIuanBnJyxcclxuICAgICAgfSxcclxuICAgIF0sXHJcbiAgICAvLyBcdTc2N0VcdTVFQTZcdTdFREZcdThCQTFcdTVERTVcdTUxNzdcclxuICAgIFtcclxuICAgICAgJ3NjcmlwdCcsXHJcbiAgICAgIHtcclxuICAgICAgICBzcmM6ICdodHRwczovL2htLmJhaWR1LmNvbS9obS5qcz84NzMxYjdhMTAyZWQ5YmQ4ZDcwMjg2Yzc0Y2VkZWE3OScsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gICAgLy8gXHU0RTBEXHU4NDlDXHU1QjUwXHU3RURGXHU4QkExXHU1REU1XHU1MTc3XHJcbiAgICBbXHJcbiAgICAgICdzY3JpcHQnLFxyXG4gICAgICB7XHJcbiAgICAgICAgc3JjOiAnaHR0cHM6Ly9idXN1YW56aS45NDIwLmx0ZC9qcycsXHJcbiAgICAgIH0sXHJcbiAgICBdLFxyXG4gIF0sXHJcbiAgc3JjRGlyOiAnLi9zcmMvbm90ZXMnLFxyXG4gIG91dERpcjogJy4vZGlzdCcsXHJcbiAgdnVlOiB7XHJcbiAgICB0ZW1wbGF0ZToge1xyXG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcclxuICAgICAgICBpc0N1c3RvbUVsZW1lbnQ6IHRhZyA9PiB0YWcgPT09ICdsb3R0aWUtcGxheWVyJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICB0aGVtZUNvbmZpZzoge1xyXG4gICAgbG9nbzogeyBzcmM6ICcvaW1hZ2VzL2F2YXRhci5naWYnLCBhbHQ6IGFwcE5hbWUgfSxcclxuICAgIHNlYXJjaDoge1xyXG4gICAgICBwcm92aWRlcjogJ2FsZ29saWEnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgYXBwSWQ6ICdYWTI2VDBVMVVSJyxcclxuICAgICAgICBhcGlLZXk6ICdkOTI0NDZhOWNlOTliZTcwODljMjkxYTJkYWU0Nzc3OCcsXHJcbiAgICAgICAgaW5kZXhOYW1lOiAndmlhcm90ZWxpbycsXHJcbiAgICAgICAgbG9jYWxlczoge1xyXG4gICAgICAgICAgcm9vdDoge1xyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogJ1x1NjQxQ1x1N0QyMlx1NjU4N1x1Njg2MycsXHJcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xyXG4gICAgICAgICAgICAgIGJ1dHRvbjoge1xyXG4gICAgICAgICAgICAgICAgYnV0dG9uVGV4dDogJ1x1NjQxQ1x1N0QyMicsXHJcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjInLFxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgbW9kYWw6IHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaEJveDoge1xyXG4gICAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcclxuICAgICAgICAgICAgICAgICAgcmVzZXRCdXR0b25BcmlhTGFiZWw6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxyXG4gICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiAnXHU1M0Q2XHU2RDg4JyxcclxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdGFydFNjcmVlbjoge1xyXG4gICAgICAgICAgICAgICAgICByZWNlbnRTZWFyY2hlc1RpdGxlOiAnXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyJyxcclxuICAgICAgICAgICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICBzYXZlUmVjZW50U2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRGRERcdTVCNThcdTgxRjNcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxyXG4gICAgICAgICAgICAgICAgICByZW1vdmVSZWNlbnRTZWFyY2hCdXR0b25UaXRsZTogJ1x1NEVDRVx1NjQxQ1x1N0QyMlx1NTM4Nlx1NTNGMlx1NEUyRFx1NzlGQlx1OTY2NCcsXHJcbiAgICAgICAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXHJcbiAgICAgICAgICAgICAgICAgIHJlbW92ZUZhdm9yaXRlU2VhcmNoQnV0dG9uVGl0bGU6ICdcdTRFQ0VcdTY1MzZcdTg1Q0ZcdTRFMkRcdTc5RkJcdTk2NjQnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGVycm9yU2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXHJcbiAgICAgICAgICAgICAgICAgIGhlbHBUZXh0OiAnXHU0RjYwXHU1M0VGXHU4MEZEXHU5NzAwXHU4OTgxXHU2OEMwXHU2N0U1XHU0RjYwXHU3Njg0XHU3RjUxXHU3RURDXHU4RkRFXHU2M0E1JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXHJcbiAgICAgICAgICAgICAgICAgIG5hdmlnYXRlVGV4dDogJ1x1NTIwN1x1NjM2MicsXHJcbiAgICAgICAgICAgICAgICAgIGNsb3NlVGV4dDogJ1x1NTE3M1x1OTVFRCcsXHJcbiAgICAgICAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1ODAwNScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbm9SZXN1bHRzU2NyZWVuOiB7XHJcbiAgICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxyXG4gICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdcdTRGNjBcdTUzRUZcdTRFRTVcdTVDMURcdThCRDVcdTY3RTVcdThCRTInLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c1RleHQ6ICdcdTRGNjBcdThCQTRcdTRFM0FcdThCRTVcdTY3RTVcdThCRTJcdTVFOTRcdThCRTVcdTY3MDlcdTdFRDNcdTY3OUNcdUZGMUYnLFxyXG4gICAgICAgICAgICAgICAgICByZXBvcnRNaXNzaW5nUmVzdWx0c0xpbmtUZXh0OiAnXHU3MEI5XHU1MUZCXHU1M0NEXHU5OTg4JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBzb2NpYWxMaW5rczogW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbjogJ2dpdGh1YicsXHJcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS92aWFyb3RlbC92aWFyb3RlbC5naXRodWIuaW8nLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgc3ZnOiB1c2VJbWdUYWcoJ2h0dHBzOi8vZ2l0ZWUuY29tL2Zhdmljb24uaWNvJyksXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRlZS5jb20vdmlhcm90ZWwnLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgaWNvbjoge1xyXG4gICAgICAgICAgc3ZnOiB1c2VJbWdUYWcoXHJcbiAgICAgICAgICAgICdodHRwczovL2xmMy1jZG4tdG9zLmJ5dGVzY20uY29tL29iai9zdGF0aWMveGl0dV9qdWVqaW5fd2ViLy9zdGF0aWMvZmF2aWNvbnMvZmF2aWNvbi0zMngzMi5wbmcnLFxyXG4gICAgICAgICAgKSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6ICdodHRwczovL2p1ZWppbi5jbi91c2VyLzEyNzUwODkyMTk3NTE5NDQnLFxyXG4gICAgICB9LFxyXG4gICAgXSxcclxuICAgIGZvb3Rlcjoge1xyXG4gICAgICBtZXNzYWdlOiBgXHJcbiAgICAgICAgVmlld3MgPHNwYW4gaWQ9XCJidXN1YW56aV9zaXRlX3B2XCI+PC9zcGFuPlxyXG4gICAgICAgICxcclxuICAgICAgICBWaXNpdG9ycyA8c3BhbiBpZD1cImJ1c3VhbnppX3NpdGVfdXZcIj48L3NwYW4+XHJcbiAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBcclxuICAgICAgYCxcclxuICAgICAgY29weXJpZ2h0OiBgQ29weXJpZ2h0IFx1MDBBOSAyMDIzLSR7ZGF5anMoKS5mb3JtYXQoJ1lZWVknKX0gdmlhcm90ZWxgLFxyXG4gICAgfSxcclxuICAgIGFzeW5jLFxyXG4gIH0sXHJcbiAgbG9jYWxlczoge1xyXG4gICAgcm9vdDoge1xyXG4gICAgICBsYWJlbDogJ1x1N0I4MFx1NEY1M1x1NEUyRFx1NjU4NycsXHJcbiAgICAgIHRpdGxlVGVtcGxhdGU6IGBcdThGRDlcdTkxQ0NcdTY2MkYgJHthcHBOYW1lfWAsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBgXHU4RkQ5XHU5MUNDXHU2NjJGICR7YXBwTmFtZX1gLFxyXG4gICAgICB0aGVtZUNvbmZpZzoge1xyXG4gICAgICAgIG5hdjogW1xyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU0RTNCXHU5ODc1JywgbGluazogJy8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTU5MDdcdTVGRDgnLCBsaW5rOiAnL21lbW8vJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnXHU0RTY2XHU3QjdFJywgbGluazogJy9ib29rbWFya3MnIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdcdTUxNzNcdTRFOEVcdTYyMTEnLCBsaW5rOiAnL2Fib3V0JyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2lkZWJhcjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnXHU1OTA3XHU1RkQ4XHU1RjU1JyxcclxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdcdTUyNERcdThBMDAnLCBsaW5rOiAnL21lbW8vJyB9LCAuLi5tZW1vXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRleHQ6ICdcdTUxNzNcdTRFOEVcdTYyMTEnLFxyXG4gICAgICAgICAgICBpdGVtczogW1xyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1N0I4MFx1NEVDQicsIGxpbms6ICcvYWJvdXQnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU4MDU0XHU3Q0ZCJywgbGluazogJy9jb250YWN0JyB9LFxyXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NEU2Nlx1N0I3RScsIGxpbms6ICcvYm9va21hcmtzJyB9LFxyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHJldHVyblRvVG9wTGFiZWw6ICdcdThGRDRcdTU2REVcdTk4NzZcdTkwRTgnLFxyXG4gICAgICAgIG91dGxpbmVUaXRsZTogJ1x1NUY1M1x1NTI0RFx1OTg3NScsXHJcbiAgICAgICAgbGFzdFVwZGF0ZWRUZXh0OiAnXHU2NzAwXHU1NDBFXHU2NkY0XHU2NUIwXHU2NUY2XHU5NUY0JyxcclxuICAgICAgICBkb2NGb290ZXI6IHtcclxuICAgICAgICAgIHByZXY6ICdcdTRFMEFcdTRFMDBcdTk4NzUnLFxyXG4gICAgICAgICAgbmV4dDogJ1x1NEUwQlx1NEUwMFx1OTg3NScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBlbjoge1xyXG4gICAgICBsYWJlbDogJ0VuZ2xpc2gnLFxyXG4gICAgICBsYW5nOiAnZW4nLFxyXG4gICAgICB0aXRsZVRlbXBsYXRlOiAnVGhpcyBpcyB2aWFyb3RlbCcsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhpcyBpcyB2aWFyb3RlbCcsXHJcbiAgICAgIHRoZW1lQ29uZmlnOiB7XHJcbiAgICAgICAgbmF2OiBbXHJcbiAgICAgICAgICB7IHRleHQ6ICdIb21lJywgbGluazogJy9lbi8nIH0sXHJcbiAgICAgICAgICB7IHRleHQ6ICdNZW1vJywgbGluazogJy9lbi9tZW1vLycgfSxcclxuICAgICAgICAgIHsgdGV4dDogJ0Jvb2ttYXJrcycsIGxpbms6ICcvYm9va21hcmtzJyB9LFxyXG4gICAgICAgICAgeyB0ZXh0OiAnQWJvdXQgbWUnLCBsaW5rOiAnL2VuL2Fib3V0JyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2lkZWJhcjogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0ZXh0OiAnTWVtbycsXHJcbiAgICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiAnUHJlZmFjZScsIGxpbms6ICcvZW4vbWVtby8nIH0sIC4uLm1lbW9dLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGV4dDogJ0Fib3V0IG1lJyxcclxuICAgICAgICAgICAgaXRlbXM6IFtcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdBYm91dCcsIGxpbms6ICcvZW4vYWJvdXQnIH0sXHJcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQ29udGFjdCcsIGxpbms6ICcvZW4vY29udGFjdCcgfSxcclxuICAgICAgICAgICAgICB7IHRleHQ6ICdCb29rbWFya3MnLCBsaW5rOiAnL2Jvb2ttYXJrcycgfSxcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBsYXN0VXBkYXRlZDogdHJ1ZSxcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHZpYXJvdGVsXFxcXFBlcnNvbmFsc1xcXFxXb3Jrc1xcXFx2aWFyb3RlbC5naXRodWIuaW9cXFxcc3JjXFxcXHV0aWxzXFxcXHJlcXVlc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZpYXJvdGVsXFxcXFBlcnNvbmFsc1xcXFxXb3Jrc1xcXFx2aWFyb3RlbC5naXRodWIuaW9cXFxcc3JjXFxcXHV0aWxzXFxcXHJlcXVlc3RcXFxcdXRpbHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3ZpYXJvdGVsL1BlcnNvbmFscy9Xb3Jrcy92aWFyb3RlbC5naXRodWIuaW8vc3JjL3V0aWxzL3JlcXVlc3QvdXRpbHMuanNcIjsvLyBpbXBvcnQgeyBpc1N0cmluZyB9IGZyb20gJ2xvZGFzaC1lcydcclxuLy8gaW1wb3J0IHsgYWVzIH0gZnJvbSAnQC91dGlscy9lbmNyeXB0J1xyXG4vLyBpbXBvcnQgeyB1c2VFbmNyeXB0IH0gZnJvbSAnQC9jb25maWdzL3JlcXVlc3QuanMnXHJcblxyXG4vKipcclxuICogXHU3NTI4XHU0RThFXHU1MTdDXHU1QkI5XHU0RjRFXHU3MjQ4XHU2NzJDXHU2RDRGXHU4OUM4XHU1NjY4XHU0RTBEXHU2NTJGXHU2MzAxIEFib3J0U2lnbmFsIEFQSSBcdTRFRTVcdTVCOUVcdTczQjBcdThEODVcdTY1RjZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhYm9ydFNpZ25hbFRpbWVvdXRQb2x5ZmlsbCgpIHtcclxuICBpZiAoQWJvcnRTaWduYWwudGltZW91dCkge1xyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBsZXQgdGltZXIgPSBudWxsXHJcbiAgY29uc3QgY29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKVxyXG5cclxuICBBYm9ydFNpZ25hbC50aW1lb3V0ID0gKHZhbHVlKSA9PiB7XHJcbiAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4gY29udHJvbGxlci5hYm9ydCgpLCB2YWx1ZSlcclxuICAgIHJldHVybiBjb250cm9sbGVyLnNpZ25hbFxyXG4gIH1cclxuICBBYm9ydFNpZ25hbC5jbGVhciA9ICgpID0+IHtcclxuICAgIGNsZWFyVGltZW91dCh0aW1lcilcclxuICB9XHJcbn1cclxuXHJcbi8vIC8qKlxyXG4vLyAgKiBcdTY1NzBcdTYzNkVcdTUyQTBcdTVCQzZcdTVFMkVcdTUyQTlcdTdBMEJcdTVFOEZcclxuLy8gICogQHJldHVybnNcclxuLy8gICovXHJcbi8vIGV4cG9ydCBjb25zdCBhZXNIZWxwZXIgPSAoeyBwYXJhbXMsIGhlYWRlcnMgfSA9IHt9KSA9PiB7XHJcbi8vICAgY29uc3QgZ2V0Q29udGVudFR5cGUgPSAoKSA9PiBoZWFkZXJzPy5bJ0NvbnRlbnQtVHlwZSddIHx8IGhlYWRlcnM/LlsnY29udGVudC10eXBlJ11cclxuXHJcbi8vICAgY29uc3QgZW5jcnlwdFZlcmlmeSA9ICgpID0+IHVzZUVuY3J5cHQgJiYgZ2V0Q29udGVudFR5cGUoKSAhPT0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcclxuXHJcbi8vICAgY29uc3QgZW5jcnlwdCA9ICh7IHZlcmlmeSA9IGVuY3J5cHRWZXJpZnkgfSA9IHt9KSA9PiB7XHJcbi8vICAgICBpZiAoIXZlcmlmeSgpKSB7XHJcbi8vICAgICAgIHJldHVybiB7XHJcbi8vICAgICAgICAgcGFyYW1zLFxyXG4vLyAgICAgICAgIGhlYWRlcnM6IHt9LFxyXG4vLyAgICAgICB9XHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgcGFyYW1zOiBhZXMuZW5jcnlwdChwYXJhbXMpLFxyXG4vLyAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgc2lnbjogYWVzLmVuY3J5cHQoe1xyXG4vLyAgICAgICAgICAgc2lnblRpbWU6IERhdGUucGFyc2UobmV3IERhdGUoKSksXHJcbi8vICAgICAgICAgfSksXHJcbi8vICAgICAgIH0sXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG5cclxuLy8gICBjb25zdCBkZWNyeXB0VmVyaWZ5ID0gKGRhdGEpID0+IGVuY3J5cHRWZXJpZnkoKSAmJiBpc1N0cmluZyhkYXRhKVxyXG4vLyAgIGNvbnN0IGRlY3J5cHQgPSAoeyBkYXRhLCB2ZXJpZnkgPSBkZWNyeXB0VmVyaWZ5IH0gPSB7fSkgPT4ge1xyXG4vLyAgICAgaWYgKCF2ZXJpZnkoZGF0YSkpIHtcclxuLy8gICAgICAgcmV0dXJuIGRhdGFcclxuLy8gICAgIH1cclxuXHJcbi8vICAgICByZXR1cm4gYWVzLmRlY3J5cHQoZGF0YSlcclxuLy8gICB9XHJcblxyXG4vLyAgIHJldHVybiB7XHJcbi8vICAgICBlbmNyeXB0LFxyXG4vLyAgICAgZGVjcnlwdCxcclxuLy8gICB9XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBiaW5hcnlQYXJzZXIocmVzcG9uc2UsIHsgZGF0YUtleSA9ICdfZGF0YScgfSA9IHt9KSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICAvLyBjb25zb2xlLmxvZygncmVzcG9uc2UnLCByZXNwb25zZSlcclxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZVtkYXRhS2V5XVxyXG4gICAgbGV0IGhlYWRlcnMgPSByZXNwb25zZS5oZWFkZXJzXHJcbiAgICBpZiAoaGVhZGVycy50b1N0cmluZygpID09PSAnW29iamVjdCBIZWFkZXJzXScpIHtcclxuICAgICAgaGVhZGVycyA9IE9iamVjdC5mcm9tRW50cmllcyhoZWFkZXJzLmVudHJpZXMoKSlcclxuICAgICAgLy8gY29uc29sZS5sb2coJ2hlYWRlcnMnLCBoZWFkZXJzKVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXNEYXRhID0gJydcclxuICAgIGxldCBmaWxlTmFtZVxyXG4gICAgaWYgKGhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXSkge1xyXG4gICAgICBmaWxlTmFtZSA9IGhlYWRlcnNbJ2NvbnRlbnQtZGlzcG9zaXRpb24nXS5zcGxpdCgnOycpWzFdLnNwbGl0KCc9JylbMV1cclxuICAgIH1cclxuICAgIGNvbnN0IGJsb2IgPSBkYXRhXHJcbiAgICBpZiAoIWZpbGVOYW1lKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yRGF0YSA9IG5ldyBGaWxlUmVhZGVyKClcclxuICAgICAgZXJyb3JEYXRhLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlbmQnLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICByZXNEYXRhID0gSlNPTi5wYXJzZShkYXRhLnRhcmdldC5yZXN1bHQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICByZXNEYXRhID0gJydcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShyZXNEYXRhKVxyXG4gICAgICB9KVxyXG4gICAgICBlcnJvckRhdGEucmVhZEFzVGV4dChibG9iKVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIHJlc0RhdGEgPSB7XHJcbiAgICAgICAgZmlsZU5hbWU6IHdpbmRvdy5kZWNvZGVVUklDb21wb25lbnQoZmlsZU5hbWUpLFxyXG4gICAgICAgIGJsb2I6IGRhdGEsXHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChibG9iKVxyXG4gICAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcclxuICAgICAgICBjb25zdCBhRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJylcclxuICAgICAgICBhRWwuZG93bmxvYWQgPSB3aW5kb3cuZGVjb2RlVVJJQ29tcG9uZW50KHJlc0RhdGEuZmlsZU5hbWUpXHJcbiAgICAgICAgYUVsLmhyZWYgPSBlLnRhcmdldC5yZXN1bHRcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFFbClcclxuICAgICAgICBhRWwuY2xpY2soKVxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYUVsKVxyXG4gICAgICAgIHJlc0RhdGEgPSB7XHJcbiAgICAgICAgICBjb2RlOiAnMDAwMCcsXHJcbiAgICAgICAgICBtZXNzYWdlOiAnXHU2MjEwXHU1MjlGJyxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzb2x2ZShyZXNEYXRhKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHZpYXJvdGVsXFxcXFBlcnNvbmFsc1xcXFxXb3Jrc1xcXFx2aWFyb3RlbC5naXRodWIuaW9cXFxcc3JjXFxcXHV0aWxzXFxcXHJlcXVlc3RcXFxcb2ZldGNoXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFx1dGlsc1xcXFxyZXF1ZXN0XFxcXG9mZXRjaFxcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdmlhcm90ZWwvUGVyc29uYWxzL1dvcmtzL3ZpYXJvdGVsLmdpdGh1Yi5pby9zcmMvdXRpbHMvcmVxdWVzdC9vZmV0Y2gvaW5kZXguanNcIjtpbXBvcnQgeyBvZmV0Y2ggfSBmcm9tICdvZmV0Y2gnXHJcbmltcG9ydCBxcyBmcm9tICdxcydcclxuaW1wb3J0IHsgYWJvcnRTaWduYWxUaW1lb3V0UG9seWZpbGwgfSBmcm9tICcuLi91dGlscy5qcydcclxuaW1wb3J0IHsgYmFzZVVSTCwgdGltZW91dCB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZ3MvcmVxdWVzdC5qcydcclxuXHJcbmNvbnN0IGRlZmF1bHRDb25maWdzID0ge1xyXG4gIGhlYWRlcnM6IHtcclxuICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JyxcclxuICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoe1xyXG4gIG9uUmVxdWVzdCxcclxuICBvblJlcXVlc3RFcnJvcixcclxuICBvblJlc3BvbnNlLFxyXG4gIG9uUmVzcG9uc2VFcnJvcixcclxufSA9IHt9KSA9PiB7XHJcbiAgLyoqXHJcbiAgICogIFx1OTAxQVx1NzUyOFx1OEJGN1x1NkM0Mlx1NkEyMVx1NTc4QlxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gb3B0aW9uc1xyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAqL1xyXG4gIGNvbnN0IHNlcnZpY2UgPSBhc3luYyAoe1xyXG4gICAgdXJsID0gJycsXHJcbiAgICBtZXRob2QgPSAnUE9TVCcsXHJcbiAgICBoZWFkZXJzID0gZGVmYXVsdENvbmZpZ3MuaGVhZGVycyxcclxuICAgIC4uLm9wdGlvbnNcclxuICB9ID0ge30pID0+IHtcclxuICAgIGFib3J0U2lnbmFsVGltZW91dFBvbHlmaWxsKClcclxuXHJcbiAgICBpZiAobWV0aG9kID09PSAnR0VUJykge1xyXG4gICAgICBkZWxldGUgb3B0aW9ucy5ib2R5XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzID0gYXdhaXQgb2ZldGNoKHVybCwge1xyXG4gICAgICBiYXNlVVJMOiBvcHRpb25zLmJhc2VVUkwgfHwgYmFzZVVSTCxcclxuICAgICAgbWV0aG9kLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgLi4uaGVhZGVycyxcclxuICAgICAgfSxcclxuICAgICAgc2lnbmFsOiBBYm9ydFNpZ25hbC50aW1lb3V0KG9wdGlvbnMudGltZW91dCB8fCB0aW1lb3V0IHx8IDYwICogMTAwMCksXHJcbiAgICAgIC8vIHNpZ25hbDogQWJvcnRTaWduYWwudGltZW91dCg1ICogMTAwMCksXHJcbiAgICAgIG9uUmVxdWVzdDogc2VydmljZS5vblJlcXVlc3QsXHJcbiAgICAgIG9uUmVxdWVzdEVycm9yOiBzZXJ2aWNlLm9uUmVxdWVzdEVycm9yLFxyXG4gICAgICBvblJlc3BvbnNlOiBzZXJ2aWNlLm9uUmVzcG9uc2UsXHJcbiAgICAgIG9uUmVzcG9uc2VFcnJvcjogc2VydmljZS5vblJlc3BvbnNlRXJyb3IsXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9KS5jYXRjaChlcnIgPT4gY29uc29sZS53YXJuKGVycikpXHJcblxyXG4gICAgaWYgKEFib3J0U2lnbmFsLmNsZWFyKVxyXG4gICAgICBBYm9ydFNpZ25hbC5jbGVhcigpXHJcblxyXG4gICAgcmV0dXJuIHJlc1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHU4QkY3XHU2QzQyXHU2MkU2XHU2MjJBXHU1NjY4XHJcbiAgICovXHJcbiAgc2VydmljZS5vblJlcXVlc3QgPSAoeyByZXF1ZXN0LCBvcHRpb25zIH0pID0+IHtcclxuICAgIG9uUmVxdWVzdCh7XHJcbiAgICAgIHVybDogcmVxdWVzdCxcclxuICAgICAgY29uZmlnczogb3B0aW9ucyxcclxuICAgICAgYm9keUtleTogJ2JvZHknLFxyXG4gICAgICBxdWVyeUtleTogJ3F1ZXJ5JyxcclxuICAgIH0pXHJcbiAgICAvLyBcdTg5RTNcdTUxQjNmZXRjaCBHRVRcdThCRjdcdTZDNDIgYm9keSBcdTRFMkRcdTRGMjBcdTUzQzJcdTVCRkNcdTgxRjRcdTYyQTVcdTk1MTlcdTc2ODRcdTk1RUVcdTk4OThcclxuICAgIGlmIChvcHRpb25zLm1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgICAgZGVsZXRlIG9wdGlvbnMuYm9keVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiBcdThCRjdcdTZDNDJcdTU5MzFcdThEMjVcdTYyRTZcdTYyMkFcdTU2NjhcclxuICAgKi9cclxuICBzZXJ2aWNlLm9uUmVxdWVzdEVycm9yID0gKHsgcmVxdWVzdCwgb3B0aW9ucywgZXJyb3IgfSkgPT5cclxuICAgIG9uUmVxdWVzdEVycm9yKHtcclxuICAgICAgdXJsOiByZXF1ZXN0LFxyXG4gICAgICBjb25maWdzOiBvcHRpb25zLFxyXG4gICAgICBib2R5S2V5OiAnYm9keScsXHJcbiAgICAgIHF1ZXJ5S2V5OiAncXVlcnknLFxyXG4gICAgICBlcnJvcixcclxuICAgIH0pXHJcbiAgLyoqXHJcbiAgICogXHU1NENEXHU1RTk0XHU2MkU2XHU2MjJBXHU1NjY4XHJcbiAgICovXHJcbiAgc2VydmljZS5vblJlc3BvbnNlID0gYXN5bmMgKHsgcmVxdWVzdCwgb3B0aW9ucywgcmVzcG9uc2UgfSkgPT5cclxuICAgIG9uUmVzcG9uc2Uoe1xyXG4gICAgICB1cmw6IHJlcXVlc3QsXHJcbiAgICAgIGNvbmZpZ3M6IG9wdGlvbnMsXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBkYXRhS2V5OiAnX2RhdGEnLFxyXG4gICAgfSlcclxuICAvKipcclxuICAgKiBcdTU0Q0RcdTVFOTRcdTU5MzFcdThEMjVcdTYyRTZcdTYyMkFcdTU2NjhcclxuICAgKi9cclxuICBzZXJ2aWNlLm9uUmVzcG9uc2VFcnJvciA9ICh7IHJlcXVlc3QsIG9wdGlvbnMsIHJlc3BvbnNlIH0pID0+XHJcbiAgICBvblJlc3BvbnNlRXJyb3Ioe1xyXG4gICAgICB1cmw6IHJlcXVlc3QsXHJcbiAgICAgIGNvbmZpZ3M6IG9wdGlvbnMsXHJcbiAgICAgIHJlc3BvbnNlLFxyXG4gICAgICBkYXRhS2V5OiAnX2RhdGEnLFxyXG4gICAgfSlcclxuXHJcbiAgLyoqXHJcbiAgICogR0VUIFx1OEJGN1x1NkM0Mlx1NTIyQlx1NTQwRFxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgKi9cclxuICBzZXJ2aWNlLmdldCA9ICh1cmwsIHBhcmFtcywgeyBwYXJhbXNLZXkgPSAncXVlcnknLCAuLi5vcHRpb25zIH0gPSB7fSkgPT5cclxuICAgIHNlcnZpY2Uoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgIFtwYXJhbXNLZXldOiBwYXJhbXMsXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9KVxyXG5cclxuICAvKipcclxuICAgKiBQT1NUIFx1OEJGN1x1NkM0Mlx1NTIyQlx1NTQwRFxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKiBAcGFyYW0gcGFyYW1zXHJcbiAgICogQHBhcmFtIG9wdGlvbnNcclxuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgKi9cclxuICBzZXJ2aWNlLnBvc3QgPSAodXJsLCBwYXJhbXMsIHsgcGFyYW1zS2V5ID0gJ2JvZHknLCAuLi5vcHRpb25zIH0gPSB7fSkgPT5cclxuICAgIHNlcnZpY2Uoe1xyXG4gICAgICB1cmwsXHJcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICBbcGFyYW1zS2V5XTogcGFyYW1zLFxyXG4gICAgICAuLi5vcHRpb25zLFxyXG4gICAgfSlcclxuXHJcbiAgLyoqXHJcbiAgICogXHU0RUU1XHU4ODY4XHU1MzU1XHU1RjYyXHU1RjBGXHU2M0QwXHU0RUE0XHU2NTcwXHU2MzZFXHU1MjJCXHU1NDBEXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqIEBwYXJhbSBwYXJhbXMgXHU4OTgxXHU2M0QwXHU0RUE0XHU3Njg0XHU1M0MyXHU2NTcwKFx1NjU3MFx1NjM2RSlcclxuICAgKiBAcGFyYW0gdXNlRm9ybURhdGEgXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU1QzA2IGRhdGEgXHU4RjZDXHU0RTNBIEZvcm1EYXRhIFx1NjgzQ1x1NUYwRlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAqL1xyXG4gIHNlcnZpY2UuZm9ybSA9IChcclxuICAgIHVybCxcclxuICAgIHBhcmFtcyxcclxuICAgIHsgdXNlRm9ybURhdGEgPSB0cnVlLCBwYXJhbXNLZXkgPSAnYm9keScsIC4uLm9wdGlvbnMgfSA9IHt9LFxyXG4gICkgPT4ge1xyXG4gICAgaWYgKHVzZUZvcm1EYXRhKSB7XHJcbiAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcclxuICAgICAgT2JqZWN0LmVudHJpZXMocGFyYW1zKS5mb3JFYWNoKChba2V5LCB2YWx1ZV0pID0+IHtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSlcclxuICAgICAgfSlcclxuICAgICAgcGFyYW1zID0gZm9ybURhdGFcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VydmljZS5wb3N0KHtcclxuICAgICAgdXJsLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgW3BhcmFtc0tleV06IHBhcmFtcyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgIH0sXHJcbiAgICAgIC4uLm9wdGlvbnMsXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogXHU0RUU1XHU4ODY4XHU1MzU1XHU1NzMwXHU1NzQwXHU2ODBGXHU2N0U1XHU4QkUyXHU1RjYyXHU1RjBGXHU2M0QwXHU0RUE0XHU2NTcwXHU2MzZFXHU1MjJCXHU1NDBEXHJcbiAgICogQHBhcmFtIHVybFxyXG4gICAqIEBwYXJhbSBwYXJhbXMgXHU4OTgxXHU2M0QwXHU0RUE0XHU3Njg0XHU1M0MyXHU2NTcwKFx1NjU3MFx1NjM2RSlcclxuICAgKiBAcGFyYW0gdXNlUXVlcnkgXHU2NjJGXHU1NDI2XHU4MUVBXHU1MkE4XHU1QzA2IGRhdGEgXHU4RjZDXHU0RTNBIEZvcm1EYXRhIFx1NjgzQ1x1NUYwRlxyXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAqL1xyXG4gIHNlcnZpY2UucXVlcnkgPSAoXHJcbiAgICB1cmwsXHJcbiAgICBwYXJhbXMsXHJcbiAgICB7IHVzZVF1ZXJ5ID0gdHJ1ZSwgcGFyYW1zS2V5ID0gJ2JvZHknLCAuLi5vcHRpb25zIH0gPSB7fSxcclxuICApID0+IHtcclxuICAgIGlmICh1c2VRdWVyeSkge1xyXG4gICAgICBjb25zdCBxdWVyeURhdGEgPSBxcy5zdHJpbmdpZnkocGFyYW1zKVxyXG4gICAgICBwYXJhbXMgPSBxdWVyeURhdGFcclxuICAgIH1cclxuICAgIHJldHVybiBzZXJ2aWNlKHtcclxuICAgICAgdXJsLFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgW3BhcmFtc0tleV06IHBhcmFtcyxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICdjb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgfSxcclxuICAgICAgLi4ub3B0aW9ucyxcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2VydmljZVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFxzcmNcXFxcY29uZmlnc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFxzcmNcXFxcY29uZmlnc1xcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdmlhcm90ZWwvUGVyc29uYWxzL1dvcmtzL3ZpYXJvdGVsLmdpdGh1Yi5pby9zcmMvY29uZmlncy9pbmRleC5qc1wiO2NvbnN0IGlzUHJvZHVjdGlvbiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuLy8gY29uc3QgaXNEZXZlbG9wbWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXHJcblxyXG5leHBvcnQgY29uc3QgYXBwTmFtZSA9ICd2aWFyb3RlbCdcclxuZXhwb3J0IGNvbnN0IGFwcEluZm8gPSBbJ1x1NjIxMVx1N0VDRlx1NUUzOFx1NUZEOFx1OEJCMFx1NEUwMFx1NEU5Qlx1NEU4Qlx1RkYwQ1x1NUI4M1x1NEVFQ1x1NzQxMFx1Nzg4RVx1NTM3NFx1OTFDRFx1ODk4MVx1RkYwQ1x1NjIxMVx1NjBGM1x1OEJCMFx1NUY1NVx1NUI4M1x1NEVFQ1x1MzAwMiddXHJcblxyXG4vLyBcdTk4NzlcdTc2RUVcdTU3RkFcdTc4NDBcdThERUZcdTVGODRcclxuZXhwb3J0IGNvbnN0IGFwcEJhc2VQYXRoID0gaXNQcm9kdWN0aW9uID8gJy4vJyA6ICcuLydcclxuLy8gXHU4QkY3XHU2QzQyXHU1NzMwXHU1NzQwXHJcbmV4cG9ydCBjb25zdCByZXF1ZXN0VVJMID0gJydcclxuLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU0RUUzXHU3NDA2XHJcbmV4cG9ydCBjb25zdCB1c2VQcm94eSA9IGZhbHNlXHJcbi8vIFx1NEVFM1x1NzQwNlx1OERFRlx1NUY4NFxyXG5leHBvcnQgY29uc3QgcHJveHlQYXRoID0gJy9wcm94eSdcclxuLy8gXHU0RUUzXHU3NDA2XHU3QUVGXHU1M0UzXHU1M0Y3XHJcbmV4cG9ydCBjb25zdCBwcm94eVBvcnQgPSA4MDg4XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYXBwTmFtZSxcclxuICBhcHBCYXNlUGF0aCxcclxuICByZXF1ZXN0VVJMLFxyXG4gIHVzZVByb3h5LFxyXG4gIHByb3h5UGF0aCxcclxuICBwcm94eVBvcnQsXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFxjb25maWdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFxjb25maWdzXFxcXHJlcXVlc3QuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3ZpYXJvdGVsL1BlcnNvbmFscy9Xb3Jrcy92aWFyb3RlbC5naXRodWIuaW8vc3JjL2NvbmZpZ3MvcmVxdWVzdC5qc1wiO2ltcG9ydCB7IHByb3h5UGF0aCwgcmVxdWVzdFVSTCwgdXNlUHJveHkgfSBmcm9tICcuL2luZGV4J1xyXG5cclxuY29uc3QgaXNEZXZlbG9wbWVudCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXHJcbmxldCB0ZW1wVVJMID0gJydcclxuaWYgKHVzZVByb3h5KSB7XHJcbiAgdGVtcFVSTCA9IGlzRGV2ZWxvcG1lbnQgPyBwcm94eVBhdGggOiB3aW5kb3cubG9jYXRpb24ub3JpZ2luXHJcbn1cclxuZWxzZSB7XHJcbiAgdGVtcFVSTCA9IHJlcXVlc3RVUkxcclxufVxyXG4vLyBcdThCRjdcdTZDNDJcdTU3REZcdTU0MERcclxuZXhwb3J0IGNvbnN0IGJhc2VVUkwgPSB0ZW1wVVJMXHJcbi8vIFx1NTRDRFx1NUU5NFx1NjIxMFx1NTI5RmNvZGVcdTUwM0NcclxuZXhwb3J0IGNvbnN0IHJlc3BvbnNlU3VjY2Vzc0NvZGUgPSAnMDAwMCdcclxuLy8gXHU4RDg1XHU2NUY2XHU2NUY2XHU5NUY0XHJcbmV4cG9ydCBjb25zdCB0aW1lb3V0ID0gNjAgKiAxMDAwXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgYmFzZVVSTCxcclxuICByZXNwb25zZVN1Y2Nlc3NDb2RlLFxyXG4gIHRpbWVvdXQsXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFx1dGlsc1xcXFxyZXF1ZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFx1dGlsc1xcXFxyZXF1ZXN0XFxcXGluZGV4LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aWFyb3RlbC9QZXJzb25hbHMvV29ya3Mvdmlhcm90ZWwuZ2l0aHViLmlvL3NyYy91dGlscy9yZXF1ZXN0L2luZGV4LmpzXCI7aW1wb3J0IHsgYmluYXJ5UGFyc2VyIH0gZnJvbSAnLi91dGlscy5qcydcclxuXHJcbmltcG9ydCByZXF1ZXN0IGZyb20gJy4vb2ZldGNoL2luZGV4LmpzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdCh7XHJcbiAgb25SZXF1ZXN0KHtcclxuICAgIHVybCwgY29uZmlncywgYm9keUtleSA9ICdib2R5JywgcXVlcnlLZXkgPSAncXVlcnknLFxyXG4gIH0gPSB7fSkge1xyXG4gICAgLy8gXHU4OUUzXHU1MUIzXHU0RUMwXHU0RTQ4XHU5MEZEXHU0RTBEXHU0RjIwXHU2N0QwXHU0RTlCXHU2M0E1XHU1M0UzXHU0RjFBXHU2MkE1XHU5NTE5XHU3Njg0XHU5NUVFXHU5ODk4XHJcbiAgICBpZiAoIWNvbmZpZ3NbYm9keUtleV0pIHtcclxuICAgICAgY29uZmlnc1tib2R5S2V5XSA9IHt9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGNvbmZpZ3NbYm9keUtleV1cclxuXHJcbiAgICAvLyBcdTVDMDYgSGVhZGVyc1x1N0M3Qlx1NTc4Qlx1NUJGOVx1OEM2MVx1OEY2Q1x1NjM2Mlx1NEUzQVx1NjY2RVx1OTAxQVx1NUJGOVx1OEM2MVxyXG4gICAgY29uc3QgaGVhZGVycyA9IGNvbmZpZ3MuaGVhZGVycy50b1N0cmluZygpID09PSAnW29iamVjdCBIZWFkZXJzXSdcclxuICAgICAgPyBPYmplY3QuZnJvbUVudHJpZXMoY29uZmlncy5oZWFkZXJzLmVudHJpZXMoKSlcclxuICAgICAgOiBjb25maWdzLmhlYWRlcnNcclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25SZXF1ZXN0LnVybCcsIHVybClcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblJlcXVlc3QuaGVhZGVycycsIGNvbmZpZ3MuaGVhZGVycylcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblJlcXVlc3QuYm9keScsIGJvZHkpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25SZXF1ZXN0LnF1ZXJ5JywgY29uZmlnc1txdWVyeUtleV0pXHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25SZXF1ZXN0LmNvbmZpZ3MnLCBjb25maWdzKVxyXG4gICAgcmV0dXJuIGNvbmZpZ3NcclxuICB9LFxyXG4gIG9uUmVxdWVzdEVycm9yKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnb25SZXF1ZXN0RXJyb3IuZXJyb3InLCBlcnJvcilcclxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcilcclxuICB9LFxyXG4gIGFzeW5jIG9uUmVzcG9uc2Uoe1xyXG4gICAgdXJsLCBjb25maWdzLCByZXNwb25zZSwgZGF0YUtleSA9ICdkYXRhJyxcclxuICB9ID0ge30pIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblJlc3BvbnNlLnJlc3BvbnNlJywgcmVzcG9uc2UpXHJcblxyXG4gICAgLy8gXHU2NTg3XHU0RUY2XHU0RThDXHU4RkRCXHU1MjM2XHU2RDQxXHU1NENEXHU1RTk0XHU1MTY4XHU5MEU4XHU2NTcwXHU2MzZFXHVGRjA4VGlwczpcdTY1ODdcdTRFRjZcdTU0MERcdTU3MjhcdThCRjdcdTZDNDJcdTU5MzRcdTRFMkRcdUZGMDlcclxuICAgIGlmIChjb25maWdzLnJlc3BvbnNlVHlwZSA9PT0gJ2Jsb2InKSB7XHJcbiAgICAgIHJlc3BvbnNlW2RhdGFLZXldID0gYXdhaXQgYmluYXJ5UGFyc2VyKHJlc3BvbnNlLCB7IGRhdGFLZXkgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2VbZGF0YUtleV0gfHwge31cclxuXHJcbiAgICAvLyBcdThCRjdcdTZDNDJcdTU5MzFcdThEMjVcdTY1RjZcdTdFQzhcdTZCNjJcclxuICAgIGlmICghZGF0YT8uY29kZSkge1xyXG4gICAgICByZXR1cm4gcmVzcG9uc2VcclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25SZXNwb25zZS5kYXRhJywgcmVzcG9uc2VbZGF0YUtleV0pXHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlXHJcbiAgfSxcclxuICBvblJlc3BvbnNlRXJyb3IoeyByZXNwb25zZSwgZGF0YUtleSA9ICdkYXRhJyB9ID0ge30pIHtcclxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZVtkYXRhS2V5XVxyXG4gICAgY29uc3Qgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzXHJcbiAgICBjb25zdCBzdGF0dXNUZXh0ID0gcmVzcG9uc2Uuc3RhdHVzVGV4dFxyXG5cclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblJlc3BvbnNlRXJyb3IucmVzcG9uc2UnLCByZXNwb25zZSlcclxuICAgIC8vIGNvbnNvbGUubG9nKCdvblJlc3BvbnNlRXJyb3IuZGF0YScsIHJlc3BvbnNlW2RhdGFLZXldKVxyXG4gICAgLy8gY29uc29sZS5sb2coJ29uUmVzcG9uc2VFcnJvci5zdGF0dXMnLCByZXNwb25zZS5zdGF0dXMpXHJcbiAgICAvLyBjb25zb2xlLmxvZygnb25SZXNwb25zZUVycm9yLnN0YXR1c1RleHQnLCByZXNwb25zZS5zdGF0dXNUZXh0KVxyXG4gIH0sXHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFxzcmNcXFxcYXN5bmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHZpYXJvdGVsXFxcXFBlcnNvbmFsc1xcXFxXb3Jrc1xcXFx2aWFyb3RlbC5naXRodWIuaW9cXFxcc3JjXFxcXGFzeW5jXFxcXHVuZ2guanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3ZpYXJvdGVsL1BlcnNvbmFscy9Xb3Jrcy92aWFyb3RlbC5naXRodWIuaW8vc3JjL2FzeW5jL3VuZ2guanNcIjtpbXBvcnQgcmVxdWVzdCBmcm9tICcuLi91dGlscy9yZXF1ZXN0L2luZGV4J1xyXG5cclxuY29uc3QgYmFzZVVSTCA9ICdodHRwczovL3VuZ2guY2MnXHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRSZXBvcygpIHtcclxuICBjb25zdCByZXMgPSBhd2FpdCByZXF1ZXN0XHJcbiAgICAuZ2V0KGAke2Jhc2VVUkx9L29yZ3Mvdmlhcm90ZWwtb3JnL3JlcG9zYClcclxuICAgIC5jYXRjaChlID0+IGNvbnNvbGUud2FybihlKSlcclxuICByZXR1cm4gcmVzPy5yZXBvcyB8fCBbXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgcmVwb3M6IGF3YWl0IGdldFJlcG9zKCksXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFxhc3luY1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFxzcmNcXFxcYXN5bmNcXFxcaW5kZXguanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3ZpYXJvdGVsL1BlcnNvbmFscy9Xb3Jrcy92aWFyb3RlbC5naXRodWIuaW8vc3JjL2FzeW5jL2luZGV4LmpzXCI7aW1wb3J0IHVuZ2ggZnJvbSAnLi91bmdoJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIC4uLnVuZ2gsXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aWFyb3RlbC9QZXJzb25hbHMvV29ya3Mvdmlhcm90ZWwuZ2l0aHViLmlvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgdXNlUmVtb3ZlQ29uc29sZSBmcm9tICd2aXRlLXBsdWdpbi1yZW1vdmUtY29uc29sZSdcclxuaW1wb3J0IHVzZUVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXHJcbmltcG9ydCB1c2VVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCByZXdyaXRlcyBmcm9tICcuL3NyYy9yZXdyaXRlcy9pbmRleC5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwbHVnaW5zOiBbdXNlUmVtb3ZlQ29uc29sZSgpLCB1c2VFc2xpbnQoeyBmaXg6IHRydWUgfSksIHVzZVVub0NTUygpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAuLi5yZXdyaXRlcyxcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBwcm94eToge30sXHJcbiAgfSxcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHZpYXJvdGVsXFxcXFBlcnNvbmFsc1xcXFxXb3Jrc1xcXFx2aWFyb3RlbC5naXRodWIuaW9cXFxcc3JjXFxcXHJld3JpdGVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXHNyY1xcXFxyZXdyaXRlc1xcXFxpbmRleC5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovdmlhcm90ZWwvUGVyc29uYWxzL1dvcmtzL3ZpYXJvdGVsLmdpdGh1Yi5pby9zcmMvcmV3cml0ZXMvaW5kZXguanNcIjtpbXBvcnQgeyBVUkwsIGZpbGVVUkxUb1BhdGggfSBmcm9tICdub2RlOnVybCdcclxuXHJcbmNvbnN0IGltcG9ydENvbXBvbmVudCA9IHBhdGggPT4gZmlsZVVSTFRvUGF0aChuZXcgVVJMKHBhdGgsIGltcG9ydC5tZXRhLnVybCkpXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgJy4vVlBIb21lSGVyby52dWUnOiBpbXBvcnRDb21wb25lbnQoJy4vY29tcG9uZW50cy9WUEhvbWVIZXJvL2luZGV4LnZ1ZScpLFxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcdmlhcm90ZWxcXFxcUGVyc29uYWxzXFxcXFdvcmtzXFxcXHZpYXJvdGVsLmdpdGh1Yi5pb1xcXFwudml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx2aWFyb3RlbFxcXFxQZXJzb25hbHNcXFxcV29ya3NcXFxcdmlhcm90ZWwuZ2l0aHViLmlvXFxcXC52aXRlcHJlc3NcXFxcY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi92aWFyb3RlbC9QZXJzb25hbHMvV29ya3Mvdmlhcm90ZWwuZ2l0aHViLmlvLy52aXRlcHJlc3MvY29uZmlnLmpzXCI7aW1wb3J0IHZpdGVwcmVzcyBmcm9tICcuLi92aXRlcHJlc3MuY29uZmlnLmpzJ1xyXG5pbXBvcnQgdml0ZSBmcm9tICcuLi92aXRlLmNvbmZpZy5qcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAuLi52aXRlcHJlc3MsXHJcbiAgdml0ZSxcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBR0EsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxXQUFXOzs7QUNHWCxTQUFTLDZCQUE2QjtBQUMzQyxNQUFJLFlBQVksU0FBUztBQUN2QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFFBQVE7QUFDWixRQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFFdkMsY0FBWSxVQUFVLENBQUMsVUFBVTtBQUMvQixZQUFRLFdBQVcsTUFBTSxXQUFXLE1BQU0sR0FBRyxLQUFLO0FBQ2xELFdBQU8sV0FBVztBQUFBLEVBQ3BCO0FBQ0EsY0FBWSxRQUFRLE1BQU07QUFDeEIsaUJBQWEsS0FBSztBQUFBLEVBQ3BCO0FBQ0Y7QUE0Q0EsZUFBc0IsYUFBYSxVQUFVLEVBQUUsVUFBVSxRQUFRLElBQUksQ0FBQyxHQUFHO0FBQ3ZFLFNBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUU5QixVQUFNLE9BQU8sU0FBUyxPQUFPO0FBQzdCLFFBQUksVUFBVSxTQUFTO0FBQ3ZCLFFBQUksUUFBUSxTQUFTLE1BQU0sb0JBQW9CO0FBQzdDLGdCQUFVLE9BQU8sWUFBWSxRQUFRLFFBQVEsQ0FBQztBQUFBLElBRWhEO0FBRUEsUUFBSSxVQUFVO0FBQ2QsUUFBSTtBQUNKLFFBQUksUUFBUSxxQkFBcUIsR0FBRztBQUNsQyxpQkFBVyxRQUFRLHFCQUFxQixFQUFFLE1BQU0sR0FBRyxFQUFFLENB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LFFBQVEsTUFBTSxPQUFPO0FBQUEsVUFDN0IsRUFBRSxNQUFNLFFBQVEsTUFBTSxZQUFZO0FBQUEsVUFDbEMsRUFBRSxNQUFNLGFBQWEsTUFBTSxhQUFhO0FBQUEsVUFDeEMsRUFBRSxNQUFNLFlBQVksTUFBTSxZQUFZO0FBQUEsUUFDeEM7QUFBQSxRQUNBLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPLENBQUMsRUFBRSxNQUFNLFdBQVcsTUFBTSxZQUFZLEdBQUcsR0FBRyxJQUFJO0FBQUEsVUFDekQ7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sU0FBUyxNQUFNLFlBQVk7QUFBQSxjQUNuQyxFQUFFLE1BQU0sV0FBVyxNQUFNLGNBQWM7QUFBQSxjQUN2QyxFQUFFLE1BQU0sYUFBYSxNQUFNLGFBQWE7QUFBQSxZQUMxQztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxhQUFhO0FBQ2Y7OztBUXROc1UsT0FBTyxVQUFVO0FBQ3ZWLE9BQU8sc0JBQXNCO0FBQzdCLE9BQU8sZUFBZTtBQUN0QixPQUFPLGVBQWU7OztBQ0grVSxTQUFTLEtBQUsscUJBQXFCO0FBQW5LLElBQU0sMkNBQTJDO0FBRXRSLElBQU0sa0JBQWtCLENBQUFDLFVBQVEsY0FBYyxJQUFJLElBQUlBLE9BQU0sd0NBQWUsQ0FBQztBQUU1RSxJQUFPLG1CQUFRO0FBQUEsRUFDYixvQkFBb0IsZ0JBQWdCLG1DQUFtQztBQUN6RTs7O0FETkEsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUTtBQUFBLEVBQ2IsU0FBUyxDQUFDLGlCQUFpQixHQUFHLFVBQVUsRUFBRSxLQUFLLEtBQUssQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUFBLEVBQ25FLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEdBQUc7QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLGtDQUFXLFFBQVE7QUFBQSxJQUN2QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE9BQU8sQ0FBQztBQUFBLEVBQ1Y7QUFDRjs7O0FFZEEsSUFBTyxpQkFBUTtBQUFBLEVBQ2IsR0FBRztBQUFBLEVBQ0g7QUFDRjsiLAogICJuYW1lcyI6IFsiZGF0YSIsICJiYXNlVVJMIiwgIl9hIiwgInBhdGgiXQp9Cg==
