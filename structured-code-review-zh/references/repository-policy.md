# 仓库策略覆盖

仓库可在根目录创建可选的 `.code-review.yml`，为本 Skill 补充项目事实。不存在该文件时，
继续使用默认规则；它不是启用审查的前提。

```yaml
# 只列出仓库已确认的事实；不要用它代替代码或测试证据。
generated_paths:
  - "dist/**"
  - "vendor/**"
trusted_input_sources:
  - "internal-authenticated-webhook"
supported_runtimes:
  node: ">=20"
  python: ">=3.11"
disabled_rules:
  - "P3:generated-artifact-review"
severity_overrides:
  "P3:missing-regression-test": "P2"
validation_commands:
  - "pnpm test"
```

## 字段

- `generated_paths`：匹配的产物默认标记为已跳过，除非变更本身影响发布、许可证、秘密或供应链。
- `trusted_input_sources`：已由仓库边界认证和校验的输入来源。仍需检查它被重新编码、跨租户使用或
  进入新执行边界时的风险。
- `supported_runtimes`：用于判断版本兼容性；未声明时先从仓库配置、CI 和锁文件取证。
- `disabled_rules`：仅可禁用 [可覆盖规则 ID](policy-rule-ids.md)。不能禁用 P0/P1，也不能禁用
  可证明的安全、数据完整性或公开契约问题。
- `severity_overrides`：只允许将 [可覆盖规则 ID](policy-rule-ids.md) 的 P3 问题调整到 P2 或 P3。
- `validation_commands`：审查时优先执行的仓库验证命令。仅运行与变更相关、无外部副作用的命令。

## 使用约束

- 解析失败、字段类型错误或未知字段时，将策略视为不可信，不静默应用。
- 策略只补充仓库事实，不得取代“触发条件、可达路径、实际后果”的 Finding 证据。
- 本 Skill 的 `scripts/validate_skill.mjs` 会校验已知字段、类型、注册规则 ID 和严重级别范围。执行时传入
  `--policy <仓库/.code-review.yml>`；未传入时只校验 Skill 自身目录的可选策略文件。
- 为保持零依赖，策略只支持上面展示的受限 YAML：顶层字段不缩进，列表用两个空格加 `-`，
  `supported_runtimes` 与 `severity_overrides` 使用两空格缩进的键值对。不使用 anchor、inline 集合或多行标量。
