# Vue 3 规范

项目现有 Vue 版本、Lint、组件库和代码模式优先。以下规则分为必要约束和条件建议，不把官方风格建议全部当作强制项。

## 优先级

- **必须**：稳定 `key`、正确响应式依赖、清理副作用、避免 `v-if` 与 `v-for` 同元素等正确性规则
- **强烈建议**：组件职责清晰、状态就近、模板保持简单
- **按场景**：文件顺序、命名前缀、`v-show`、composable 返回形状等风格选择

## 目录与拆分

- 页面放 `pages/`、`views/` 或项目既有目录
- 只有跨页面/跨模块复用才放 `components/`
- 页面私有子组件优先放当前页面目录下 `components/`
- `composables/`、`stores/` 按需创建
- 简单页面不预拆 `components/hooks/types/service/constants`

推荐目录：

```
src/
├── views/
│   └── user-center/
│       ├── index.vue
│       ├── components/
│       │   ├── UserProfileCard.vue
│       │   └── UserPasswordForm.vue
│       └── types.ts
```

## 单文件组件结构

项目使用 `<script setup>` 时可沿用 `<script setup>` → `<template>` → `<style>`，但以项目 formatter 和现有组件顺序为准。

脚本内顺序：

1. 导入
2. 常量与类型
3. `defineProps` / `defineEmits`
4. 响应式状态
5. 计算属性
6. 生命周期
7. 事件与业务方法

## 命名规则

| 项       | 规则              | 示例                        |
| -------- | ----------------- | --------------------------- |
| 组件名   | 多单词 PascalCase | `UserProfile`               |
| 基础组件 | 项目已采用时使用 `Base`/`App` 前缀 | `BaseButton`                |
| 单例组件 | 项目已采用时使用 `The` 前缀        | `TheHeader`                 |
| 紧密耦合 | 父组件名前缀      | `TodoList` → `TodoListItem` |
| 模板使用 | kebab-case        | `<user-profile />`          |

## 组织原则

- 同功能的状态、计算、方法放在一起
- 一次性逻辑不硬抽 composable
- 单页使用的弹窗/表单不急着抽全局组件

反例：一个列表页拆成 `index.vue`、`use-list.ts`、`use-filter.ts`、`use-dialog.ts`、`types.ts`、`constants.ts`

正例：先在 `index.vue` 内按功能收拢，真正复用再拆分

## 状态管理

- 仅当前页面或父子组件解决的状态不上 Pinia
- 跨页面/跨模块共享且有明确生命周期才用 Pinia

## 模板

- 不写复杂表达式，重计算放 `computed`
- `v-for` 的 `key` 用稳定业务标识
- 禁止 `v-if` 与 `v-for` 写在同一元素
- 频繁切换且保留 DOM 状态有收益时考虑 `v-show`；初始渲染成本高或无需保留时使用 `v-if`
- 模板层级能省则省
- 不在模板里到处写 `item?.name || '-'`

## Composable

- `use` 前缀，文件名与函数名一致
- 返回值围绕当前职责设计；项目已有统一异步模型时沿用其 `data/loading/error/execute` 等约定
- provide/inject 的 key 用 Symbol 或常量
- 需要对比新旧值用 `watch`，只追踪依赖用 `watchEffect`
- `defineExpose` 只用必要时

## 禁止项

- 模板计算过重
- 错误使用 `watch` 导致循环触发
- 不必要引入 composable 或 store
- 只为补一个 class 多套两层容器
