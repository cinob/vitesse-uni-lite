<script setup lang="ts">
import type { ButtonOpenType } from '@uni-helper/uni-app-types'

defineOptions({
  options: {
    virtualHost: true,
    mergeVirtualHostAttributes: true,
  },
})

withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  openType?: ButtonOpenType
}>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  openType: undefined,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    class="box-border inline-flex select-none items-center justify-center font-medium transition-all"
    :open-type="openType"
    :disabled="disabled || loading"
    :class="[
      block ? 'w-full' : '',
      // 尺寸
      size === 'lg' && 'h-48px px-24px rounded-24px text-16px gap-8px',
      size === 'md' && 'h-40px px-18px rounded-20px text-14px gap-6px',
      size === 'sm' && 'h-32px px-12px rounded-16px text-13px gap-4px',
      size === 'xs' && 'h-26px px-8px rounded-13px text-12px gap-2px',

      // 风格变体
      variant === 'primary' && 'bg-blue-500 text-white active:opacity-90',
      variant === 'secondary' && 'bg-gray-100 text-gray-900 active:bg-gray-200',
      variant === 'outline' && 'b-1px b-solid b-blue-500 bg-transparent text-blue-500 active:bg-blue-500/5',
      variant === 'text' && 'bg-transparent text-blue-500 active:opacity-75',

      // 禁用态
      (disabled || loading) && 'opacity-50 pointer-events-none cursor-not-allowed',
    ]"
    @tap="emit('click', $event)"
  >
    <view v-if="loading" class="animate-spin text-14px">
      ⟳
    </view>
    <slot />
  </button>
</template>
