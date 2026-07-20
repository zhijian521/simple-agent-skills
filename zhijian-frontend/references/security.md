# 安全规范

违反任何一条，Code Review 直接打回。

## XSS 防护

| 危险                      | 安全替代                 |
| ------------------------- | ------------------------ |
| `el.innerHTML = input`    | `el.textContent = input` |
| `v-html="input"`          | 模板插值 `{{ input }}`   |
| `dangerouslySetInnerHTML` | 必要时用 DOMPurify 清洗  |

```ts
import DOMPurify from "dompurify";
const clean = DOMPurify.sanitize(input);
```

## 安全清单

| 项       | 要求                                                                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| HTTPS    | 生产环境强制，所有 API 用 HTTPS                                                                                                |
| 凭据存储 | 不在浏览器持久化密码、访问令牌或敏感个人信息；同源会话优先使用 HttpOnly、Secure、SameSite Cookie，其他方案遵循项目既有认证架构 |
| 敏感信息 | 禁止前端硬编码密钥、密码                                                                                                       |
| URL 参数 | 传递时 `encodeURIComponent` 编码                                                                                               |
| CSP      | 配置 Content Security Policy 头                                                                                                |
| iframe   | 加 `sandbox` 属性                                                                                                              |
| 依赖扫描 | `npm audit` 集成 CI，高危阻断发布                                                                                              |
| 输入校验 | 前端格式校验 + 后端安全校验                                                                                                    |

## 存储规范

- 非敏感 localStorage key 使用项目命名空间前缀
- 不存密码、访问令牌或敏感个人信息
- 不自行迁移项目既有认证机制；需要改造时同时评估 CSRF、会话失效和跨站请求影响
