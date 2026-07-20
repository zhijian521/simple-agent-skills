# HTML 规范

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
| 属性引号          | 双引号                                              |
| 标签闭合          | 不省略可选关闭标签                                  |
| 缩进              | 2 空格                                              |
| 内联样式          | 禁止                                                |
| `target="_blank"` | 加 `rel="noopener noreferrer"`                      |
| 图片              | 必须写 `alt`                                        |

## 属性书写顺序

1. `class`
2. `id`（尽量少用）
3. `name`、`data-*`
4. `src`、`type`、`href`、`value`
5. `placeholder`、`title`、`alt`
6. `aria-*`、`role`
7. `required`、`readonly`、`disabled`

## 表单

- 每个 input 必须有 `<label>` 或 `aria-label`
- `autocomplete` 用标准值
- input type 用语义化类型（`email`、`tel`、`number`）
- 必填字段加 `required` + 视觉标识

## 图片

```html
<img
  srcset="img-480.jpg 480w, img-800.jpg 800w"
  sizes="(max-width: 600px) 480px, 800px"
  src="img-800.jpg"
  alt="产品图片"
  loading="lazy"
/>
```

## 资源预加载

```html
<link rel="preload" href="/fonts/main.woff2" as="font" crossorigin />
<link rel="prefetch" href="/page-2.js" />
<link rel="preconnect" href="https://api.example.com" />
```

## iframe

- 必须加 `sandbox` 属性
- 加 `loading="lazy"`
- 加 `title` 描述内容

## 分区注释

```html
<!-- 页面头部 -->
<header>...</header>
<!-- 主要内容区 -->
<main>...</main>
```
