const TOKEN_KEY = 'auth_token'

/**
 * 安全读取本地 Storage（兼容对象和 JSON 字符串）
 */
export function getStorage<T = unknown>(key: string, defaultValue?: T): T | undefined {
  try {
    const value = uni.getStorageSync(key)
    if (value === '' || value === undefined || value === null)
      return defaultValue

    if (typeof value === 'string') {
      try {
        return JSON.parse(value) as T
      }
      catch {
        return value as unknown as T
      }
    }
    return value as T
  }
  catch {
    return defaultValue
  }
}

/**
 * 安全设置本地 Storage
 */
export function setStorage(key: string, value: unknown) {
  try {
    const payload = typeof value === 'object' && value !== null ? JSON.stringify(value) : value
    uni.setStorageSync(key, payload)
  }
  catch {}
}

/**
 * 移除本地 Storage
 */
export function removeStorage(key: string) {
  try {
    uni.removeStorageSync(key)
  }
  catch {}
}

/**
 * 获取持久化 Token
 */
export function getStoredToken(): string {
  return getStorage<string>(TOKEN_KEY, '') || ''
}

/**
 * 设置持久化 Token
 */
export function setStoredToken(token: string) {
  setStorage(TOKEN_KEY, token)
}

/**
 * 清除持久化 Token
 */
export function clearStoredToken() {
  removeStorage(TOKEN_KEY)
}
