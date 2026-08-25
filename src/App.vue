<script setup lang="ts">
onLaunch(() => {
  // 应用启动逻辑
})

onShow(() => {
  // 应用前台切入逻辑
})

onHide(() => {
  // 应用后台切入逻辑
})
</script>

<style lang="scss">
page,
uni-page-body {
  min-height: 100%;
  overscroll-behavior: none;
  background-color: #f8f9fa;
  color: #1a1a1a;
  font-family:
    'DM Sans',
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
}

view,
text,
image,
scroll-view,
swiper,
swiper-item,
input,
textarea,
button,
navigator,
uni-view,
uni-text,
uni-image,
uni-scroll-view,
uni-button,
uni-navigator {
  box-sizing: border-box;
  line-height: 1.4;
}

/* 按钮默认重置 */
button,
uni-button {
  margin: 0;
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font: inherit;
}

button::after,
uni-button::after {
  border: none;
}

image,
uni-image {
  display: block;
}

/* 隐藏默认滚动条 */
::-webkit-scrollbar,
scroll-view::-webkit-scrollbar,
uni-scroll-view::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  color: transparent;
}
</style>
