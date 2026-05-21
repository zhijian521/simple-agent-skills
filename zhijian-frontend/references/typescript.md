# TypeScript 规范

## 严格模式

`tsconfig.json` 必须开启 `strict: true`。

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

## 类型定义

- 对象形状优先 `interface`
- 联合类型、映射、工具类型组合优先 `type`
- 输入不可信时优先 `unknown`，收到后做类型收窄
- 返回值复杂或关键时显式标注返回类型

```ts
interface User {
  id: string;
  name: string;
  age?: number;
}

type UserRole = 'admin' | 'editor' | 'viewer';
type ApiResponse<T> = { code: number; data: T; message: string };
```

## type vs interface

| 场景 | 使用 |
|------|------|
| 对象形状定义 | `interface`（可 extend，报错信息更清晰） |
| 联合类型、交叉类型 | `type` |
| 工具类型组合 | `type` |
| 函数签名 | `type` |

## 泛型

- 命名带语义：`TItem`、`TResponse`
- 公共类型放清晰位置，避免循环依赖

```ts
type PartialUser = Partial<User>;
type UserPreview = Pick<User, 'id' | 'name'>;
```

## 类型使用

- 非空断言 `!` 谨慎使用
- `as` 仅在类型已充分收窄时使用
- `import type` 明确类型导入，编译后移除
- `as const` 收窄字面量类型

## 数据处理

- `filter`/`map`/`reduce` 后结果类型要清晰可推导
- 连续多步转换过长时拆成具名步骤或具名类型
- 不为了类型安全把接口每个字段都补默认值

反例：
```ts
const user = { id: res.id ?? '', name: res.name ?? '', mobile: res.mobile ?? '' };
```
正例：
```ts
const user = res as UserResponse;
const displayName = user.name || '-';
```

## 异步与错误

- 默认 `async/await`
- 独立异步任务优先 `Promise.all`
- 区分请求失败、业务失败、空数据
- 错误兜底不吞掉上下文

## 模块设计

- 导出内容保持克制
- 工具函数按领域聚合（`date.ts`、`number.ts`），不建 `common`/`helper` 大杂烩
- 常量、类型、纯函数尽量靠近使用处，明确复用后再上提

推荐目录：
```
src/
├── api/
│   ├── auth.ts
│   └── user.ts
├── utils/
│   ├── date.ts
│   └── number.ts
├── constants/
│   └── user.ts
└── views/
    └── user-center/
        ├── index.vue
        └── types.ts
```

## 禁止项

- `any` 到处透传
- 一边断言一边猜类型
- 用工具类型把简单问题写复杂
- 为了"保险"对接口字段逐项重组默认值
