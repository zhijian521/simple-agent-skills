# simple-agent-skills

Agent 规范技能集，目标是让代码生成、重构、审查的输出更稳定、更统一、更容易维护。

## 结构

- `zhijian-project-router`: 单入口 skill，安装和使用时只需要这一份
- `zhijian-project-router/references/`: 内部规范文件，按项目类型和任务类型按需读取
- 其他根目录 skill：保留为拆分后的源规范，方便你继续独立维护和演进

## 分层原则

推荐使用方式：

- 安装时：只安装 `zhijian-project-router`
- 使用时：只显式调用 `zhijian-project-router`
- 执行时：由它判断项目类型，再读取自己目录下的 `references/*.md`

当前内置的 reference 范围：

- `output-contract.md`
- `code-standards.md`
- `javascript.md`
- `typescript.md`
- `css.md`
- `vue.md`
- `mini-program.md`
- `code-review.md`

## 设计目标

- 减少重复规则，避免多个 skill 漂移
- 把“代码规范”和“输出规范”拆开，方便复用
- 把“语言规则”和“框架规则”拆开，方便扩展到 React、Next.js、Node.js、Python 等
- 对外只暴露一个 skill，降低使用门槛
