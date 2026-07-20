# HTML 规范

项目模板格式、框架编译约束和现有组件库优先；本文件只补充语义与平台通用规则。可访问性细节同时读取 `accessibility.md`。

## 核心原则

**语义化**：用标签描述内容含义，不只堆 `<div>`。**可访问性**：屏幕阅读器和搜索引擎能正确理解页面结构。

## 基本模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="页面描述" />
    <title>页面标题</title>
  </head>
  <body></body>
</html>
```

## 规范要点

| 项                | 要求                                                |
| ----------------- | --------------------------------------------------- |
| DOCTYPE           | `<!DOCTYPE html>`                                   |
| 编码              | UTF-8                                               |
| 语义化            | `<header>` `<nav>` `<main>` `<footer>` 替代 `<div>` |
| 属性与格式        | 遵循项目 formatter 和相邻模板                      |
| 标签闭合          | 遵循 HTML 或框架语法，不制造歧义                    |
| 内联样式          | 静态视觉样式优先项目样式系统；运行时尺寸、坐标和 CSS 变量可按需使用 |
| `target="_blank"` | 加 `rel="noopener noreferrer"`                      |
| 图片              | 必须有 `alt`；装饰图使用空 `alt`，信息图描述其目的   |

## 属性书写顺序

遵循项目 formatter、Lint 或组件库约定。没有约定时保持同类属性相邻，不为排序产生无意义 diff。

## 表单

- 每个表单控件必须有可访问名称；优先使用可见 `<label>`，仅无可见标签场景使用 `aria-label` 或 `aria-labelledby`
- `autocomplete` 用标准值
- input type 用语义化类型（`email`、`tel`、`number`）
- 必填字段加 `required` + 视觉标识

## 图片

```html
<!-- 非首屏内容图片示例 -->
<img
  srcset="img-480.jpg 480w, img-800.jpg 800w"
  sizes="(max-width: 600px) 480px, 800px"
  src="img-800.jpg"
  alt="产品图片"
  loading="lazy"
/>
```

## 资源提示

只对确认会立即使用并影响关键渲染路径的资源使用 `preload`；只对高概率后续导航使用 `prefetch`。过度提示会竞争带宽。

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
<link rel="prefetch" href="/page-2.js" />
<link rel="preconnect" href="https://api.example.com" />
```

## iframe

- 提供描述内容或用途的 `title`
- 非首屏 iframe 可使用 `loading="lazy"`
- 根据内容来源和业务能力配置最小 `sandbox`、`allow` 与来源限制；不要机械添加导致合法功能失效的权限

## 分区注释

只在长模板的主要区域边界不清晰时添加，不逐标签复述结构。

```html
<!-- 页面头部 -->
<header>...</header>
<!-- 主要内容区 -->
<main>...</main>
```
