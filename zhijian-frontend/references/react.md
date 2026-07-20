# React 组件规范

优先使用函数组件与 Hooks。只有维护既有 Class 组件时才沿用其现有模式。

## 函数组件

```tsx
import { useState } from "react";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  const [isExpanded, setExpanded] = useState(false);

  function handleEdit() {
    onEdit?.(user);
  }

  return (
    <div>
      <h3>{user.nickname || user.name}</h3>
      <button onClick={handleEdit}>编辑</button>
    </div>
  );
}
```

## 规范要点

| 项           | 要求                                                                |
| ------------ | ------------------------------------------------------------------- |
| 组件类型     | 函数组件 + Hooks                                                    |
| Props        | TypeScript interface 定义                                           |
| 自定义 Hook  | `use` 前缀                                                          |
| 事件处理     | `handle` 前缀                                                       |
| 组件大小     | 明显难以阅读或职责混杂时再拆分                                      |
| JSX 内联函数 | 简单表达式可直接使用；影响子组件引用稳定性或性能时再提取            |
| displayName  | 命名函数组件无需设置；`memo`、`forwardRef` 等调试名称不清晰时再设置 |

## useEffect

- 订阅、定时器、事件监听必须在 return 中清理
- 依赖数组不省略，避免死循环

## 性能

- 先确认存在可感知或可测量的性能问题
- 昂贵计算或确有引用稳定需求时再用 `useMemo`
- 传给已 memo 化子组件、且引用稳定确有收益的回调再用 `useCallback`
- 纯展示子组件频繁发生无效重渲染时再评估 `React.memo`
- 项目启用 React Compiler 时，优先依赖编译器优化，不机械补手工 memoization
- 列表 `key` 用唯一 ID，禁止用 index
- 按项目框架已有方式处理代码分割；不要为小组件机械加入 `lazy()`

## Context

只有真正跨多层级共享的数据才放 Context（主题、语言、认证），不替代 Props。

## 禁止项

- 列表 `key` 用 index
- `useEffect` 无清理函数
- `dangerouslySetInnerHTML` 无 DOMPurify
