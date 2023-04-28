import { ofetch } from 'ofetch'
import qs from 'qs'
import { abortSignalTimeoutPolyfill } from '../utils.js'
import { baseURL, timeout } from '../../../configs/request.js'

const defaultConfigs = {
  headers: {
    'content-type': 'application/json;charset=utf-8',
  },
}

export default ({
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} = {}) => {
  /**
   *  通用请求模型
   * @param url
   * @param options
   * @returns {Promise}
   */
  const service = async ({
    url = '',
    method = 'POST',
    headers = defaultConfigs.headers,
    ...options
  } = {}) => {
    abortSignalTimeoutPolyfill()

    if (method === 'GET') {
      delete options.body
    }

    const res = await ofetch(url, {
      baseURL: options.baseURL || baseURL,
      method,
      headers: {
        ...headers,
      },
      signal: AbortSignal.timeout(options.timeout || timeout || 60 * 1000),
      // signal: AbortSignal.timeout(5 * 1000),
      onRequest: service.onRequest,
      onRequestError: service.onRequestError,
      onResponse: service.onResponse,
      onResponseError: service.onResponseError,
      ...options,
    }).catch((err) => console.warn(err))

    if (AbortSignal.clear) AbortSignal.clear()

    return res
  }

  /**
   * 请求拦截器
   */
  service.onRequest = ({ request, options }) => {
    onRequest({
      url: request,
      configs: options,
      bodyKey: 'body',
      queryKey: 'query',
    })
    // 解决fetch GET请求 body 中传参导致报错的问题
    if (options.method === 'GET') {
      delete options.body
    }
  }
  /**
   * 请求失败拦截器
   */
  service.onRequestError = ({ request, options, error }) =>
    onRequestError({
      url: request,
      configs: options,
      bodyKey: 'body',
      queryKey: 'query',
      error,
    })
  /**
   * 响应拦截器
   */
  service.onResponse = async ({ request, options, response }) =>
    onResponse({
      url: request,
      configs: options,
      response,
      dataKey: '_data',
    })
  /**
   * 响应失败拦截器
   */
  service.onResponseError = ({ request, options, response }) =>
    onResponseError({
      url: request,
      configs: options,
      response,
      dataKey: '_data',
    })

  /**
   * GET 请求别名
   * @param url
   * @param params
   * @param options
   * @returns {Promise}
   */
  service.get = (url, params, { paramsKey = 'query', ...options } = {}) =>
    service({
      url,
      method: 'GET',
      [paramsKey]: params,
      ...options,
    })

  /**
   * POST 请求别名
   * @param url
   * @param params
   * @param options
   * @returns {Promise}
   */
  service.post = (url, params, { paramsKey = 'body', ...options } = {}) =>
    service({
      url,
      method: 'POST',
      [paramsKey]: params,
      ...options,
    })

  /**
   * 以表单形式提交数据别名
   * @param url
   * @param params 要提交的参数(数据)
   * @param useFormData 是否自动将 data 转为 FormData 格式
   * @returns {Promise}
   */
  service.form = (
    url,
    params,
    { useFormData = true, paramsKey = 'body', ...options } = {},
  ) => {
    if (useFormData) {
      const formData = new FormData()
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value)
      })
      params = formData
    }

    return service.post({
      url,
      method: 'POST',
      [paramsKey]: params,
      headers: {
        'content-type': 'multipart/form-data',
      },
      ...options,
    })
  }

  /**
   * 以表单地址栏查询形式提交数据别名
   * @param url
   * @param params 要提交的参数(数据)
   * @param useQuery 是否自动将 data 转为 FormData 格式
   * @returns {Promise}
   */
  service.query = (
    url,
    params,
    { useQuery = true, paramsKey = 'body', ...options } = {},
  ) => {
    if (useQuery) {
      const queryData = qs.stringify(params)
      params = queryData
    }
    return service({
      url,
      method: 'POST',
      [paramsKey]: params,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...options,
    })
  }

  return service
}
