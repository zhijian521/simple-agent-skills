# JavaScript 规范

## 变量声明

- 永远 `const`/`let`，禁止 `var`
- 字面量创建对象和数组
- 解构赋值减少中间变量
- 模板字符串替代 `+` 拼接

## 函数规范

- 原则不超过 80 行
- 参数不超过 4 个，超过用 options 对象
- 回调优先箭头函数
- 用 early return 减少嵌套
- 纯函数优先

反例：

```js
function processOrder(order) {
  if (order) {
    if (order.status === "pending") {
      if (order.amount > 0) {
        return validate(order);
      }
    }
  }
}
```

正例：

```js
function processOrder(order) {
  if (!order) return null;
  if (order.status !== "pending") return null;
  if (order.amount <= 0) return null;
  return validate(order);
}
```

## 异步处理

- 默认 `async/await`
- 互不依赖的请求用 `Promise.all` 并行
- `catch` 中至少记录错误 + 提示用户

## 数组与对象

- 扩展运算符做浅拷贝和合并
- `map`/`filter`/`reduce` 表达意图更清晰
- 严格相等 `===`

## 数据处理

- 不接口返回后逐字段补默认值

反例：

```js
const user = {
  id: res.id ?? "",
  name: res.name ?? "",
  mobile: res.mobile ?? "",
};
```

正例：

```js
const user = res;
const displayName = user.name || "-";
```

## 定时器与事件

- `setInterval`/`setTimeout` 在组件卸载时清除
- `addEventListener` 必须有对应 `removeEventListener`
- Vue 用 `onUnmounted`，React 用 `useEffect` return 清理

## 存储与 URL

- 非敏感 localStorage key 使用项目既有的命名空间前缀
- 禁止在 localStorage 存密码、Token
- URL 参数用 `encodeURIComponent` 编码
- 用 `URLSearchParams` 构建参数

## 模块

- 导出内容保持克制
- 工具函数按领域聚合
- 常量、纯函数靠近使用处，明确复用后再上提

## 禁止项

- `var`、`==`、`console.log` 留在生产代码
- 伪类型注释模仿 TypeScript
- 只有一处使用却抽成"通用工具"
- 接口字段逐项机械补默认值
