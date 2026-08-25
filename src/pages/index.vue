<script setup lang="ts">
import { ref } from 'vue'

// 交互演示状态
const toastTypes = [
  { label: '普通提示', action: () => showToast('轻提示已触发') },
  { label: '成功提示', action: () => showSuccessToast('操作成功') },
  {
    label: '加载提示',
    action: () => {
      showLoadingToast('加载中...')
      setTimeout(() => hideLoading(), 1500)
    },
  },
]

const envInfo = ref({
  platform: uni.getSystemInfoSync().platform,
  uniPlatform: uni.getSystemInfoSync().uniPlatform || 'mp-weixin',
})
</script>

<template>
  <AppLayout title="vitesse-uni-lite" :show-back="false">
    <view class="flex flex-col items-center py-16px">
      <!-- 品牌徽标与名称 -->
      <view class="circle-64 flex-center bg-blue-500/10 text-32px text-blue-500 font-bold shadow-sm">
        ⚡️
      </view>

      <text class="mt-14px text-22px text-gray-900 font-bold tracking-tight">
        vitesse-uni-lite
      </text>
      <text class="mt-6px px-20px text-center text-13px text-gray-600 leading-relaxed">
        极简、现代、类型安全的 UniApp + Vue 3 + UnoCSS 起手模板
      </text>

      <!-- 平台与环境信息 -->
      <view class="mt-16px flex items-center gap-8px rounded-full bg-white px-12px py-4px text-11px text-gray-400 shadow-sm">
        <text class="circle-6 bg-green-500" />
        <text>当前运行环境: {{ envInfo.uniPlatform }} ({{ envInfo.platform }})</text>
      </view>

      <!-- 核心特性卡片 -->
      <view class="mt-20px w-full flex flex-col gap-12px">
        <view class="rounded-16px bg-white p-16px shadow-sm">
          <view class="flex items-center gap-6px text-15px text-gray-900 font-semibold">
            <text>✨</text>
            <text>工程化核心特性</text>
          </view>

          <view class="mt-12px flex flex-col gap-10px text-13px text-gray-600">
            <view class="flex items-start gap-8px">
              <text class="mt-2px text-green-500 font-bold">
                ✓
              </text>
              <view class="flex flex-col">
                <text class="text-gray-900 font-medium">
                  Vite 5 + Vue 3.5+ + TypeScript
                </text>
                <text class="text-12px text-gray-400">
                  严格类型检查，支持组合式 API 与最新语法糖
                </text>
              </view>
            </view>

            <view class="flex items-start gap-8px">
              <text class="mt-2px text-green-500 font-bold">
                ✓
              </text>
              <view class="flex flex-col">
                <text class="text-gray-900 font-medium">
                  UnoCSS 小程序深度预设
                </text>
                <text class="text-12px text-gray-400">
                  采用 unocss-preset-weapp，零样式丢失，构建极速
                </text>
              </view>
            </view>

            <view class="flex items-start gap-8px">
              <text class="mt-2px text-green-500 font-bold">
                ✓
              </text>
              <view class="flex flex-col">
                <text class="text-gray-900 font-medium">
                  自动按需导入 (Auto Imports)
                </text>
                <text class="text-12px text-gray-400">
                  Vue / UniApp API、Composables 与通用组件无需手动 import
                </text>
              </view>
            </view>

            <view class="flex items-start gap-8px">
              <text class="mt-2px text-green-500 font-bold">
                ✓
              </text>
              <view class="flex flex-col">
                <text class="text-gray-900 font-medium">
                  多端胶囊与安全区自适应
                </text>
                <text class="text-12px text-gray-400">
                  提供 AppLayout 与 useNavbar，适配刘海屏及微信/支付宝胶囊
                </text>
              </view>
            </view>

            <view class="flex items-start gap-8px">
              <text class="mt-2px text-green-500 font-bold">
                ✓
              </text>
              <view class="flex flex-col">
                <text class="text-gray-900 font-medium">
                  通用请求 & 本地存储安全封装
                </text>
                <text class="text-12px text-gray-400">
                  基于 Promise 的泛型 request/uploadFile 与类型安全 storage
                </text>
              </view>
            </view>
          </view>
        </view>

        <!-- 基础交互验证体验 -->
        <view class="rounded-16px bg-white p-16px shadow-sm">
          <view class="flex items-center gap-6px text-15px text-gray-900 font-semibold">
            <text>🛠️</text>
            <text>通用能力快速体验</text>
          </view>
          <text class="mt-4px block text-12px text-gray-400">
            测试内置通用工具函数（自动导入生效验证）
          </text>

          <view class="mt-12px flex flex-wrap gap-8px">
            <button
              v-for="item in toastTypes"
              :key="item.label"
              class="m-0 rounded-8px border-none bg-blue-500/10 px-12px py-6px text-12px text-blue-500 font-medium after:border-none hover:bg-blue-500/20 active:opacity-80"
              @tap="item.action"
            >
              {{ item.label }}
            </button>
          </view>
        </view>

        <!-- 起步提示 -->
        <view class="border border-gray-200 rounded-12px border-dashed p-14px text-center text-12px text-gray-400 leading-relaxed">
          💡 编辑 <text class="text-gray-900 font-mono">
            src/pages/index.vue
          </text> 即可快速开启您的业务开发。
        </view>
      </view>
    </view>
  </AppLayout>
</template>
