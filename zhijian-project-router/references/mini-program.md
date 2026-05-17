# 小程序 / uni-app 规范

适用于原生微信小程序与 uni-app。

## 使用边界

- 原生微信小程序：使用原生小程序规则
- `uni-app`：使用跨端规则
- 如果是标准 Vue Web 项目，不要套用本规范

## 目录原则

- 页面目录按业务页面组织
- 组件目录只放明确复用组件
- `api/`、`utils/`、`styles/` 按需创建
- 不要预建一堆空目录

原生小程序目录示例：

```text
src/
├── app.json
├── pages/
│   └── user-center/
│       ├── index.ts
│       ├── index.wxml
│       ├── index.wxss
│       └── index.json
├── components/
│   └── user-card/
│       ├── index.ts
│       ├── index.wxml
│       ├── index.wxss
│       └── index.json
```

uni-app 目录示例：

```text
src/
├── App.vue
├── pages.json
├── manifest.json
├── pages/
│   └── user-center/
│       ├── index.vue
│       ├── components/
│       │   └── UserProfileCard.vue
│       └── types.ts
```

## 页面与组件

- `onLoad` 中处理入参归一化和首屏请求
- `setData` 只提交真正变化的字段
- 异步流程必须处理失败分支
- 用户可见失败优先使用明确提示
- `properties` 明确 `type` 与默认值
- 组件只暴露必要属性和事件

## uni-app 补充

- 优先使用 `uni.*` API
- 条件编译是最后手段
- 不直接照搬 Web Vue 规则

## 生命周期与状态

- 生命周期里只做当前阶段必须做的事
- 页面加载态、提交态、空态、失败态要清晰
- 多请求互不依赖时优先并行
