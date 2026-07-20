# simple-agent-skills

个人 Agent 技能仓库。每个一级目录都是可独立安装、独立演进的 skill；根目录只维护技能清单与使用导航。

## 技能目录

| Skill | 职责 | 适用场景 |
| --- | --- | --- |
| `zhijian-guardrails` | 约束 Agent 的反模式与输出边界 | 前端开发、重构、优化与审查任务的基础约束 |
| `zhijian-frontend` | 提供项目事实优先的前端开发规范 | Vue、React、Next.js、小程序 / uni-app，以及 JavaScript、TypeScript、样式、接口、测试、可访问性、安全与性能任务 |

## 推荐组合

前端开发、修改、重构、优化或审查时，先使用 `zhijian-guardrails`，再使用 `zhijian-frontend`。

- `zhijian-guardrails` 负责明确不该做什么，例如避免无意义的抽象、空判断、硬编码和死代码。
- `zhijian-frontend` 根据项目类型按需加载对应 reference，说明应采用的结构与写法。

仅需要约束输出边界时，可单独使用 `zhijian-guardrails`。仅需要前端规范指导时，可单独使用 `zhijian-frontend`。

## 仓库约定

- 一个 skill 使用一个一级目录，目录名必须与其 `SKILL.md`、`metadata.json` 中的 `name` 一致。
- skill 内只放执行该技能所需的 `SKILL.md`、`metadata.json`、`references/`、`scripts/` 或 `assets/`；不要在 skill 内新增 README 或变更日志。
- skill 之间通过明确的组合建议协作，不跨目录引用对方的内部文件。
- 通用规范不得覆盖项目已有脚本、配置、已提交实现和更具体的项目规范。
- 涉及版本敏感的框架与标准时，在 `references/sources.md` 记录官方来源和复查日期。
- 新增 skill 时：创建独立目录、补齐元数据，并在根 `metadata.json` 和本 README 的技能目录中登记。
- 废弃 skill 时：先从根 `metadata.json` 和 README 移除，再删除该目录。
- 根版本遵循语义化版本：兼容的规则补充升 minor 或 patch；删除、改名或调整调用方式升 major。

## 目录结构

```text
simple-agent-skills/
├─ metadata.json
├─ README.md
├─ zhijian-guardrails/
│  ├─ SKILL.md
│  ├─ metadata.json
│  └─ references/
└─ zhijian-frontend/
   ├─ SKILL.md
   ├─ metadata.json
   └─ references/
```
