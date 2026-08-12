# 可覆盖规则 ID

`.code-review.yml` 只能引用本表列出的 ID。它们是默认非阻塞的 P3 检查；所有安全、
数据完整性和公开契约规则仍以代码证据为准，不能通过策略禁用。

| 规则 ID | 默认行为 | 可用策略 |
|---|---|---|
| `P3:missing-regression-test` | 行为变更存在可信失败模式但未提供回归测试 | 禁用；调整为 P2 或 P3 |
| `P3:generated-artifact-review` | 生成产物缺少源清单或发布一致性说明 | 禁用；调整为 P2 或 P3 |
| `P3:noncritical-observability-gap` | 已存在的关键路径新增非阻塞可观测性缺口 | 禁用；调整为 P2 或 P3 |

不要为纯格式、lint 或主观偏好增加可覆盖 ID；它们不应作为 Finding 输出。
