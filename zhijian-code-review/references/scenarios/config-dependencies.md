# 配置与依赖规则

## JSON、YAML 与 Properties

- 检查语法、重复键、缩进、类型变化、大小写和字段拼写；重复键可能被静默覆盖。
- 检查默认值、必填项、单位、环境差异和未识别字段的失败/忽略语义。
- 配置中出现秘密、生产凭据或用户数据时，确认它可被提交、打包、部署或非可信读者获取后报告；
  示例、测试 fixture、受环境保护的引用和无敏感性的内部服务名不报告。
- YAML 检查隐式布尔/数字转换、anchor/alias 误用和字符串未引用造成的解析差异。
- properties 检查重复 key、转义、编码、占位符和多语言文件 key 是否同步。

## package.json

- scripts 拼接不可信输入时，确认该输入可到达 shell 或解释器且缺少引用/allowlist 后报告；跨平台问题需有目标平台证据。
- 新增 `latest`、`*`、动态或 SNAPSHOT 生产依赖时，只有仓库要求可复现、版本漂移会进入发布路径，
  或实际放宽到不兼容主版本时报告；开发工具或项目明确允许的范围不报告。
- 依赖分组冲突、清单与锁文件不同步时，只有会改变生产安装、解析版本或构建结果时报告。
- scripts 使用的 eslint、jest、prettier 等工具必须能从声明依赖或仓库工具链中获得。
- 检查不存在或拼错的脚本、入口、exports、types、files 和 engines。
- 升级依赖时关注破坏性版本、运行时要求、许可证和供应链风险。

## Maven 与 Gradle

- 检查依赖 scope/configuration、版本冲突、插件版本、仓库来源和传递依赖排除。
- 构建依赖本机路径、动态版本或隐式环境状态时，只有 CI/发布可达路径因此不可复现或失败时报告。
- 检查测试、打包、资源过滤、Java/Kotlin 目标版本和多模块依赖方向。
- 新增生产 Maven `SNAPSHOT` 或 Gradle 动态/SNAPSHOT 版本时，按上面的可复现性标准报告，只检查本次新增/修改的版本行。

## Cargo.toml 与 composer.json

- Cargo 检查 edition、MSRV、resolver、feature 的可加性、optional dependency 暴露和默认 feature 膨胀。
- Composer 检查 PHP/ext 约束与 CI/部署、PSR-4/autoload、`allow-plugins`、minimum-stability、
  replace/provide/conflict 和生产/开发依赖边界。
- 锁文件、最低运行时版本、autoload、脚本钩子和发布 include/exclude 只有存在可证明的不一致或发布影响时报告。
- Git/VCS 依赖未固定可信 revision、公共发布依赖本地路径或明文仓库时，确认进入安装/发布路径后报告。
- 不凭记忆报告依赖漏洞；需要 resolved version 与可靠 advisory 证据。

## Shell 与 PowerShell

- 外部输入进入命令、路径、glob、`Invoke-Expression`、`eval`、`sh -c` 或动态脚本片段时，确认可控边界和
  缺少参数化、引用或 allowlist 后报告命令注入。
- 检查错误传播、退出码、管道失败、临时文件、工作目录和清理逻辑；只有失败会被误报为成功、修改错误目标或
  遗留资源时报告。
- 跨平台脚本仅在仓库支持的 shell/操作系统组合可证明不兼容时报告；不要按个人终端偏好要求重写。

## 不应报告

- 没有实际解析或运行差异的纯排序、引号和格式偏好。
- 已由生成工具管理且源清单正确的机械化输出差异。
- 锁文件通常不逐行人工解释；重点核对它是否与清单同步、来源/完整性字段是否异常、关键包是否
  意外降级/跨主版本，以及 resolved platform 是否仍符合 CI/部署。仅在可靠 advisory 适用时报告漏洞。
