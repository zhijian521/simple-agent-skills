---
name: zhijian-project-router
description: "统一项目入口技能。适用于用户希望只使用一个 skill 完成不同项目开发时，先判断当前项目类型、语言、样式方式和任务类型，再决定应读取哪些内部规范 reference。"
---

# 项目规范路由器

这个 skill 不重复写所有规范，而是负责先判断当前项目，再读取自己目录下对应的 `references/*.md`。

目标：以后用户只需要显式使用这一个 skill，就能让 Agent 根据当前项目自动套用合适的规则。

## 1. 总体流程

接到任务后，按下面顺序判断：

1. 当前任务是生成 / 修改 / 重构代码，还是 review / 审查
2. 当前任务是否属于代码优化、代码精简、结构整理、样式瘦身
3. 当前项目主要语言是 TypeScript 还是 JavaScript
4. 当前项目是不是 Vue Web
5. 当前项目是不是微信小程序或 uni-app
6. 当前任务是否涉及样式文件或组件样式

判断完成后，先读取对应 reference，再开始执行。

## 2. 基础规则

除纯 review 场景外，默认始终带上：

- `references/guardrails.md`
- `references/output-contract.md`
- `references/code-standards.md`

如果是 review / 审查任务，必须带上：

- `references/guardrails.md`
- `references/code-review.md`

如果 review 的对象包含 Vue、小程序、TypeScript、JavaScript、样式文件，也要继续读取对应专项 reference。

如果是代码优化、代码精简、结构整理类任务：

- 仍然先读 `references/guardrails.md`
- 再读 `references/output-contract.md`
- 再读 `references/code-standards.md`
- 根据项目类型继续补充 `references/css.md`、`references/vue.md`、`references/mini-program.md`
- 重点执行“删除冗余、减少嵌套、简化样式、补充必要分区注释”，但不要改变业务逻辑和 UI 效果

## 3. 项目识别

### TypeScript 项目

满足任一条件，可判定为 TypeScript 优先：

- 存在 `.ts`、`.tsx` 文件且为主要代码文件
- 存在 `tsconfig.json`
- Vue 项目中大量使用 `<script setup lang="ts">`
- 小程序项目中页面、组件主要使用 `.ts`

则追加：

- `references/typescript.md`

### JavaScript 项目

满足任一条件，可判定为 JavaScript 优先：

- 主要代码文件是 `.js`、`.jsx`
- 没有 `tsconfig.json`
- Vue 项目中主要使用普通 `<script>`
- 小程序项目页面、组件主要使用 `.js`

则追加：

- `references/javascript.md`

### Vue Web 项目

满足任一条件，可判定为 Vue Web：

- 存在大量 `.vue` 单文件组件
- 存在 `vue`、`pinia`、`vue-router`
- 项目结构明显为 `src/views`、`src/components`、`App.vue`

则追加：

- `references/vue.md`

### 微信小程序 / uni-app 项目

满足任一条件，可判定为小程序或 uni-app：

- 存在 `app.json`、`app.wxss`、`Page({})`
- 存在 `pages.json`、`manifest.json`
- 存在 `uni.*` API、`@dcloudio/uni-app`
- 存在 `.wxml`、`.wxss`

则追加：

- `references/mini-program.md`

注意：

- 如果是 `uni-app`，优先按小程序 / 跨端规则处理，不直接套纯 Vue Web 规则
- 只有明确是 Vue Web，才以 `zhijian-vue-standards` 为主

### 样式任务

满足任一条件，追加样式规范：

- 任务涉及 `.css`、`.scss`、`.less`
- 任务涉及 Vue `<style>` 区块
- 任务涉及组件样式、页面布局、样式重构

则追加：

- `references/css.md`

## 4. 推荐读取组合

### Vue + TypeScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/typescript.md`
- `references/css.md`
- `references/vue.md`

### Vue + JavaScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/javascript.md`
- `references/css.md`
- `references/vue.md`

### uni-app + TypeScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/typescript.md`
- `references/css.md`
- `references/mini-program.md`

### uni-app + JavaScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/javascript.md`
- `references/css.md`
- `references/mini-program.md`

### 原生小程序 + TypeScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/typescript.md`
- `references/mini-program.md`

### 原生小程序 + JavaScript

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/javascript.md`
- `references/mini-program.md`

### 纯 TypeScript 项目

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/typescript.md`

### 纯 JavaScript 项目

读取：

- `references/output-contract.md`
- `references/code-standards.md`
- `references/guardrails.md`
- `references/javascript.md`

## 5. 执行要求

- 在真正写代码前，先明确本次识别结果
- 先读取 `references/guardrails.md`，再读取其它 reference
- 如果项目特征冲突，优先以当前仓库实际文件结构为准
- 如果只改样式，也不要忽略 `references/output-contract.md` 和 `references/code-standards.md`
- 如果只做 review，也要根据代码类型补充对应专项规则
- 如果是前端精简优化类任务，优先落实 reference 中的删除冗余、减少嵌套、样式简化规则
- 不要尝试再去“调用其他顶层 skill”，以当前目录下的 `references/` 为准

## 6. 输出要求

最终回复中不需要逐条向用户复述“我加载了哪些 skill”，除非用户明确问。

但在内部执行时，必须先完成项目判断，再按组合后的 reference 生成结果，不能只凭单一规则输出。
