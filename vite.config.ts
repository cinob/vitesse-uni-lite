import { resolve } from 'node:path'
import uni from '@dcloudio/vite-plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    AutoImport({
      dts: './types/auto-imports.d.ts',
      imports: [
        'vue',
        'uni-app',
      ],
      dirs: [
        './src/composables',
        './src/utils',
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    UniComponents({
      dts: './src/components.d.ts',
      directoryAsNamespace: true,
    }),
    (uni as any).default(),
    Unocss(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
})
