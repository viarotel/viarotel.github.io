import { requestURL, proxyPath, useProxy } from './index'

const isDevelopment = process.env.NODE_ENV === 'development'
let tempURL = ''
if (useProxy) {
  tempURL = isDevelopment ? proxyPath : window.location.origin
} else {
  tempURL = requestURL
}
// 请求域名
export const baseURL = tempURL
// 响应成功code值
export const responseSuccessCode = '0000'
// 超时时间
export const timeout = 60 * 1000

export default {
  baseURL,
  responseSuccessCode,
  timeout,
}
