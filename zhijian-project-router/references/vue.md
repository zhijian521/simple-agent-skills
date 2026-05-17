# Vue 3 规范

适用于 Vue 3 Web 项目。

## 目录与拆分

- 页面放在 `pages/`、`views/` 或项目既有页面目录
- 组件只在复用明确时抽离
- `components/` 仅放跨页面或跨模块复用组件
- 页面私有子组件优先放在当前页面目录下的 `components/`
- `composables/`、`stores/`、`types/`、`styles/` 按需创建

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

## 状态管理

- 仅当前页面或父子组件可解决的状态，不上 Pinia
- 跨页面、跨模块共享且有明确生命周期的状态再考虑 Pinia

## 模板与样式

- 模板中不写复杂表达式
- 重计算逻辑移到 `computed`
- `v-for` 的 `key` 使用稳定业务标识
- 避免 `v-if` 与 `v-for` 写在同一元素
