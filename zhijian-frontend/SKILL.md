---
name: zhijian-frontend
description: "前端项目规范技能。用于开发、修改、重构、审查 Vue、React、Next.js、小程序或 uni-app 项目，并根据 JavaScript/TypeScript、样式、HTML、API、测试、可访问性、安全和性能任务按需加载规范。"
---

# 前端项目规范

不重复写所有规范。先判断当前项目，再读取 `references/` 下对应文件。

> 本技能负责规范指导（应该怎么做）。如需行为约束（不该做什么），请同时加载 `zhijian-guardrails`。

## 1. 总体流程

每接到任务，按顺序判断：

1. 任务类型：生成/修改/重构/优化、测试，还是 review/审查
2. 项目语言：TypeScript 还是 JavaScript
3. 项目框架：Vue Web、React、Next.js、小程序/uni-app
4. 是否涉及样式
5. 是否涉及 HTML 模板
6. 是否涉及 API、测试、可访问性、安全或性能

判断完成后，先读对应 reference，再开始执行。

优先级：当前仓库的可执行事实（脚本、配置、已提交实现）优先于本技能；更具体的项目规范优先于通用 reference。规范与实际不一致时，以实际为准，不为了套用本技能改写项目架构或工具链。

## 2. 基础规则（始终加载）

| 场景 | 必须加载 |
|------|---------|
| 代码生成/修改/重构/优化 | `code-standards.md` |
| 代码审查 | `code-review.md` |
| 代码精简/优化/整理 | `code-standards.md` + 按项目类型追加专项 reference |

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

### Next.js 项目

存在 `next.config.*` 或依赖含 `next`

→ 追加 `nextjs.md`

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

涉及 `.html` 模板、JSX 结构或语义化标签

→ 追加 `html.md`

### 可访问性任务

涉及表单、交互组件、键盘与焦点、ARIA、颜色对比度、动态提示、媒体替代或明确的无障碍审查

→ 追加 `accessibility.md`；涉及模板结构时同时追加 `html.md`

### 接口任务

涉及 API Route、请求封装、鉴权、输入校验、错误处理或接口契约

→ 追加 `api.md` + `security.md`

### 测试任务

涉及新增或修改测试、修复缺陷、关键行为变更、测试失败或质量门禁

→ 追加 `testing.md`

### 性能敏感任务

涉及首屏优化、bundle 大小、渲染性能

→ 追加 `performance.md`

## 4. 推荐组合

| 项目类型 | References |
|---------|-----------|
| Vue + TS | code-standards + typescript + vue |
| Vue + JS | code-standards + javascript + vue |
| React + TS | code-standards + typescript + react |
| React + JS | code-standards + javascript + react |
| Next.js + TS | code-standards + typescript + react + nextjs |
| uni-app + TS | code-standards + typescript + mini-program |
| uni-app + JS | code-standards + javascript + mini-program |
| 原生小程序 + TS | code-standards + typescript + mini-program |
| 原生小程序 + JS | code-standards + javascript + mini-program |
| 纯 TS | code-standards + typescript |
| 纯 JS | code-standards + javascript |

涉及样式时追加 `css.md`；涉及 API、测试、可访问性、安全或性能时再追加对应专项 reference。

## 5. 执行要求

- 写代码前先明确本次识别结果
- 项目特征冲突时以实际文件结构、配置和已提交实现为准
- 先识别项目已有统一校验命令；完成前运行与改动相关且可执行的校验，不虚构命令
- 只改样式也不要忽略 `code-standards.md`
- 只做 review 也要根据代码类型补充专项规则
- 审查 UI、表单或交互组件时追加 `accessibility.md`
- 精简优化任务优先落实 `code-standards.md` 中的「代码精简优化」章节（删除冗余、减少嵌套、CSS 简化）
- 不要尝试调用其他顶层 skill，以本目录 `references/` 为准

## 6. 输出要求

最终回复中不逐条复述"加载了哪些规范"，除非用户明确询问。内部执行时必须先完成项目判断，按组合后的 reference 生成结果。

## 7. 维护规范

维护或升级本技能时读取 `sources.md`，优先核对官方一手文档。版本敏感规则发生变化时同步更新 reference、来源与复查日期；不要把社区偏好冒充强制标准。
