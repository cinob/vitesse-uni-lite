<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useNavbar } from '@/composables/useNavbar'

defineOptions({
  options: {
    virtualHost: true,
    mergeVirtualHostAttributes: true,
  },
})

const props = withDefaults(defineProps<{
  title?: string
  showBack?: boolean
  scrollable?: boolean
  bgClass?: string
  contentPadding?: boolean
  reserveBottomSpace?: boolean
  homePath?: string
}>(), {
  title: '',
  showBack: true,
  scrollable: true,
  bgClass: 'bg-gray-50',
  contentPadding: true,
  reserveBottomSpace: true,
  homePath: '/pages/index',
})

const emit = defineEmits<{
  (e: 'scroll', scrollTop: number): void
  (e: 'reachBottom'): void
}>()

const { navPaddingTop, navHeight, navTotalHeight, navRightPadding } = useNavbar()
const slots = useSlots()
const hasBottom = computed(() => Boolean(slots.bottom))

function handleBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  }
  else {
    uni.reLaunch({ url: props.homePath })
  }
}

function onScroll(e: { detail: { scrollTop: number } }) {
  emit('scroll', e.detail.scrollTop)
}
</script>

<template>
  <view class="relative h-100vh flex flex-col overflow-hidden text-gray-900" :class="bgClass">
    <!-- 顶部自定义导航栏 -->
    <view
      class="z-100 shrink-0 px-16px transition-colors"
      :style="{ paddingTop: `${navPaddingTop}px`, height: `${navTotalHeight}px` }"
    >
      <view
        class="flex items-center"
        :style="{ height: `${navHeight}px`, paddingRight: `${navRightPadding}px` }"
      >
        <slot name="nav">
          <view class="min-w-0 flex flex-1 items-center gap-8px">
            <view
              v-if="showBack"
              class="flex cursor-pointer items-center justify-center p-4px text-18px"
              @tap="handleBack"
            >
              <text class="text-18px">
                ‹
              </text>
            </view>
            <text v-if="title" class="truncate text-17px font-600">
              {{ title }}
            </text>
          </view>
        </slot>
      </view>
      <slot name="nav-extra" />
    </view>

    <!-- 页面主体内容区 -->
    <scroll-view
      v-if="scrollable"
      scroll-y
      enhanced
      :bounces="false"
      :show-scrollbar="false"
      class="min-h-0 flex-1"
      lower-threshold="200"
      @scroll="onScroll"
      @scrolltolower="emit('reachBottom')"
    >
      <view
        class="relative min-h-full"
        :class="[
          contentPadding ? 'px-16px pt-8px' : '',
          reserveBottomSpace && !hasBottom ? 'pb-safe' : 'pb-24px',
        ]"
      >
        <slot />
      </view>
    </scroll-view>

    <view
      v-else
      class="min-h-0 flex-1 overflow-hidden"
      :class="[
        contentPadding ? 'px-16px pt-8px' : '',
        reserveBottomSpace && !hasBottom ? 'pb-safe' : '',
      ]"
    >
      <slot />
    </view>

    <!-- 底部固定栏插槽 -->
    <view
      v-if="hasBottom"
      class="fixed bottom-0 left-0 right-0 z-100 bg-white px-16px pb-safe pt-8px shadow-[0_-4px_16px_rgba(0,0,0,0.05)]"
    >
      <slot name="bottom" />
    </view>
  </view>
</template>
