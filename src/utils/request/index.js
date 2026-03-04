const DEFAULT_TIMEOUT = 15000
const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function buildUrl(baseUrl, url) {
  if (/^https?:\/\//.test(url)) return url
  return `${baseUrl}${url}`
}

class HttpClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || ''
    this.timeout = config.timeout || DEFAULT_TIMEOUT
  }

  request(options) {
    const { url, method = 'GET', data, header = {}, timeout } = options
    const token = uni.getStorageSync('token')

    const requestHeader = {
      'Content-Type': 'application/json',
      ...header,
    }

    if (token) {
      requestHeader.Authorization = `Bearer ${token}`
    }

    return new Promise((resolve, reject) => {
      uni.request({
        url: buildUrl(this.baseURL, url),
        method,
        data,
        header: requestHeader,
        timeout: timeout || this.timeout,
        success: (res) => {
          const { statusCode, data: responseData } = res
          if (statusCode >= 200 && statusCode < 300) {
            resolve(responseData)
            return
          }

          if (statusCode === 401) {
            uni.removeStorageSync('token')
          }

          reject({
            statusCode,
            data: responseData,
            message: responseData?.message || 'Request failed',
          })
        },
        fail: (error) => {
          reject(error)
        },
      })
    })
  }

  get(url, data, options = {}) {
    return this.request({ url, method: 'GET', data, ...options })
  }

  post(url, data, options = {}) {
    return this.request({ url, method: 'POST', data, ...options })
  }

  put(url, data, options = {}) {
    return this.request({ url, method: 'PUT', data, ...options })
  }

  delete(url, data, options = {}) {
    return this.request({ url, method: 'DELETE', data, ...options })
  }
}

const http = new HttpClient({
  baseURL: BASE_URL,
  timeout: DEFAULT_TIMEOUT,
})

export { HttpClient, http }
export default http
