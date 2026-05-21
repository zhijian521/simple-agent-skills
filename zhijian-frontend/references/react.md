# React 组件规范

函数组件 + Hooks，禁止 Class 组件。

## 函数组件

```tsx
import { useState, useCallback, useMemo } from 'react';
import type { FC } from 'react';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export const UserCard: FC<UserCardProps> = ({ user, onEdit }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleEdit = useCallback(() => {
    onEdit?.(user);
  }, [onEdit, user]);

  const displayName = useMemo(() =>
    user.nickname || user.name,
  [user]);

  return (
    <div>
      <h3>{displayName}</h3>
      <button onClick={handleEdit}>编辑</button>
    </div>
  );
};

UserCard.displayName = 'UserCard';
```

## 规范要点

| 项 | 要求 |
|------|------|
| 组件类型 | 函数组件 + Hooks |
| Props | TypeScript interface 定义 |
| 自定义 Hook | `use` 前缀 |
| 事件处理 | `handle` 前缀 |
| 组件大小 | 不超过 300 行 |
| JSX 内联函数 | 避免，用 `useCallback` 包裹 |
| displayName | 必须设置 |

## useEffect

- 订阅、定时器、事件监听必须在 return 中清理
- 依赖数组不省略，避免死循环

## 性能

- 纯展示子组件用 `React.memo`
- 重计算用 `useMemo`
- 传给子组件的回调用 `useCallback`
- 列表 `key` 用唯一 ID，禁止用 index
- 非首屏组件 `lazy()` + `<Suspense>`

## Context

只有真正跨多层级共享的数据才放 Context（主题、语言、认证），不替代 Props。

## 禁止项

- Class 组件
- 列表 `key` 用 index
- `useEffect` 无清理函数
- JSX 中直接写内联函数/对象
- `dangerouslySetInnerHTML` 无 DOMPurify
