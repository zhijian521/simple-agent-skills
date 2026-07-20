# Next.js 规范

## 项目优先

先读取 `next.config.*`、`package.json`、路由目录和已有页面模式。遵循项目当前使用的 App Router 或 Pages Router，不在普通功能改动中迁移路由体系。

## Server 与 Client 边界

- 默认保持组件为 Server Component；只有需要状态、浏览器 API、事件处理或客户端 Hook 时才添加 `'use client'`。
- Client Component 不导入数据库、密钥、服务端环境变量或 Node-only 模块。
- 数据获取优先放在最靠近数据需求的 Server Component、Route Handler 或项目既有数据层；避免无必要的客户端二次请求。

## 路由与数据

- 保持页面、布局、加载态和错误边界与现有路由目录一致。
- 动态参数、缓存、重验证和 metadata 遵循当前 Next.js 版本与项目既有写法。
- Route Handler 的鉴权、输入校验与错误处理同时遵循 `api.md`。

## 资源与性能

- 图片、字体、脚本和动态导入优先采用项目既有的 Next.js 集成方式。
- 先确认首屏、bundle 或交互瓶颈，再进行懒加载、拆包或缓存调整。
- 不把仅用于服务端的依赖带进 Client Component，也不为小型组件机械动态导入。
