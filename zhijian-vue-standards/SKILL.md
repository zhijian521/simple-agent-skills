---
name: zhijian-vue-standards
description: "Vue 3 项目专项规范。适用于用户任务涉及 Vue 3、`.vue` 单文件组件、Composition API、Pinia、Vue Router 等场景时。"
---

# Vue 3 规范

本 skill 只写 Vue 增量规则。通用规则沿用 `zhijian-code-standards`，语言规则沿用 `zhijian-typescript-standards`。

## 1. 使用边界

适用于 Vue 3 Web 项目。

如果任务是 `uni-app` 页面或微信小程序，优先使用 `zhijian-mini-program-standards`，不要把 Web Vue 规则直接套进去。

## 2. 目录与拆分

- 页面放在 `pages/`、`views/` 或项目既有页面目录
- 组件只在复用明确时抽离
- `components/` 仅放跨页面或跨模块复用组件
- 页面私有子组件优先放在当前页面目录下的 `components/`
- `composables/`、`stores/`、`types/`、`styles/` 按需创建

不要先把目录搭满，再往里找内容。

## 3. 单文件组件结构

推荐顺序：

1. `<script setup lang="ts">`
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

## 4. Composition API

- 新代码默认使用 Composition API
- 能用 `computed` 的场景不用 `watch`
- `watch` 只处理副作用，不用来拼派生状态
- `reactive` 不直接解构
- 页面内部只使用一次的逻辑不要为了“规范”硬抽成 composable

## 5. Props / Emits

- Props 必须声明明确类型
- 有默认值时使用 `withDefaults`
- 不直接修改 props
- Emits 明确事件名和参数结构
- 组件对外暴露的能力尽量少而清晰

## 6. 组件设计

- 模板中不写复杂表达式
- 重计算逻辑移到 `computed`
- 事件处理函数用 `handleXxx`
- 数据加载、展示、交互职责尽量分清
- 组件过大时按功能拆，不按代码行数机械拆

## 7. 状态管理

- 仅当前页面或父子组件可解决的状态，不上 Pinia
- 跨页面、跨模块共享且有明确生命周期的状态再考虑 Pinia
- Store 中保留业务状态与核心动作，避免把页面显示状态全部塞进去

## 8. Router 与异步

- 路由参数读取后尽早归一化
- 路由守卫不堆业务细节
- 页面级异步请求保留加载态、错误态、空态
- 并行请求优先考虑 `Promise.all`

## 9. 模板与样式

- `v-for` 的 `key` 使用稳定业务标识
- 避免 `v-if` 与 `v-for` 写在同一元素
- 样式优先靠组件作用域约束，不滥用全局污染
- 选择器层级尽量浅
