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

- 输入、flake 和下载内容未固定时，只有进入生产构建、仓库政策要求可复现或漂移会改变部署结果时报告。
- 秘密不能写入 Nix store；检查世界可读路径和构建日志。
- 模块 option 合并、条件启用、平台判断和服务权限不能意外扩大。

## Docker 与 Compose

- Dockerfile 的构建阶段与运行阶段应只携带运行所需文件、用户和凭据；秘密、构建缓存或私有 token
  只有进入最终镜像层或镜像历史时报告。
- 镜像标签未固定时，只有镜像用于生产且没有锁定摘要、镜像更新流程或仓库例外时报告漂移风险。
- Compose 的 host port、volume、privileged、capabilities、network 和 environment 只有扩大生产或共享环境的
  暴露面、权限或数据持久化风险时报告；本地开发便利配置不自动升级为 Finding。

## Kubernetes、Kustomize 与 Helm

- Deployment/Job 的镜像、serviceAccount、RBAC、hostNetwork、hostPath、privileged 和 capabilities 只有
  可证明扩大工作负载权限、逃逸边界或公开暴露时报告。
- Service、Ingress、Gateway、NetworkPolicy 和 namespace 变更应结合实际端口、selector 和工作负载判断；
  不因缺少每一项可选 hardening 默认报告问题。
- ConfigMap、Secret、values 和 chart template 中的秘密，只有会进入 Git、渲染产物、日志或非授权 namespace 时报告。
- Helm/Kustomize 模板引用的 name、label、selector、namespace 和 values 类型不一致时，确认渲染或部署会失败、
  选错工作负载或改变发布语义后报告。

## 通用部署安全

- 镜像、Action、module 和包使用浮动 `latest` 时，只有它是生产不可变依赖且没有仓库批准的更新机制时报告。
- 生产变更应考虑回滚、健康检查、滚动升级、容量和数据迁移顺序。
- 只有能说明实际暴露面和资源影响时才报告默认配置风险。
