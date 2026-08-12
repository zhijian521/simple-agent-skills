# 基础设施即代码规则

## Terraform 与 HCL

- Provider 和 module 版本应固定合理范围，生产模块来源应可信并固定 revision；宽但有意的兼容范围不是缺陷。
- 检查状态迁移、资源替换、`for_each/count` key 变化和 destroy 风险。
- `*.tfstate`/backup 不得提交；真实秘密不得写入 `.tfvars`、locals/default，凭据变量标记 `sensitive`。
- IAM、网络、安全组和公开端点遵循最小权限；重点报告 `0.0.0.0/0`/`::/0` 暴露管理、数据库或全端口。
- 删除/削弱关键有状态资源的 `prevent_destroy` 需要解释；不要机械要求每个资源都有 lifecycle。
- 只根据当前 HCL 和仓库上下文判断，不推测云账户配置或未提供的远程 state。

## Bicep

- 检查 API version、资源作用域、依赖、名称稳定性和部署模式。
- 凭据参数使用 `@secure()` 或 Key Vault；秘密不得进入默认值、输出或部署历史。
- RBAC、NSG 与公开网络遵循最小权限；重点检查 Owner/Contributor 广域赋权和敏感端口全网开放。
- 只报告显式不安全值或同文件证据可证明的不安全默认，例如禁用 HTTPS/TLS/加密；
  不因缺少任意可选 hardening 属性就推测缺陷。
- API version 只有与同类相邻资源明显不一致且产生兼容后果时才报告，不要求永远使用最新版。

## Nix

- 输入、flake 和下载内容必须固定，构建保持可复现。
- 秘密不能写入 Nix store；检查世界可读路径和构建日志。
- 模块 option 合并、条件启用、平台判断和服务权限不能意外扩大。

## 通用部署安全

- 镜像、Action、module 和包不能使用浮动 `latest` 作为生产不可变依赖。
- 生产变更应考虑回滚、健康检查、滚动升级、容量和数据迁移顺序。
- 只有能说明实际暴露面和资源影响时才报告默认配置风险。
