# JavaScript 规范

适用于 `.js`、`.jsx` 文件。

## 数据处理

- 可读性优先于“函数式炫技”
- `map`、`filter`、`reduce` 适合时再用，不强行替代所有 `for`
- 连续多步转换过长时拆成具名步骤
- 能提前返回时不写层层包裹

推荐示例：

```js
const getEnabledUserNames = (list) => {
    const enabledList = list.filter(item => item.status === 'enabled');
    return enabledList.map(item => item.nickname);
};
```

```js
const buildUserOptions = (list) => {
    const result = [];

    for (const item of list) {
        if (!item.id || !item.nickname) continue;
        result.push({
            label: item.nickname,
            value: item.id,
        });
    }

    return result;
};
```

## 异步与错误

- 默认使用 `async/await`
- 一组独立异步任务优先考虑 `Promise.all`
- 区分请求失败、业务失败、空数据三种情况
- 错误兜底不要吞掉上下文

## 模块设计

- 模块导出内容保持克制
- 工具函数按领域聚合，不建 `common` / `helper` 大杂烩
- 常量、纯函数尽量靠近使用处，明确复用后再上提

推荐目录示例：

```text
src/
├── api/
│   ├── auth.js
│   └── user.js
├── utils/
│   ├── date.js
│   └── number.js
├── constants/
│   └── user.js
└── views/
    └── user-center/
        ├── index.vue
        └── helpers.js
```

## 禁止项

- 为了模仿 TypeScript 写大量伪类型注释
- 一边猜数据结构，一边直接深层访问
- 只有一处使用却抽成“通用工具”
