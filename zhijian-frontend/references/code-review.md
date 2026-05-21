# Code Review 规范

## 审查目标

优先发现：
1. 正确性问题
2. 潜在回归
3. 安全问题
4. 性能风险
5. 可维护性问题
6. 缺失测试或验证

没有明确问题要明确写"未发现明确问题"，仍补充剩余风险和未验证项。

## 输出顺序

1. `Findings`
2. `Open Questions / Assumptions`
3. `Summary`

## Findings 写法

每条 finding 必须包含：
- 严重级别
- 文件路径 + 行号或定位
- 问题是什么
- 影响是什么
- 建议如何修复

## 审查检查项

### 通用

- 明显 bug 或边界遗漏
- 无收益抽象或过度拆分
- 死代码、未使用导入、无意义中间层
- 命名、结构、职责是否清晰
- 错误处理、空值处理是否完整

### TypeScript / JavaScript

- 是否滥用 `any`、`as`、非空断言
- 同步/异步/异常分支是否混成一团
- 定时器/事件监听是否清理

### Vue

- 模板计算是否过重
- 是否错误使用 `watch`
- 是否不必要引入 composable 或 store

### React

- 是否缺少 `useCallback`/`useMemo` 导致不必要重渲染
- `useEffect` 清理是否完整
- 列表 `key` 是否用 index

### 小程序 / uni-app

- 是否滥用平台专属 API
- 是否缺少用户可感知的失败提示
- 跨端兼容风险

### 安全

- 是否存在 XSS 风险（`innerHTML`、`v-html`、`dangerouslySetInnerHTML`）
- Token 是否存 localStorage
- 敏感信息是否硬编码

### 性能

- 是否可并行的请求写成串行
- 大列表是否缺少虚拟滚动
- 图片是否缺少懒加载

## 审查原则

- 只报告真实值得修的问题
- 结论要具体，不能说"不好"，要说明风险与修法
