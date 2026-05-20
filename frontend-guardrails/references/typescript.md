# TypeScript 规范

适用于 `.ts`、`.tsx` 文件。

## 类型优先级

- 能写具体类型就不写 `any`
- 输入不可信时优先 `unknown`
- 对象结构优先 `interface`
- 联合、映射、工具类型组合优先 `type`
- 返回值复杂或关键时显式标注返回类型

推荐示例：

```ts
interface UserInfo {
    id: string;
    nickname: string;
    mobile?: string;
}

type UserStatus = 'enabled' | 'disabled';
```

## 类型使用原则

- 非空断言 `!` 谨慎使用
- `as` 仅在类型已被充分收窄时使用
- 泛型命名带语义，如 `TItem`、`TResponse`
- 公共类型放在清晰位置，避免循环依赖

类型文件示例：

```text
src/
└── views/
    └── user-center/
        ├── index.vue
        ├── types.ts
        └── components/
            └── UserProfileCard.vue
```

## 数据处理

- 数据处理同时关注可读性与类型稳定性
- 经过 `filter`、`map`、`reduce` 后，结果类型要清晰可推导
- 连续多步转换过长时拆成具名步骤或具名类型
- 不要为了类型安全把每个字段都补默认值

反例：

```ts
const user = {
    id: res.id ?? '',
    name: res.name ?? '',
    mobile: res.mobile ?? '',
};
```

正例：

```ts
interface UserResponse {
    id: string;
    name: string;
    mobile?: string;
}

const user = res as UserResponse;
const displayName = user.name || '-';
```

## 异步与错误

- 默认使用 `async/await`
- 一组独立异步任务优先考虑 `Promise.all`
- 区分请求失败、业务失败、空数据三种情况
- 错误兜底不要吞掉上下文

## 模块设计

- 模块导出内容保持克制
- 工具函数按领域聚合，不建 `common` / `helper` 大杂烩
- 常量、类型、纯函数尽量靠近使用处，明确复用后再上提
- 配置、常量、key 统一抽离，不写死在业务文件

推荐目录示例：

```text
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
- 为了“保险”对接口字段逐项重组默认值
