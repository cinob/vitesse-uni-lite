import { getStoredToken } from './storage'
import { showToast } from './toast'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

const DEFAULT_TIMEOUT = 15000

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'HEAD' | 'OPTIONS' | 'TRACE'

export interface RequestOptions {
  url: string
  method?: HttpMethod
  data?: unknown
  header?: Record<string, string>
  timeout?: number
  loading?: boolean
  loadingTitle?: string
  baseURL?: string
  showErrorToast?: boolean
}

export interface UploadFileOptions {
  url: string
  filePath: string
  name?: string
  formData?: Record<string, unknown>
  header?: Record<string, string>
  timeout?: number
  loading?: boolean
  loadingTitle?: string
  baseURL?: string
  showErrorToast?: boolean
}

export class RequestError extends Error {
  statusCode?: number
  response?: unknown
  original?: unknown

  constructor(message: string, options: Pick<RequestError, 'statusCode' | 'response' | 'original'> = {}) {
    super(message)
    this.name = 'RequestError'
    Object.assign(this, options)
  }
}

function resolveUrl(baseURL: string, url: string) {
  if (/^https?:\/\//.test(url))
    return url
  return `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}`
}

export function request<T = unknown>(options: RequestOptions): Promise<T> {
  const {
    url,
    method = 'GET',
    data,
    header = {},
    timeout = DEFAULT_TIMEOUT,
    loading = false,
    loadingTitle = '加载中...',
    baseURL = API_BASE_URL,
    showErrorToast = true,
  } = options

  if (loading) {
    uni.showLoading({
      title: loadingTitle,
      mask: true,
    })
  }

  const token = getStoredToken()
  const requestHeader: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...header,
  }

  return new Promise((resolve, reject) => {
    uni.request({
      url: resolveUrl(baseURL, url),
      method: method as any,
      data: data as any,
      timeout,
      header: requestHeader,
      success: (res) => {
        if (loading)
          uni.hideLoading()

        if (res.statusCode < 200 || res.statusCode >= 300) {
          const message = `请求失败 (${res.statusCode})`
          if (showErrorToast)
            showToast(message)
          reject(new RequestError(message, { statusCode: res.statusCode, response: res }))
          return
        }

        resolve(res.data as T)
      },
      fail: (err) => {
        if (loading)
          uni.hideLoading()

        const message = '网络连接异常，请重试'
        if (showErrorToast)
          showToast(message)
        reject(new RequestError(message, { original: err }))
      },
    })
  })
}

export function uploadFile<T = unknown>(options: UploadFileOptions): Promise<T> {
  const {
    url,
    filePath,
    name = 'file',
    formData,
    header = {},
    timeout = DEFAULT_TIMEOUT,
    loading = false,
    loadingTitle = '上传中...',
    baseURL = API_BASE_URL,
    showErrorToast = true,
  } = options

  if (loading) {
    uni.showLoading({
      title: loadingTitle,
      mask: true,
    })
  }

  const token = getStoredToken()
  const requestHeader: Record<string, string> = {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...header,
  }

  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: resolveUrl(baseURL, url),
      filePath,
      name,
      formData,
      timeout,
      header: requestHeader,
      success: (res) => {
        if (loading)
          uni.hideLoading()

        if (res.statusCode < 200 || res.statusCode >= 300) {
          const message = `上传失败 (${res.statusCode})`
          if (showErrorToast)
            showToast(message)
          reject(new RequestError(message, { statusCode: res.statusCode, response: res }))
          return
        }

        let parsedData: unknown = res.data
        if (typeof res.data === 'string') {
          try {
            parsedData = JSON.parse(res.data)
          }
          catch {}
        }

        resolve(parsedData as T)
      },
      fail: (err) => {
        if (loading)
          uni.hideLoading()

        const message = '网络异常，上传失败'
        if (showErrorToast)
          showToast(message)
        reject(new RequestError(message, { original: err }))
      },
    })
  })
}
