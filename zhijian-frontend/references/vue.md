# Vue 3 规范

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

推荐顺序：`<script setup>` → `<template>` → `<style scoped>`

脚本内顺序：
1. 导入
2. 常量与类型
3. `defineProps` / `defineEmits`
4. 响应式状态
5. 计算属性
6. 生命周期
7. 事件与业务方法

## 命名规则

| 项 | 规则 | 示例 |
|------|------|------|
| 组件名 | 多单词 PascalCase | `UserProfile` |
| 基础组件 | `Base`/`App` 前缀 | `BaseButton` |
| 单例组件 | `The` 前缀 | `TheHeader` |
| 紧密耦合 | 父组件名前缀 | `TodoList` → `TodoListItem` |
| 模板使用 | kebab-case | `<user-profile />` |

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
- 频繁切换用 `v-show`
- 模板层级能省则省
- 不在模板里到处写 `item?.name || '-'`

## Composable

- `use` 前缀，文件名与函数名一致
- 返回值：`{ data, loading, error, execute }`
- provide/inject 的 key 用 Symbol 或常量
- 需要对比新旧值用 `watch`，只追踪依赖用 `watchEffect`
- `defineExpose` 只用必要时

## 禁止项

- 模板计算过重
- 错误使用 `watch` 导致循环触发
- 不必要引入 composable 或 store
- 只为补一个 class 多套两层容器
