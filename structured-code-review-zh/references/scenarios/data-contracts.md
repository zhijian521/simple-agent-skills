# 数据契约与持久化规则

## 通用契约

- 检查字段新增、删除、重命名、类型、可空性、默认值、枚举和错误语义兼容性。
- 生产者与消费者升级顺序可能不同；新旧版本必须在滚动发布期间兼容。
- 不要复用已发布字段编号、枚举值或语义；弃用优先于立即删除。
- 输入限制、分页、排序、时间区、精度、编码和大小必须明确。

## Protobuf

- 不复用或更改已发布 field number；删除字段后同时保留 number 与 name 到 `reserved`。
- 改变类型、optional/repeated、oneof 成员或 `json_name` 时检查 wire 与 JSON 兼容性。
- 当“缺失”和零值语义不同，检查 proto3 `optional`/presence；不要机械要求所有字段 optional。
- 枚举零值应为安全的 `*_UNSPECIFIED` 等哨兵；不要复用已发布数字或依赖有业务含义的隐式零值。
- 非幂等 RPC 不得暗示可安全重试；流式 RPC 检查 flow control、deadline 和负载上限。
- 不可信 `Any` 需要类型白名单；递归消息、repeated/map 和 payload 需要应用层大小/深度边界。

## GraphQL

- 删除或重命名已发布 type/field/enum/argument、修改不兼容类型、为已有字段新增无默认值的必填参数，
  或把输入从 nullable 改为 non-null，通常是破坏性变化。
- 新增 type/field/enum 或可选参数通常兼容，不要把纯增量变更报告为破坏性问题。
- Schema/operation 文件只检查可观察事实：不可达类型、`__` 保留名、无上限 list、fragment cycle、
  未定义变量、缺少 leaf selection、空原因的 `@deprecated` 等。
- 不得仅从 SDL 推测 resolver 授权、N+1、DataLoader 或运行时 introspection；只有同时审查相关实现时才判断。
- 深度/复杂度 DoS、敏感字段暴露也必须能从 schema、operation 或同一变更中的配置直接证明。

## OpenAPI 与 Swagger

- 删除或重命名已发布的 path、operation、参数、响应字段、security scheme，或把已有输入从可选改为必填时，
  先确认存在旧客户端或滚动发布路径，再报告兼容性缺陷。
- 请求参数的 `required`、`nullable`、`default`、`enum`、format、边界和序列化位置必须与服务端实现一致；
  只有同一变更或仓库测试能证明不一致时报告。
- 响应状态码、错误体和分页/游标契约发生改变时，检查调用方和 SDK 是否会把失败误判为成功。
- 不从 OpenAPI 文件单独推断运行时鉴权或业务权限；`security` 声明与实现不一致需要相关路由或 middleware 证据。

## Prisma 与数据库 Schema

- 迁移检查锁表、全表回写、不可逆数据丢失、默认值和部署先后顺序。
- 新增非空列应分阶段；索引必须匹配查询，同时考虑写放大和唯一性失败。
- relation、级联删除、时区、decimal 精度、枚举和软删除过滤保持一致。
- 报告 relation action、provider 特性、索引或 native type 前，读取 datasource provider、Prisma 版本、
  迁移历史和查询调用方；不要仅凭字段名称或假设数据规模要求索引。
- 检查 `relationMode`、`@id`/`@@id`、`@unique`、`@map`/`@@map` 是否改变数据库约束、
  generated client 名称、connect/upsert selector 或现有数据身份。
- datasource、generator、binary target 和 preview feature 必须与 CI/部署目标及当前 Prisma 版本兼容。

## SQL Migration

- 新增非空列、唯一约束、外键、类型收窄、表/列删除或全表回填时，检查已有数据、锁表时间和新旧应用部署顺序。
- 数据回填和批量更新只有表规模、锁范围或事务时长会影响生产时才要求分批、限速或可恢复设计。
- 不可逆迁移在发布可能回滚时，应有兼容阶段或明确的前滚方案；一次性开发环境迁移不按此报告。
- 对数据修改语句检查 `WHERE`、目标 schema、事务边界和幂等性；仅凭 SQL 格式不报告。

## Mapper/DAO XML

- SQL 使用参数绑定，动态标识符使用白名单；检查 where 条件遗漏导致全表更新/删除。
- result mapping、列别名、可空性、类型转换和分页必须与实体契约一致。
- 检查循环生成的大 IN、N+1、事务边界和数据库方言差异。

PO/POT 规则已拆到 `templates-localization.md`，不要在审查数据契约时自动加载本地化规则。
