# 性能规范

首屏 ≤ 2 秒，交互响应 ≤ 100ms。关键是养成好习惯。

## 代码优化

| 方向 | 措施 |
|------|------|
| 代码分割 | 路由懒加载、组件动态导入 |
| 按需引入 | `import { debounce } from 'lodash-es'` 而非全量 |
| 重渲染控制 | `useMemo`/`computed`、`useCallback`、`React.memo` |
| 长列表 | 虚拟滚动 |

```ts
// 路由懒加载
const routes = [{
  path: '/dashboard',
  component: () => import('@/pages/Dashboard.vue'),
}];

// React
const Dashboard = lazy(() => import('./pages/Dashboard'));
```

## 图片

- WebP/AVIF 优先，`<picture>` 降级
- `loading="lazy"` 懒加载
- `srcset` 响应式尺寸
- Hero 图片 `fetchpriority="high"`

```html
<picture>
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" loading="lazy" alt="">
</picture>
```

## 资源加载

| 资源 | 策略 |
|------|------|
| 关键 CSS | 内联 `<head>`，非关键延迟 |
| 关键 JS | `async` 不阻塞渲染 |
| 字体 | `font-display: swap` + `preload` + 子集化 |
| 第三方脚本 | 异步、按需、超 50KB 需审批 |

## Core Web Vitals

| 指标 | 目标 | 说明 |
|------|------|------|
| LCP | ≤ 2.5s | 最大内容绘制 |
| INP | ≤ 200ms | 交互响应延迟 |
| CLS | ≤ 0.1 | 累积布局偏移 |

## 请求优化

- 互不依赖的请求 `Promise.all` 并行
- 组件卸载时取消未完成请求（`AbortController`）
- 短时间内相同请求自动去重
- 优先 stale-while-revalidate 缓存

## Bundle 检查

```shell
npx vite-bundle-visualizer
# 引入新依赖前先查 bundlephobia.com
```
