# 通用代码规范

核心原则：**可读优先、一致至上、极简原则**。

## 决策顺序

开始写代码前：
1. 能否在现有文件内完成
2. 能否用更直接的实现完成
3. 是否真的需要新增抽象、工具函数、组件、hook、composable、store
4. 是否能让后续维护者一眼看懂

新文件、新抽象、新目录没有明显收益就不创建。

## 代码风格

- 缩进：2 空格
- 引号：单引号，模板字符串用反引号
- 分号：语句末尾保留
- 尾逗号：多行对象、数组、参数列表保留
- 文件末尾：保留一个空行
- 行宽：尽量不超过 120，最多 160

## 命名

| 类别 | 规则 | 示例 |
|------|------|------|
| 变量/函数 | `camelCase` | `userName`、`getUserInfo` |
| 组件/类/类型/接口 | `PascalCase` | `UserCard`、`OrderStatus` |
| 常量 | `UPPER_SNAKE_CASE` | `MAX_SIZE`、`API_BASE_URL` |
| 文件名 | `kebab-case` | `date-formatter.ts` |
| 布尔值 | `is`/`has`/`can` 前缀 | `isLoading`、`hasPermission` |
| 事件处理函数 | `handle` + 事件名 | `handleClick`、`handleSubmit` |
| 事件回调 prop | `on` + 事件名 | `onClick`、`onChange` |
| 路由 path | kebab-case | `/user-profile` |
| 路由 name | camelCase | `userProfile` |

禁止：拼音命名、自造缩写（`usrNm`）、无意义名称（`data`、`temp`、`item1`）。

## 注释

- 默认少写注释，优先写自解释代码
- 注释用于说明意图、边界、约束，不复述代码表面行为
- 注释默认用中文，`TODO`/`FIXME`/`NOTE` 等标记可保留英文
- 对外导出且副作用明显的方法 → 必须 JSDoc
- 关键配置对象、特殊兼容逻辑、复杂字段转换 → 必须注释

分区注释格式：
- 模板：`<!-- 区块名 -->`
- 脚本：`/*== 区块名 ==*/`
- 样式：`/*== 区块名 ==*/`

JSDoc 示例：
```ts
/**
 * 根据用户 ID 获取用户信息
 * @param userId - 用户唯一标识
 * @returns 用户信息对象，失败时返回 null
 */
async function fetchUser(userId: string): Promise<User | null> { /* ... */ }
```

## 导入顺序

1. 第三方依赖
2. 项目别名（`@/`）
3. 相对路径

每组间空一行，`type` 导入放各组末尾。不使用 `import * as`，不保留未使用导入。

## 复杂度控制

- 优先提前返回，减少嵌套
- `return` 后不跟 `else`
- 单个函数只做一件事（原则不超过 80 行）
- 嵌套超 3 层优先重构
- 无意义中间变量直接内联
- 参数超 4 个用 options 对象

正例：
```ts
function processOrder(order) {
  if (!order) return null;
  if (order.status !== 'pending') return null;
  return validate(order);
}
```

## 错误处理

- 异步默认 `async/await`
- 独立异步任务优先 `Promise.all`
- `catch` 不能为空
- 区分请求失败、业务失败、空数据三种情况
- 在入口处校验关键结构，不在业务代码里到处零散兜底
- 用户可感知的失败给明确反馈

## 配置与常量

- 接口地址、key、超时、分页默认值、业务枚举统一抽离
- 优先放 `config`、`constants`、`env` 或项目既有集中位置

## 提交信息

格式：`<type>(<scope>): <summary>`

常用 type：`feat` `fix` `refactor` `perf` `style` `docs` `test` `build` `chore`

一个提交只表达一类改动，summary 用简洁中文。

## 禁止项

- 过度设计、无意义封装
- 单次复用也强行抽公共层
- 逻辑散落多个文件来回跳转
- 接口字段逐项补默认值
- 配置和 key 写死在业务文件
- 复制旧代码后只改局部变量名
- `var`、`==`、`console.log` 留在生产代码
- 定时器/事件监听不加清理
