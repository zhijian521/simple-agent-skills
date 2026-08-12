# 规则路由表

先读取 `general.md`，再根据路径匹配下列规则。一个文件可以同时匹配多条规则。

| 路径或文件类型 | 加载规则 |
|---|---|
| `*.ts`, `*.js`, `*.tsx`, `*.jsx` | `languages/typescript-javascript.md` |
| `*.java`, `*.kt` | `languages/java-kotlin.md` |
| `*.go` | `languages/go.md` |
| `*.py` | `languages/python.md` |
| `*.rs`, `*.c`, `*.cc`, `*.cpp`, `*.hpp`, `*.php`, `*.phtml`, `*.ets`, `*.astro`, `*.hs`, `*.lhs`, `*.jl`, `*.nim`, `*.nims`, `*.nimble` | `languages/other-languages.md` 对应章节 |
| `*.json`, `*.json5`, `*.yaml`, `*.yml`, `*.properties` | `scenarios/config-dependencies.md` |
| `package.json`, `pom.xml`, `build.gradle`, `Cargo.toml`, `composer.json` | `scenarios/config-dependencies.md` |
| `package-lock.json`, `npm-shrinkwrap.json`, `pnpm-lock.yaml`, `yarn.lock`, `bun.lock*`, `Cargo.lock`, `composer.lock`, `gradle.lockfile`, `poetry.lock`, `uv.lock`, `Pipfile.lock` | `scenarios/config-dependencies.md` 与 `scenarios/change-risk.md` 的供应链章节 |
| `*sbom*.json`, `*sbom*.xml`, `*.spdx`, `*.spdx.json`, `*cyclonedx*.json`, `*cyclonedx*.xml` | `scenarios/change-risk.md` 的供应链章节 |
| `.github/workflows/*.yml`, `.github/workflows/*.yaml` | `scenarios/github-actions.md`，同时读取 `scenarios/security.md` |
| `.github/**/*.yml`, `.github/**/*.yaml`（工作流除外） | `scenarios/github-config.md`，同时读取 `scenarios/config-dependencies.md` |
| `*.graphql`, `*.gql`, `*.proto`, `*.prisma`, `*mapper*.xml`, `*dao*.xml` | `scenarios/data-contracts.md` |
| `*.po`, `*.pot` | `scenarios/templates-localization.md` 的 PO/POT 章节 |
| `*.tf`, `*.tfvars`, `*.hcl`, `*.bicep`, `*.nix` | `scenarios/infrastructure.md` |
| `*.ftl`, `*.ftlh`, `*.ftlx`（FreeMarker） | `scenarios/templates-localization.md` 的 FreeMarker 章节；存在外部输入时再读 `scenarios/security.md` |
| 测试文件或行为变更 | `scenarios/testing.md` |

## 场景追加规则

- 用户输入、HTML、模板、查询、文件路径、URL、命令执行：加载 `scenarios/security.md`。
- 数据库访问、循环内 I/O、大集合、缓存、并发、重试：加载
  `scenarios/performance-reliability.md`。
- API、Schema、事件、序列化、持久化格式：加载 `scenarios/data-contracts.md`。
- 公开契约、发布、依赖供应链、隐私、交互界面或 AI/LLM：加载
  `scenarios/change-risk.md` 中对应章节。

上游项目的 35 份规则文档在本 Skill 中按主题合并。合并不代表一次加载全部规则；
只读取当前文件对应的章节，避免无关规则进入上下文并增加误报。
