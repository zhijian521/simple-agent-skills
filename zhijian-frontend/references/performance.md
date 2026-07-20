# 性能规范

先测量，再优化。性能目标应结合用户设备、网络、数据规模和项目 SLA；不要只凭代码形态推断瓶颈。

## 衡量基线

Core Web Vitals 可作为 Web 项目的通用参考目标，按真实用户数据的第 75 百分位评估：

| 指标 | 良好参考值 | 说明 |
| --- | --- | --- |
| LCP | ≤ 2.5s | 最大内容绘制 |
| INP | ≤ 200ms | 交互响应延迟 |
| CLS | ≤ 0.1 | 累积布局偏移 |

这些值不是所有项目的固定 SLA。优先使用项目已有监控、性能预算、浏览器 Performance 面板或 Lighthouse 建立基线。

## 代码优化

| 现象 | 可能措施 | 使用前提 |
| --- | --- | --- |
| 首包明显过大 | 路由级拆包、动态导入、减少依赖 | 先用项目已有分析工具定位主要体积来源 |
| 重复昂贵计算 | 缓存、调整数据结构 | 计算成本已被测量，且缓存失效逻辑可靠 |
| 无效重渲染 | 缩小状态范围、稳定 props、memoization | Profiler 能证明渲染成本与频率值得优化 |
| 大列表卡顿 | 分页、增量渲染、虚拟滚动 | 真实数据规模已产生可感知卡顿 |

```ts
// 仅在项目路由方案支持且能减少关键路径体积时使用
const routes = [
  {
    path: "/dashboard",
    component: () => import("@/pages/Dashboard.vue"),
  },
];

// React
const Dashboard = lazy(() => import("./pages/Dashboard"));
```

## 图片

- 优先采用项目框架已有的图片优化方案
- 非首屏图片按需懒加载；LCP 候选图不要机械添加 `loading="lazy"`
- 提供与实际展示尺寸匹配的响应式图片，避免传输过大资源
- WebP/AVIF 等现代格式应保留兼容回退或交由框架处理

```html
<picture>
  <source srcset="img.webp" type="image/webp" />
  <img src="img.jpg" srcset="img-480.jpg 480w, img-800.jpg 800w" sizes="(max-width: 600px) 480px, 800px" alt="" />
</picture>
```

## 资源加载

- 只 preload 已确认影响关键渲染路径、且会立即使用的资源
- 第三方脚本延迟或按需加载，并衡量其主线程与网络开销
- 字体加载策略遵循项目框架；需要时使用 `font-display`、子集化和有限 preload
- 不手工内联大段关键 CSS，除非项目构建方案已有支持且收益经过验证

## 请求优化

- 互不依赖的请求 `Promise.all` 并行
- 可能产生过期写入、竞态或无效流量时取消请求
- 重复请求、缓存和 stale-while-revalidate 遵循项目已有数据层，不重复造轮子
- 并行前确认接口限流、依赖顺序和资源上限

## Bundle 检查

- 优先使用项目已安装的 bundle analyzer 或构建报告
- 引入新依赖前比较原生能力、现有依赖、体积、维护状态和安全风险
- 不为一次检查直接安装或执行未经确认的远程工具
