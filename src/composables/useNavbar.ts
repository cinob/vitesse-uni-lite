export interface MenuButtonInfo {
  top: number
  bottom: number
  height: number
  left: number
  right: number
  width: number
}

/**
 * 跨端胶囊与状态栏自适应计算
 */
export function useNavbar() {
  const systemInfo = uni.getSystemInfoSync()
  const statusBarHeight = systemInfo.statusBarHeight || 20

  let menuButtonInfo: MenuButtonInfo = {
    top: statusBarHeight + 4,
    bottom: statusBarHeight + 36,
    height: 32,
    left: (systemInfo.windowWidth || 375) - 95,
    right: (systemInfo.windowWidth || 375) - 7,
    width: 88,
  }

  // #ifndef H5 || APP-PLUS
  try {
    const rect = uni.getMenuButtonBoundingClientRect()
    if (rect && rect.height > 0)
      menuButtonInfo = rect
  }
  catch {}
  // #endif

  const navPaddingTop = menuButtonInfo.top
  const navHeight = menuButtonInfo.height
  const navBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height
  const navTotalHeight = statusBarHeight + navBarHeight
  const navRightPadding = systemInfo.windowWidth ? systemInfo.windowWidth - menuButtonInfo.left + 8 : 16

  return {
    statusBarHeight,
    navPaddingTop,
    navHeight,
    navBarHeight,
    navTotalHeight,
    navRightPadding,
    menuButtonInfo,
    windowWidth: systemInfo.windowWidth || 375,
    windowHeight: systemInfo.windowHeight || 667,
  }
}
