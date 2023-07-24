import { binaryParser } from './utils.js'

import request from './ofetch/index.js'

export default request({
  onRequest({
    url, configs, bodyKey = 'body', queryKey = 'query',
  } = {}) {
    // 解决什么都不传某些接口会报错的问题
    if (!configs[bodyKey]) {
      configs[bodyKey] = {}
    }

    const body = configs[bodyKey]

    // 将 Headers类型对象转换为普通对象
    const headers = configs.headers.toString() === '[object Headers]'
      ? Object.fromEntries(configs.headers.entries())
      : configs.headers

    // console.log('onRequest.url', url)
    // console.log('onRequest.headers', configs.headers)
    // console.log('onRequest.body', body)
    // console.log('onRequest.query', configs[queryKey])
    // console.log('onRequest.configs', configs)
    return configs
  },
  onRequestError(error) {
    console.log('onRequestError.error', error)
    return Promise.reject(error)
  },
  async onResponse({
    url, configs, response, dataKey = 'data',
  } = {}) {
    // console.log('onResponse.response', response)

    // 文件二进制流响应全部数据（Tips:文件名在请求头中）
    if (configs.responseType === 'blob') {
      response[dataKey] = await binaryParser(response, { dataKey })
    }

    const data = response[dataKey] || {}

    // 请求失败时终止
    if (!data?.code) {
      return response
    }

    // console.log('onResponse.data', response[dataKey])

    return response
  },
  onResponseError({ response, dataKey = 'data' } = {}) {
    const data = response[dataKey]
    const status = response.status
    const statusText = response.statusText

    // console.log('onResponseError.response', response)
    // console.log('onResponseError.data', response[dataKey])
    // console.log('onResponseError.status', response.status)
    // console.log('onResponseError.statusText', response.statusText)
  },
})
