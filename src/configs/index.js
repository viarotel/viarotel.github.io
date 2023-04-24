const isProduction = process.env.NODE_ENV === 'production'
// const isDevelopment = process.env.NODE_ENV === 'development'

export const title = 'viarotel'

// 项目基础路径
export const appBasePath = isProduction ? './' : './'
// 请求地址
export const requestURL = ''
// 是否开启代理
export const useProxy = false
// 代理路径
export const proxyPath = '/proxy'
// 代理端口号
export const proxyPort = 8088

// 谷歌分析
export const GoogleAnalyticsId = 'G-24PQ0ZF4RG'

export default {
  title,
  appBasePath,
  requestURL,
  useProxy,
  proxyPath,
  proxyPort,
}
