# TypeScript 规范

## 导航

- 严格模式与类型定义
- 类型、泛型与外部数据
- 异步、模块设计与禁止项

## 严格模式

新项目或新包默认开启 `strict: true`。已有项目遵循当前 `tsconfig`，不要在局部任务中开启大量严格选项并制造无关错误；如需迁移，单独规划并逐步收敛。

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## 类型定义

- 对象形状优先 `interface`
- 联合类型、映射、工具类型组合优先 `type`
- API、JSON、URL、Storage、消息事件等外部输入先按 `unknown` 处理，在信任边界校验后再进入业务层
- 返回值复杂或关键时显式标注返回类型

```ts
interface User {
  id: string;
  name: string;
  age?: number;
}

type UserRole = "admin" | "editor" | "viewer";
type ApiResponse<T> = { code: number; data: T; message: string };
```

## type vs interface

| 场景               | 使用                                     |
| ------------------ | ---------------------------------------- |
| 对象形状定义       | `interface`（可 extend，报错信息更清晰） |
| 联合类型、交叉类型 | `type`                                   |
| 工具类型组合       | `type`                                   |
| 函数签名           | `type`                                   |

## 泛型

- 命名带语义：`TItem`、`TResponse`
- 公共类型放清晰位置，避免循环依赖

```ts
type PartialUser = Partial<User>;
type UserPreview = Pick<User, "id" | "name">;
```

## 类型使用

- 非空断言 `!` 谨慎使用
- `as` 只用于已经由运行时事实保证、但编译器无法推导的场景；不能用断言替代外部数据校验
- `import type` 明确类型导入，编译后移除
- `as const` 收窄字面量类型
- 对配置对象可使用 `satisfies` 校验形状并保留字面量推导

## 数据处理

- `filter`/`map`/`reduce` 后结果类型要清晰可推导
- 连续多步转换过长时拆成具名步骤或具名类型
- 不为了类型安全把接口每个字段都补默认值

反例：

```ts
const user = {
  id: res.id ?? "",
  name: res.name ?? "",
  mobile: res.mobile ?? "",
};
```

正例：在信任边界使用项目已有 schema 库或类型守卫校验，只对展示需要的字段兜底。

```ts
function isUserResponse(value: unknown): value is UserResponse {
  if (!value || typeof value !== "object") return false;
  const user = value as Record<string, unknown>;
  return typeof user.id === "string" && typeof user.name === "string";
}

if (!isUserResponse(response)) {
  throw new Error("用户数据格式错误");
}

const displayName = response.name || "-";
```

## 异步与错误

- 默认 `async/await`
- 独立异步任务优先 `Promise.all`
- 区分请求失败、业务失败、空数据
- 错误兜底不吞掉上下文

## 模块设计

- 导出内容保持克制
- 工具函数按领域聚合（`date.ts`、`number.ts`），不建 `common`/`helper` 大杂烩
- 常量、类型、纯函数尽量靠近使用处，明确复用后再上提；不要为遵循示例预建目录

## 禁止项

- `any` 到处透传
- 一边断言一边猜类型
- 用工具类型把简单问题写复杂
- 为了"保险"对接口字段逐项重组默认值
