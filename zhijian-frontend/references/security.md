# 安全规范

违反任何一条，Code Review 直接打回。

## XSS 防护

| 危险 | 安全替代 |
|------|---------|
| `el.innerHTML = input` | `el.textContent = input` |
| `v-html="input"` | 模板插值 `{{ input }}` |
| `dangerouslySetInnerHTML` | 必要时用 DOMPurify 清洗 |

```ts
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(input);
```

## 安全清单

| 项 | 要求 |
|------|------|
| HTTPS | 生产环境强制，所有 API 用 HTTPS |
| Token 存储 | 存 HttpOnly Cookie，禁止 localStorage |
| 敏感信息 | 禁止前端硬编码密钥、密码 |
| URL 参数 | 传递时 `encodeURIComponent` 编码 |
| CSP | 配置 Content Security Policy 头 |
| iframe | 加 `sandbox` 属性 |
| 依赖扫描 | `npm audit` 集成 CI，高危阻断发布 |
| 输入校验 | 前端格式校验 + 后端安全校验 |

## 接口安全

```ts
// 请求封装：统一 Token、统一错误
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

request.interceptors.response.use(
  (res) => res.data,
  (err) => {
    handleError(err);
    return Promise.reject(err);
  }
);
```

## API 模块

```ts
// api/modules/user.ts
import request from '../request';

export const userApi = {
  login(params: LoginParams) {
    return request.post('/auth/login', params);
  },
  getUserInfo(userId: string) {
    return request.get(`/users/${userId}`);
  },
};
```

## 存储规范

- localStorage key 用命名空间前缀：`myapp:token`
- 禁止存密码、Token、敏感个人信息
- 敏感数据仅通过 HttpOnly Cookie 传递
