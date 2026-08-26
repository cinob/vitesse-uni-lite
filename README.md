# vitesse-uni-lite

<p align="center">
  <img src="./public/logo.svg" width="96" height="96" alt="vitesse-uni-lite logo" />
</p>

<p align="center">
  ⚡️ 极简、现代、类型安全的 <b>UniApp + Vue 3 + Vite + UnoCSS</b> 轻量起手模板。
</p>

<p align="center">
  <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/Vue-3.5+-4FC08D?style=flat-square&logo=vue.js&logoColor=white" alt="Vue 3.5+"></a>
  <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 5"></a>
  <a href="https://unocss.dev/"><img src="https://img.shields.io/badge/UnoCSS-原子化-333333?style=flat-square&logo=unocss&logoColor=white" alt="UnoCSS"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://github.com/antfu/eslint-config"><img src="https://img.shields.io/badge/Code%20Style-Antfu-4AB0CF?style=flat-square&logo=eslint&logoColor=white" alt="Antfu Code Style"></a>
</p>

---

## 💡 项目理念

`vitesse-uni-lite` 专注于提供**最纯粹、无任何业务冗余残留**的跨端现代化工程底座。

移除了一切模拟业务假接口与 Mock 代码，保留高频通用的工程能力（组件与 API 自动导入、胶囊安全区适配、类型安全的网络封装与存储、UnoCSS 小程序预设及严苛的代码规范），助你即刻投入核心业务开发。

---

## ✨ 核心特性

- ⚡️ **现代技术栈** - 基于 Vite 5 + Vue 3.5+ (`<script setup lang="ts">`) + TypeScript 严格模式。
- 🎨 **UnoCSS 原子化 CSS** - 针对微信/支付宝小程序深度定制（集成 `unocss-preset-weapp`），原生编译无样式丢失与转义烦恼。
- 📦 **API & 组件自动导入** - Vue 响应式 API、UniApp API、Composables 与 `components/` 下的通用组件零配置自动引入。
- 📱 **多端胶囊与安全区自适应** - 封装 `AppLayout` 基础布局外壳与 `useNavbar`，完美兼容微信/支付宝小程序胶囊及各端安全区域（Safe Area）。
- 🌐 **通用网络请求封装** - 基于 Promise 泛型封装的 `request` 与 `uploadFile`，内置 Token 注入、超时控制与统一错误交互。
- 📄 **通用组合式分页** - 内置 `usePagination` 组合式函数，开箱即用支持下拉刷新与触底分页加载。
- 🧹 **Antfu 风格工程规范** - 集成 `@antfu/eslint-config` + `simple-git-hooks` + `lint-staged`，保证代码质量与风格统一。
- 🚀 **依赖快速对齐** - 预置 `taze` 与 `@dcloudio/uvm` 工具，一键完成现代工具链与 UniApp 官方编译器的升级。

---

## 🚀 快速上手

### 0. 快速创建新项目

使用 `degit` 基于此模板直接拉取并创建一个全新的轻量工程：

```bash
# 拉取模板到 my-uni-app 目录
npx degit cinob/vitesse-uni-lite my-uni-app

# 进入新项目目录
cd my-uni-app
```

### 1. 环境准备与依赖安装

推荐使用 [Bun](https://bun.sh/) 或 [pnpm](https://pnpm.io/) 作为包管理器：

```bash
# 使用 Bun (推荐)
bun install

# 或使用 pnpm
pnpm install
```

### 2. 开发调试

```bash
# 微信小程序端
bun run dev:mp-weixin

# 支付宝小程序端
bun run dev:mp-alipay

# H5 网页端
bun run dev:h5
```

### 3. 构建发布

```bash
# 构建微信小程序产物 (dist/build/mp-weixin)
bun run build:mp-weixin

# 构建支付宝小程序产物 (dist/build/mp-alipay)
bun run build:mp-alipay

# 构建 H5 产物 (dist/build/h5)
bun run build:h5
```

### 4. 常用工程脚本

| 脚本命令              | 说明                                                  |
| --------------------- | ----------------------------------------------------- |
| `bun run typecheck`   | 执行 `vue-tsc --noEmit` 严格类型检查                  |
| `bun run lint`        | 执行 ESLint 规范检查                                  |
| `bun run lint:fix`    | 执行 ESLint 自动格式化与代码修复                      |
| `bun run up`          | 使用 `taze major -I` 交互式检查并升级依赖             |
| `bun run upgrade:uni` | 使用 `@dcloudio/uvm` 升级 UniApp 官方编译器与全套依赖 |
| `bun run clean:deps`  | 扫描并清理未使用的跨端专用依赖                        |

---

## 📁 目录结构

```text
vitesse-uni-lite/
├── scripts/              # 工程维护脚本（依赖瘦身与工具脚本）
├── src/
│   ├── components/       # 通用业务与布局组件（自动导入无需手动 import）
│   │   └── AppLayout.vue # 通用页面外壳（导航栏、安全区与滚动容器集成）
│   ├── composables/      # 通用组合式函数
│   │   ├── useNavbar.ts  # 多端胶囊定位与导航尺寸计算
│   │   └── usePagination.ts # 通用触底与下拉刷新分页逻辑
│   ├── pages/            # 页面视图组件
│   │   └── index.vue     # 极简起步落地页
│   ├── static/           # 静态资源目录（图片、图标等）
│   ├── utils/            # 通用工具库
│   │   ├── request.ts    # 泛型网络请求与文件上传封装
│   │   ├── storage.ts    # 多端类型安全本地存储
│   │   └── toast.ts      # 统一交互提示与 Loading
│   ├── App.vue           # 应用根组件
│   ├── main.ts           # 应用入口配置
│   ├── manifest.json     # UniApp 多端应用清单配置
│   ├── pages.json        # 页面路由与窗口外观配置
│   └── uni.scss          # 全局 SCSS 变量与样式
├── types/                # 全局类型定义与自动导入生成声明
├── .env.example          # 环境变量配置示例模板
├── eslint.config.js      # ESLint 配置文件 (@antfu/eslint-config)
├── uno.config.ts         # UnoCSS 预设与快捷方式配置
└── vite.config.ts        # Vite 构建与插件配置
```

---

## 🧩 核心基础能力使用说明

### 1. 通用页面外壳 `AppLayout`

`AppLayout` 统一管理了自定义导航栏、顶部胶囊高度自适应、安全区内边距以及内容滚动区：

```vue
<script setup lang="ts">
// 无需手动 import AppLayout，由插件自动按需导入
</script>

<template>
  <AppLayout title="页面标题" :show-back="true">
    <view class="p-16px">
      <!-- 页面核心内容 -->
    </view>

    <!-- 可选：底部固定栏插槽（自动处理底部安全区 pb-safe） -->
    <template #bottom>
      <button class="bg-primary text-white">
        提交
      </button>
    </template>
  </AppLayout>
</template>
```

### 2. 通用网络请求 `request`

```ts
import { request } from '@/utils/request'

interface UserProfile {
  id: string
  name: string
}

// 支持全类型推导、自动加载提示与错误统一 Toast
const user = await request<UserProfile>({
  url: '/api/user/profile',
  method: 'GET',
  loading: true,
})
```

### 3. 通用分页 `usePagination`

```ts
// 组合式分页轻松接入列表流
const { list, hasMore, isRefreshing, isLoadingMore, refresh, loadMore } = usePagination({
  fetcher: async (page, pageSize) => {
    return await request<Item[]>({
      url: '/api/items',
      data: { page, pageSize },
    })
  },
})
```

---

## 🛠️ 推荐开发环境配置

建议使用 **VS Code** 并安装以下推荐插件以获得最佳开发体验：

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（Vue 3 官方语言支持）
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)（UnoCSS 实时高亮与智能补全）
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)（代码规范实时校验与保存自动修复）
- [uni-app-schemas](https://marketplace.visualstudio.com/items?itemName=uni-helper.uni-app-schemas-vscode)（`pages.json` / `manifest.json` 语法提示）

---

## 📄 开源协议

[MIT License](LICENSE)
