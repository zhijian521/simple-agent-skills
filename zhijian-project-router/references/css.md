# CSS / SCSS / Less 规范

适用于 `.css`、`.scss`、`.less` 与 Vue `<style>` 区块。

## 样式组织

- 同一组件的样式优先就近放置
- 页面私有样式优先放页面内，不急着抽全局
- 明确复用的变量、混入、公共类再上提
- 样式文件按组件或业务模块组织，不建大而乱的 `common.css`

推荐目录示例：

```text
src/
├── styles/
│   ├── variables.scss
│   ├── mixins.scss
│   └── reset.scss
├── components/
│   └── app-card/
│       ├── index.vue
│       └── index.scss
└── views/
    └── user-center/
        ├── index.vue
        └── index.scss
```

## 命名与选择器

- 类名简短、语义化
- 优先类选择器，少依赖标签选择器
- 选择器层级尽量浅
- 状态类使用稳定语义，如 `.is-active`、`.is-disabled`

## 布局

- 首选 Flex 和 Grid
- 布局属性与视觉属性分组书写
- 不为了简单布局引入过深容器

## 变量与复用

- 颜色、字号、圆角、阴影等重复值优先抽变量
- 复用样式优先 mixin、placeholder 或受控公共类
- 不要为了复用一两行样式制造复杂继承链

## 禁止项

- 选择器嵌套过深
- 大量 `!important`
- 视觉值到处硬编码
- 用全局类污染局部组件
