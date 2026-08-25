export interface ToastOptions {
  title: string
  icon?: 'success' | 'loading' | 'error' | 'none'
  image?: string
  duration?: number
  mask?: boolean
}

export function showToast(titleOrOptions: string | ToastOptions) {
  if (typeof titleOrOptions === 'string') {
    uni.showToast({
      title: titleOrOptions,
      icon: 'none',
      duration: 2000,
    })
    return
  }

  uni.showToast({
    duration: 2000,
    icon: 'none',
    ...titleOrOptions,
  })
}

export function showSuccessToast(title: string, duration = 2000) {
  uni.showToast({
    title,
    icon: 'success',
    duration,
  })
}

export function showLoadingToast(title = '加载中...', mask = true) {
  uni.showLoading({
    title,
    mask,
  })
}

export function hideToast() {
  uni.hideToast()
}

export function hideLoading() {
  uni.hideLoading()
}
