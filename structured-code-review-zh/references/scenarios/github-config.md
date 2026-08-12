# GitHub 配置规则

仅检查 `.github` 下不是 Actions 工作流的配置。工作流仍读取 `github-actions.md`。

## Issue Form

- Issue form 顶层应有可用的 `name`、`description` 和 `body`；缺失会导致模板不可用。
- `body` 输入类型必须是 GitHub 支持的 `input`、`textarea`、`dropdown`、`checkboxes`
  或 `markdown`，并包含该类型要求的字段。
- `dropdown` 的 `options` 不得为空；需要被自动化读取的输入必须有唯一且稳定的 `id`。
- 检查 YAML key 拼写、重复 id、必填字段位置和字符串/布尔类型；不要报告纯排序或引号偏好。

## Release 配置

- `release.yml` 的 category labels 应与仓库实际标签一致；仓库中无法验证标签时只作为条件性问题。
- 需要覆盖所有 PR 时，应存在使用 `*` 的兜底 category；若产品明确允许忽略未分类 PR，则不报告。
- 检查 changelog 排除项、category 顺序和标签重叠是否会让 PR 被遗漏或进入错误分类。

## 通用配置

- 检查 YAML 语法、缩进、特殊字符引号、anchor/alias 和 key 拼写；未知 key 可能被静默忽略。
- 不推测 GitHub 仓库外部状态。只有当前配置、仓库标签/文件或 GitHub 文档能证明时才报告。
