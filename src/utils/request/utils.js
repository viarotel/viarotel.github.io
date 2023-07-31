// import { isString } from 'lodash-es'
// import { aes } from '@/utils/encrypt'
// import { useEncrypt } from '@/configs/request.js'

/**
 * 用于兼容低版本浏览器不支持 AbortSignal API 以实现超时
 */
export function abortSignalTimeoutPolyfill() {
  if (AbortSignal.timeout) {
    return
  }

  let timer = null
  const controller = new AbortController()

  AbortSignal.timeout = (value) => {
    timer = setTimeout(() => controller.abort(), value)
    return controller.signal
  }
  AbortSignal.clear = () => {
    clearTimeout(timer)
  }
}

// /**
//  * 数据加密帮助程序
//  * @returns
//  */
// export const aesHelper = ({ params, headers } = {}) => {
//   const getContentType = () => headers?.['Content-Type'] || headers?.['content-type']

//   const encryptVerify = () => useEncrypt && getContentType() !== 'application/x-www-form-urlencoded'

//   const encrypt = ({ verify = encryptVerify } = {}) => {
//     if (!verify()) {
//       return {
//         params,
//         headers: {},
//       }
//     }

//     return {
//       params: aes.encrypt(params),
//       headers: {
//         sign: aes.encrypt({
//           signTime: Date.parse(new Date()),
//         }),
//       },
//     }
//   }

//   const decryptVerify = (data) => encryptVerify() && isString(data)
//   const decrypt = ({ data, verify = decryptVerify } = {}) => {
//     if (!verify(data)) {
//       return data
//     }

//     return aes.decrypt(data)
//   }

//   return {
//     encrypt,
//     decrypt,
//   }
// }

export async function binaryParser(response, { dataKey = '_data' } = {}) {
  return new Promise((resolve) => {
    // console.log('response', response)
    const data = response[dataKey]
    let headers = response.headers
    if (headers.toString() === '[object Headers]') {
      headers = Object.fromEntries(headers.entries())
      // console.log('headers', headers)
    }

    let resData = ''
    let fileName
    if (headers['content-disposition']) {
      fileName = headers['content-disposition'].split(';')[1].split('=')[1]
    }
    const blob = data
    if (!fileName) {
      const errorData = new FileReader()
      errorData.addEventListener('loadend', (data) => {
        try {
          resData = JSON.parse(data.target.result)
        }
        catch (e) {
          resData = ''
        }
        resolve(resData)
      })
      errorData.readAsText(blob)
    }
    else {
      resData = {
        fileName: window.decodeURIComponent(fileName),
        blob: data,
      }
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = (e) => {
        const aEl = document.createElement('a')
        aEl.download = window.decodeURIComponent(resData.fileName)
        aEl.href = e.target.result
        document.body.appendChild(aEl)
        aEl.click()
        document.body.removeChild(aEl)
        resData = {
          code: '0000',
          message: '成功',
        }
        resolve(resData)
      }
    }
  })
}
