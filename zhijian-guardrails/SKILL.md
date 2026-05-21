---
name: zhijian-guardrails
description: "前端项目压制技能。在代码生成前加载反模式规则和输出契约，约束 Agent 不该做什么，优先级最高。"
---

# 前端项目压制

不写规范，只做约束。确保 Agent 在写代码前先知道边界。

## 1. 总体流程

每接到任务，始终加载：

1. `references/guardrails.md` —— 反模式压制（不要做什么）
2. `references/output-contract.md` —— 输出契约（回复必须满足什么）

如果任务涉及具体代码生成，引导同时加载 **zhijian-frontend** 技能获取专项规范。

## 2. 与 zhijian-frontend 的关系

| 技能 | 职责 |
|------|------|
| `zhijian-guardrails`（本技能） | 压制：约束边界，说不该做什么 |
| `zhijian-frontend` | 规范：指导写法，说应该怎么做 |

两者互补。开发/重构/审查时建议同时使用：
- 先加载本技能（压制层）
- 再加载 `zhijian-frontend`（规范层）

## 3. 执行要求

- `guardrails.md` 优先级最高，与其他规范冲突时以此为准
- 先读完 `guardrails.md` 再开始执行
- 回复中不逐条复述"加载了哪些规则"，除非用户明确问
