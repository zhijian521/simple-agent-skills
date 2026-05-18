# simple-agent-skills

单入口 Agent 规范技能集，目标是解决项目开发中常见的代码生成问题，让 Agent 输出更稳定、更统一、更简洁。

## 这个 skill 要解决什么问题

我创建这套 skill，主要是为了压住 Agent 在项目开发里经常出现的这些问题：

- 结构复杂，简单需求被拆成很多层
- 无必要新增文件、目录、组件、hook、composable、utils
- 为了“安全”堆很多无意义空判断
- 接口返回数据被逐字段补默认值、逐字段重新组装
- 配置、接口地址、storage key、magic string 写死在业务文件
- 格式不统一、代码冗余、注释要么太多废话要么缺关键说明
- 项目结构、文件职责、语言与框架写法不统一

这套 skill 的目标不是只做“规范说明”，而是同时做两件事：

1. 压制坏习惯
2. 提供正向规范

## 当前结构

仓库现在只对外暴露一个 skill：

- `zhijian-project-router`

这个 skill 内部再按需读取：

- `zhijian-project-router/references/guardrails.md`
- `zhijian-project-router/references/output-contract.md`
- `zhijian-project-router/references/code-standards.md`
- `zhijian-project-router/references/javascript.md`
- `zhijian-project-router/references/typescript.md`
- `zhijian-project-router/references/css.md`
- `zhijian-project-router/references/vue.md`
- `zhijian-project-router/references/mini-program.md`
- `zhijian-project-router/references/code-review.md`

其中已经内置一组“前端代码精简优化”规则，分散吸收到以上 reference 中，用于处理：

- 删除死代码、无用 class、无用样式、重复样式
- 减少模板和页面结构中的无意义嵌套
- 约束 CSS 命名、状态样式和公共样式提取
- 使用中文分区注释提升可读性，`TODO` 等固定标记可保留英文
- 在不改变业务逻辑和 UI 效果的前提下做前端整理

## 设计思路

这套 skill 采用“双层结构”：

### 1. 压制层

`guardrails.md` 优先级最高，专门压制 Agent 的常见坏习惯，例如：

- 不要无必要新增文件
- 不要无必要抽公共层
- 不要为了保险堆空判断
- 不要逐字段补默认值
- 不要把配置和 key 写死在业务文件
- 不要写废话注释

### 2. 规范层

其它 references 负责给出推荐写法、目录结构、文件职责、正例和反例，例如：

- `code-standards.md`: 通用代码规范
- `javascript.md`: JavaScript 规范
- `typescript.md`: TypeScript 规范
- `css.md`: CSS / SCSS / Less 规范
- `vue.md`: Vue 3 规范
- `mini-program.md`: 微信小程序 / uni-app 规范
- `code-review.md`: 审查输出规范
- `output-contract.md`: 回复输出规范

## router 如何工作

`zhijian-project-router` 的职责不是重复写所有规则，而是：

1. 识别当前任务类型
2. 识别当前项目类型
3. 先读取压制层
4. 再读取对应规范层
5. 最后按组合后的规则输出结果

它会重点判断：

- 当前是开发、修改、重构，还是 review
- 当前任务是不是“代码优化 / 精简 / 整理 / 简单简洁易懂”类请求
- 当前项目是 TypeScript 还是 JavaScript
- 当前项目是不是 Vue Web
- 当前项目是不是微信小程序 / uni-app
- 当前任务是否涉及样式

## 推荐使用方式

安装时：

- 只安装 `zhijian-project-router`

使用时：

- 只显式调用 `zhijian-project-router`

执行时：

- 先读 `guardrails.md`
- 再读 `output-contract.md`
- 再读 `code-standards.md`
- 然后根据项目类型继续读 JS / TS / CSS / Vue / 小程序 / review 对应 reference
- 如果是前端精简优化类任务，重点执行 reference 中已经吸收的删除冗余、减少嵌套、样式简化规则

## 为什么做成单入口

这样做有几个明显好处：

- 使用成本低，以后只用一个 skill
- 不需要每次手工选择 Vue、TS、CSS、review 等多个 skill
- 能先统一压制坏习惯，再补充具体规范
- 后续扩展 React、Next.js、Node.js、Python 也更自然

## 后续扩展方向

后面这套 skill 还可以继续补强：

- `mini-program.md` 增加更多压制项和正反例
- `css.md` 增加更多反例
- router 增加更细的任务类型判断
- 增加 React / Next.js / Node.js / Python 专项 reference
