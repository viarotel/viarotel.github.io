const isProduction = process.env.NODE_ENV === 'production'
// const isDevelopment = process.env.NODE_ENV === 'development'

export const appName = 'viarotel'
export const appInfo = ['我经常忘记一些事，它们琐碎却重要，我想记录它们。']

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

export default {
  appName,
  appBasePath,
  requestURL,
  useProxy,
  proxyPath,
  proxyPort,
}
