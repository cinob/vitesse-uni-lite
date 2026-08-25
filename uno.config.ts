import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetWeapp } from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default defineConfig({
  theme: {
    fontFamily: {
      sans: 'DM Sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
  },
  presets: [
    presetWeapp(),
    presetWeappAttributify() as any,
  ],
  shortcuts: [
    // 常用布局与居中快捷方式
    ['flex-center', 'flex items-center justify-center'],

    // 动态尺寸与形状支持: s-20_20 -> w-20 h-20, square-32 -> w-32 h-32
    [/^s-([^_]+)_([^_]+)$/i, ([, w, h]) => `w-${w} h-${h}`],
    [/^square-([^_]+)$/i, ([, size]) => `s-${size}_${size}`],
    [/^circle-([^_]+)$/i, ([, size]) => `square-${size} rounded-full`],

    // 常用页面与安全区域
    ['app-page', 'min-h-100vh bg-gray-50 text-gray-900 box-border'],
    ['pb-safe', 'pb-[calc(env(safe-area-inset-bottom)+16px)]'],
    ['pt-safe', 'pt-[env(safe-area-inset-top)]'],
  ],
  rules: [
    // 文本单行/多行溢出省略
    [/^line-clamp-(\d+)$/, ([, lines]) => Number(lines) === 1
      ? {
          'display': 'block',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
        }
      : {
          'display': '-webkit-box',
          'overflow': 'hidden',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': lines,
          'text-overflow': 'ellipsis',
        }],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    transformerAttributify() as any,
    transformerClass(),
  ],
})
