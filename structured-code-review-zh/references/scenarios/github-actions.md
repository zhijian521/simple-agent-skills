# GitHub Actions 规则

## 安全

- `pull_request_target` 不得 checkout 并执行 PR head 的不可信代码，除非完全隔离且无秘密/写权限。
- 外部可控的 issue、PR、branch、commit 文本不得直接插入 `run:`；通过环境变量传递并正确引用。
- Secret 只能传给需要的步骤，禁止 echo、调试输出或写入 artifact/cache。
- 明确设置最小 `permissions`；禁止 `write-all`，缺失权限声明时检查默认权限是否过宽。
- 第三方 Action 固定完整 commit SHA；官方 `actions/*` 使用稳定主版本标签可以接受。
- 自托管 runner 上的不可信代码必须考虑持久化、网络、凭据和同机其他任务风险。

## 正确性

- 检查 event 名称、分支/路径过滤、表达式上下文和字符串/布尔比较。
- `needs` 必须引用真实 job id 且无循环；输出名称、步骤 id 和 action input 不能拼错。
- 需要 tag、merge-base 或完整历史时 checkout 应设置足够的 `fetch-depth`。
- matrix 必须覆盖所需平台/版本；`fail-fast` 行为必须符合是否要求全部组合成功。
- 多平台脚本要明确 shell，路径、环境变量和命令语法不能混用 Bash/PowerShell。

## 可靠性与成本

- 长任务和自托管任务必须设置合理 `timeout-minutes`。
- 高频 push/PR 工作流在重复运行确实浪费资源或产生竞态时设置合适的 concurrency group 和 `cancel-in-progress`。
- `continue-on-error`、`|| true` 不能掩盖必须失败的安全、测试或发布步骤。
- 缓存 key 必须包含依赖锁文件和平台，restore key 不能导致不安全或错误缓存复用。
- 容器与工具版本避免 `latest`；发布和部署步骤必须有环境、权限和并发保护。
- 不把“未使用缓存”本身作为缺陷；只有可证明造成材料性成本、超时或可靠性回归时才建议缓存。
