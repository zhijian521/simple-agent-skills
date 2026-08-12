# 配置与依赖规则

## JSON、YAML 与 Properties

- 检查语法、重复键、缩进、类型变化、大小写和字段拼写；重复键可能被静默覆盖。
- 检查默认值、必填项、单位、环境差异和未识别字段的失败/忽略语义。
- 不在配置中硬编码秘密、内部地址、生产凭据或用户数据。
- YAML 检查隐式布尔/数字转换、anchor/alias 误用和字符串未引用造成的解析差异。
- properties 检查重复 key、转义、编码、占位符和多语言文件 key 是否同步。

## package.json

- scripts 中不得拼接不可信输入；检查跨平台 Shell 兼容和生命周期脚本副作用。
- 新增依赖不得使用 `latest` 或 `*`；兼容范围并非天然缺陷，只有实际放宽到不兼容主版本才报告。
- 依赖应位于正确分组，不能同时冲突地出现在 dependencies 与 devDependencies；锁文件应与清单同步。
- scripts 使用的 eslint、jest、prettier 等工具必须能从声明依赖或仓库工具链中获得。
- 检查不存在或拼错的脚本、入口、exports、types、files 和 engines。
- 升级依赖时关注破坏性版本、运行时要求、许可证和供应链风险。

## Maven 与 Gradle

- 检查依赖 scope/configuration、版本冲突、插件版本、仓库来源和传递依赖排除。
- 构建任务必须保持可复现；不要依赖本机路径、未固定动态版本或隐式环境状态。
- 检查测试、打包、资源过滤、Java/Kotlin 目标版本和多模块依赖方向。
- 新增生产依赖不使用 Maven `SNAPSHOT` 或 Gradle 动态/SNAPSHOT 版本；只检查本次新增/修改的版本行。

## Cargo.toml 与 composer.json

- Cargo 检查 edition、MSRV、resolver、feature 的可加性、optional dependency 暴露和默认 feature 膨胀。
- Composer 检查 PHP/ext 约束与 CI/部署、PSR-4/autoload、`allow-plugins`、minimum-stability、
  replace/provide/conflict 和生产/开发依赖边界。
- 锁文件、最低运行时版本、autoload、脚本钩子和发布 include/exclude 必须一致。
- Git/VCS 依赖应固定可信 revision；公共发布不能意外依赖本地路径或不安全的明文仓库。
- 不凭记忆报告依赖漏洞；需要 resolved version 与可靠 advisory 证据。

## 不应报告

- 没有实际解析或运行差异的纯排序、引号和格式偏好。
- 已由生成工具管理且源清单正确的机械化输出差异。
- 锁文件通常不逐行人工解释；重点核对它是否与清单同步、来源/完整性字段是否异常、关键包是否
  意外降级/跨主版本，以及 resolved platform 是否仍符合 CI/部署。仅在可靠 advisory 适用时报告漏洞。
