# simple-agent-skills

Agent 规范技能集，目标是让代码生成、重构、审查的输出更稳定、更统一、更容易维护。

## 结构

- `zhijian-output-contract`: 统一 Agent 的输出格式与工作方式
- `zhijian-code-standards`: 通用代码规范，强调简单、简洁、合理、统一
- `zhijian-typescript-standards`: TypeScript / JavaScript 语言专项规范
- `zhijian-vue-standards`: Vue 3 项目专项规范
- `zhijian-mini-program-standards`: 微信小程序 / uni-app 专项规范
- `zhijian-code-review`: 统一代码审查输出协议与检查项

## 分层原则

推荐组合方式：

- 通用开发：`zhijian-output-contract` + `zhijian-code-standards`
- TypeScript 项目：再加 `zhijian-typescript-standards`
- Vue 项目：再加 `zhijian-vue-standards`
- 微信小程序 / uni-app：再加 `zhijian-mini-program-standards`
- 代码审查：使用 `zhijian-code-review`

## 设计目标

- 减少重复规则，避免多个 skill 漂移
- 把“代码规范”和“输出规范”拆开，方便复用
- 把“语言规则”和“框架规则”拆开，方便扩展到 React、Next.js、Node.js、Python 等
