# Vue 3 规范

适用于 Vue 3 Web 项目。

## 目录与拆分

- 页面放在 `pages/`、`views/` 或项目既有页面目录
- 组件只在复用明确时抽离
- `components/` 仅放跨页面或跨模块复用组件
- 页面私有子组件优先放在当前页面目录下的 `components/`
- `composables/`、`stores/`、`types/`、`styles/` 按需创建
- 简单页面不要预先拆出一整套 `components / hooks / types / service / constants`

推荐目录示例：

```text
src/
├── main.ts
├── App.vue
├── router/
│   └── index.ts
├── api/
│   ├── auth.ts
│   └── user.ts
├── views/
│   └── user-center/
│       ├── index.vue
│       ├── components/
│       │   ├── UserProfileCard.vue
│       │   └── UserPasswordForm.vue
│       └── types.ts
```

## 单文件组件结构

推荐顺序：

1. `<script setup>`
2. `<template>`
3. `<style scoped>`

脚本内推荐顺序：

1. 导入
2. 常量与类型
3. `defineProps` / `defineEmits`
4. 响应式状态
5. 计算属性
6. 生命周期
7. 事件与业务方法

## 组织原则

- 同一功能的状态、计算属性、方法尽量放在一起
- 不要把所有 `ref` 写一堆、所有方法再写一堆
- 页面功能较多时，按功能分组比按语法分层更容易维护
- 一次性逻辑不要硬抽成 composable
- 单页使用的弹窗或表单不要急着抽全局组件

反例：

- 一个简单列表页拆成 `index.vue`、`use-list.ts`、`use-filter.ts`、`use-dialog.ts`、`types.ts`、`constants.ts`

正例：

- 先在 `index.vue` 内按功能收拢状态和方法
- 只有真正复用时再拆分

## 状态管理

- 仅当前页面或父子组件可解决的状态，不上 Pinia
- 跨页面、跨模块共享且有明确生命周期的状态再考虑 Pinia

## 模板与样式

- 模板中不写复杂表达式
- 重计算逻辑移到 `computed`
- `v-for` 的 `key` 使用稳定业务标识
- 避免 `v-if` 与 `v-for` 写在同一元素
- 不要在模板中到处写 `item?.name || '-'` 这类兜底表达式
- 模板层级能省则省，不要为了“结构清晰”堆很多空容器
- 同一块内容能由一个节点承担语义和样式时，不拆成多层包裹
- 页面内部简单弹窗、筛选区、卡片区优先就地组织，不为一次性结构提前抽离

正例：

- 列表项直接渲染标题、描述、状态，不额外包多层 `div`
- 按页面功能块分区注释，脚本和模板都能快速定位

反例：

- 只为补一个 class 或补一个间距，额外套两层容器
- 一个简单页面拆出很多只使用一次的局部组件和 composable
