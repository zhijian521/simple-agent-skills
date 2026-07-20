# CSS / SCSS / Less 规范

仓库已有的格式化配置、CSS 架构和设计 token 优先；本文件只补充项目未规定的默认做法。

## 样式组织

- 同组件样式就近放置
- 页面私有样式优先放页面内
- 明确复用的变量、混入、公共类再上提
- 不建大而乱的 `common.css`

推荐目录：

```
src/
├── styles/
│   ├── variables.scss
│   ├── mixins.scss
│   └── reset.scss
├── components/
│   └── user-card/
│       ├── index.vue
│       └── index.scss
```

## 代码风格

- 缩进：2 空格
- 选择器与 `{` 保留一个空格
- 每行一个属性声明，末尾分号
- 零值不加单位：`margin: 0`
- 颜色小写简写：`#fff`
- 禁止 `!important`
- 避免 ID 选择器
- SCSS 嵌套不超过 3 层

## 命名

- 优先清晰直接的短类名
- CSS Modules 或 scoped 时 BEM 非必须
- 全局样式可用 BEM：`.card__title`、`.card--featured`
- 状态类：`.is-active`、`.is-disabled`

## 布局

- 首选 Flex 和 Grid
- 布局属性与视觉属性分组书写
- 能用 `flex: 1` 解决时不引入额外百分比和包裹层

## 响应式

Mobile First：先写移动端样式，`min-width` 逐层覆盖。

```css
@media (min-width: 576px) {
} /* 小型平板 */
@media (min-width: 768px) {
} /* 平板 */
@media (min-width: 992px) {
} /* 桌面 */
@media (min-width: 1200px) {
} /* 大屏 */
```

## CSS 变量

优先复用项目已有的设计 token。只有跨组件稳定复用的颜色、间距、字号等视觉刻度才新增 token；局部差异可定义在组件根节点，不强行放到 `:root`。

```css
/* 仅在项目没有既有 token 体系时，使用这一命名方式。 */
:root {
  --color-primary: #06c;
  --color-text: #1a1a1a;
  --space-sm: 8px;
  --space-md: 16px;
  --font-size-base: 14px;
}
```

## z-index 分层

| 层级   | 范围    | 用途              |
| ------ | ------- | ----------------- |
| 内容层 | 0-99    | 普通元素          |
| 浮层   | 100-199 | Dropdown、Tooltip |
| 遮罩层 | 200-299 | Modal 遮罩        |
| 弹窗层 | 300-399 | Modal 内容        |
| 通知层 | 400-499 | Toast、Loading    |

## 动画

- 只用 `transform` 和 `opacity`（不触发重排）
- 避免 `width`/`height`/`top`/`left` 做动画
- 必须支持 `prefers-reduced-motion`

## 清理

- 删除未引用的选择器和废弃样式
- 删除父子节点重复的属性声明
- 合并相同或高度相似的规则
- 同一语义的状态色用变量/循环统一生成

## 禁止项

- 选择器嵌套过深
- 大量 `!important`
- 视觉值到处硬编码
- 全局类污染局部组件
- SCSS `@extend`（用 `@mixin` 代替）
