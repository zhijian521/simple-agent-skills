---
name: zhijian-frontend
description: "前端项目规范守卫技能。根据项目类型（Vue/React/小程序）、语言（TypeScript/JavaScript）、任务类型自动加载对应规范 reference，确保输出符合团队标准。"
---

# 前端项目规范守卫

不重复写所有规范。先判断当前项目，再读取 `references/` 下对应文件。

## 1. 总体流程

每接到任务，按顺序判断：

1. 任务类型：生成/修改/重构/优化，还是 review/审查
2. 项目语言：TypeScript 还是 JavaScript
3. 项目框架：Vue Web、React、小程序/uni-app
4. 是否涉及样式
5. 是否涉及 HTML 模板
6. 是否涉及接口调用
7. 是否有安全或性能要求

判断完成后，先读对应 reference，再开始执行。

## 2. 基础规则（始终加载）

| 场景 | 必须加载 |
|------|---------|
| 代码生成/修改/重构/优化 | `guardrails.md` + `output-contract.md` + `code-standards.md` |
| 代码审查 | `guardrails.md` + `code-review.md` |
| 代码精简/优化/整理 | 同上 + 按项目类型追加专项 reference |

## 3. 项目识别

### TypeScript 项目

满足任一：
- 存在 `tsconfig.json`
- 主要代码为 `.ts`、`.tsx`
- Vue 中大量 `<script setup lang="ts">`

→ 追加 `typescript.md`

### JavaScript 项目

满足任一：
- 无 `tsconfig.json`
- 主要代码为 `.js`、`.jsx`

→ 追加 `javascript.md`

### Vue Web 项目

满足任一：
- 大量 `.vue` 文件
- 依赖含 `vue`、`pinia`、`vue-router`
- 目录结构 `src/views`、`App.vue`

→ 追加 `vue.md`

### React 项目

满足任一：
- 大量 `.tsx`/`.jsx` 组件文件
- 依赖含 `react`、`react-dom`
- 存在 `next.config.*` 或 `vite.config.*` 且目录为 React 风格

→ 追加 `react.md`

### 小程序 / uni-app

满足任一：
- 存在 `app.json`、`pages.json`、`manifest.json`
- 存在 `.wxml`、`.wxss`
- 依赖含 `@dcloudio/uni-app`

→ 追加 `mini-program.md`
> uni-app 优先按小程序/跨端规则，不直接套纯 Vue Web 规则。

### 样式任务

涉及 `.css`/`.scss`/`.less` 或 Vue `<style>` 或样式重构

→ 追加 `css.md`

### HTML 任务

涉及 `.html` 模板、JSX 结构、语义化标签、可访问性

→ 追加 `html.md`

### 接口任务

涉及 API 封装、请求拦截、错误处理

→ 追加 `security.md`（接口安全部分）

### 性能敏感任务

涉及首屏优化、bundle 大小、渲染性能

→ 追加 `performance.md`

## 4. 推荐组合

| 项目类型 | References |
|---------|-----------|
| Vue + TS | guardrails + output-contract + code-standards + typescript + css + vue |
| Vue + JS | guardrails + output-contract + code-standards + javascript + css + vue |
| React + TS | guardrails + output-contract + code-standards + typescript + css + react |
| React + JS | guardrails + output-contract + code-standards + javascript + css + react |
| uni-app + TS | guardrails + output-contract + code-standards + typescript + css + mini-program |
| uni-app + JS | guardrails + output-contract + code-standards + javascript + css + mini-program |
| 原生小程序 + TS | guardrails + output-contract + code-standards + typescript + mini-program |
| 原生小程序 + JS | guardrails + output-contract + code-standards + javascript + mini-program |
| 纯 TS | guardrails + output-contract + code-standards + typescript |
| 纯 JS | guardrails + output-contract + code-standards + javascript |

## 5. 执行要求

- 写代码前先明确本次识别结果
- 先读 `guardrails.md`，再读其他 reference
- 项目特征冲突时以实际文件结构为准
- 只改样式也不要忽略 `output-contract.md`
- 只做 review 也要根据代码类型补充专项规则
- 精简优化任务优先落实删除冗余、减少嵌套、简化样式
- 不要尝试调用其他顶层 skill，以本目录 `references/` 为准

## 6. 输出要求

最终回复中不逐条复述"加载了哪些规范"，除非用户明确询问。内部执行时必须先完成项目判断，按组合后的 reference 生成结果。
