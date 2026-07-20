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

- 缩进、换行、属性排序与分号遵循项目 formatter、Stylelint 和相邻文件
- 零值不加单位：`margin: 0`
- 颜色格式遵循项目工具和 token，不为大小写或简写制造无关 diff
- 默认避免 `!important`；覆盖第三方样式、工具类或明确层叠边界时可在局部使用并说明原因
- 避免 ID 选择器
- SCSS 嵌套以生成选择器清晰、低特异性为准，不按固定层数机械判断

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

优先使用项目已有断点和容器策略。新项目可采用 Mobile First，但断点应由内容和设计系统决定，不复制固定设备宽度表。

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

## 层叠管理

- 优先减少层叠上下文和不必要的 `z-index`
- 多类浮层共存时复用项目已有层级 token；项目没有体系且冲突真实出现时再建立最小层级表
- 不在通用规范中规定固定数值区间

## 动画

- 动画优先使用 `transform` 和 `opacity`；其他属性只有在效果需要且性能可接受时使用
- 非必要动画应响应 `prefers-reduced-motion`，不能仅通过动画传达关键信息

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
- 难以追踪的跨模块 `@extend`；项目已局部使用且生成 CSS 可控时不机械替换
