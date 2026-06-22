# Vue H5 Template

一个开箱即用的 Vue 3 + Vant 4 H5 模板，内置 TypeScript、Tailwind CSS、Pinia、Vue Router、Mock、登录态、路由权限、按钮权限、请求封装和离线 Iconify 图标。

## 技术栈

- Vue 3
- Vite
- TypeScript
- Vue Router Hash 模式
- Pinia + pinia-plugin-persistedstate
- Vant 4
- Tailwind CSS
- SCSS
- Dayjs
- unplugin-vue-components + VantResolver
- unplugin-icons + @iconify/json
- vite-plugin-mock-dev-server
- ESLint + Prettier + vue-tsc

## 环境要求

```bash
node >= 20.19.0
pnpm >= 9
```

项目通过 `packageManager` 和 `preinstall` 限制使用 pnpm。

## 安装和启动

```bash
pnpm install
pnpm dev
```

## 常用命令

```bash
pnpm dev           # 本地开发
pnpm build         # 类型检查并构建
pnpm preview       # 预览构建产物
pnpm typecheck     # 类型检查
pnpm lint          # ESLint 检查
pnpm lint:fix      # 自动修复 ESLint
pnpm format        # Prettier 格式化
pnpm format:check  # 检查格式
```

## 目录结构

```txt
src/
  api/                 接口模块和接口类型
  components/          公共组件
  constants/           常量
  directives/          v-permission / v-role
  hooks/               useLoading / useRequest / usePermission
  layouts/             BasicLayout / PageLayout / BlankLayout
  router/              路由、守卫、meta 类型
  stores/              Pinia stores
  styles/              Tailwind、reset、主题、Vant 变量
  utils/
    fetch-request/     内置 fetch-request 源码
    request/           当前项目业务请求封装
    storage/           local/session storage 封装
  views/               页面
mock/                  本地 mock 接口
```

## 内置页面

- `/login` 登录页
- `/home` 首页
- `/list` 列表页
- `/detail/:id` 详情页
- `/mine` 我的页
- `/settings` 设置页
- `/403` 无权限页
- `/404` 未找到页

根路径 `/` 默认跳转 `/home`。

## 测试账号

| 角色     | 账号    | 密码     | 权限                     |
| -------- | ------- | -------- | ------------------------ |
| 管理员   | `admin` | `123456` | `*:*:*`                  |
| 普通用户 | `user`  | `123456` | `list:view`, `demo:view` |

## 环境变量

```env
VITE_APP_TITLE=Vue H5 Template
VITE_APP_ENV=development
VITE_APP_VERSION=0.1.0
VITE_API_BASE_URL=/api
VITE_MOCK_ENABLED=true
VITE_REQUEST_TIMEOUT=10000
```

生产环境默认关闭 Mock：

```env
VITE_APP_ENV=production
VITE_MOCK_ENABLED=false
```

## 请求封装

项目不使用 axios。请求能力基于 [fetch-request](https://github.com/kelei321/fetch-request.git)，源码已复制到：

```txt
src/utils/fetch-request/
```

业务封装位于：

```txt
src/utils/request/
```

能力包括：

- `baseURL` 环境变量
- `Authorization: Bearer <token>` 自动注入
- 统一 `code/message/data` 解析
- 业务错误 Toast
- 401 清登录态并跳转登录页
- 403 跳无权限页
- 请求超时
- loading 控制
- POST/PUT/DELETE 防重复提交，默认 800ms
- upload 方法
- refresh token 代码预留，默认不开启自动刷新

使用示例：

```ts
import { http } from '@/utils/request'

export function getDemoListApi(params: DemoListParams) {
  return http.get<DemoListResult>('/list', { data: params })
}

export function createDemoApi(data: DemoForm) {
  return http.post('/demo', data)
}
```

## Mock

使用 `vite-plugin-mock-dev-server`，不依赖 `mockjs`。

Mock 文件放在根目录：

```txt
mock/*.mock.ts
```

已内置接口：

- `POST /api/auth/login`
- `POST /api/auth/refresh-token`
- `GET /api/user/info`
- `GET /api/list`
- `GET /api/list/:id`
- `POST /api/upload`

通过 `VITE_MOCK_ENABLED` 控制是否启用。

## 权限

路由 meta 支持：

```ts
meta: {
  title: '首页',
  requiresAuth: true,
  roles: ['admin'],
  permissions: ['list:view'],
  keepAlive: true,
  showTabBar: true
}
```

按钮权限：

```vue
<van-button v-permission="'demo:add'">新增</van-button>
```

角色权限：

```vue
<div v-role="'admin'">管理员可见</div>
```

组合式函数：

```ts
const { hasPermission, hasRole } = usePermission()
```

权限通配支持：

- `*:*:*`：全部权限
- `demo:*`：demo 模块全部权限
- `demo:add`：具体权限

## Iconify 离线图标

使用 `unplugin-icons` + `@iconify/json`，离线按需生成图标组件，不走在线 CDN。

示例：

```vue
<i-mdi-home-outline />
<i-mdi-cog-outline />
<i-mdi-account-outline />
```

## Vant 自动按需引入

通过 `unplugin-vue-components` + `VantResolver` 自动引入 Vant 组件。

页面中可直接使用：

```vue
<van-button type="primary">按钮</van-button>
```

## Tailwind CSS

项目已去掉 `postcss-px-to-viewport`，页面布局优先使用 Tailwind CSS。

SCSS 主要用于：

- reset
- 业务主题变量
- Vant CSS Variables 覆盖
- 少量复杂页面样式

## 新增页面

1. 在 `src/views` 下创建页面。
2. 在 `src/router/routes.ts` 添加路由。
3. 需要登录态则设置 `requiresAuth: true`。
4. 需要权限则设置 `roles` 或 `permissions`。

## 新增接口

1. 在 `src/api/types` 添加类型。
2. 在 `src/api/modules` 添加接口函数。
3. 开发阶段可在 `mock` 下添加对应 mock。

## 替换真实后端

1. 修改 `.env.production` 中的 `VITE_API_BASE_URL`。
2. 将 `VITE_MOCK_ENABLED=false`。
3. 按真实后端返回结构调整 `src/utils/request/index.ts` 中的 `successCodes`、`codeField`、`dataField`、`messageFields`。

## 部署

### Cloudflare Pages

构建命令：

```bash
pnpm install --frozen-lockfile && pnpm build
```

输出目录：

```txt
dist
```

### GitHub Pages

当前 `base` 默认为 `/`。如果部署到仓库子路径，修改 `vite.config.ts`：

```ts
base: '/vue-h5-template/'
```

## License

MIT
