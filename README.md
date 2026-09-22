# volfix

广东第二师范学院「电脑义务维修中心」的预约与后台管理系统。

## 技术栈

Nuxt 4（SSR）· Tailwind CSS 4 · Reka UI · Nuxt Icon（lucide）· NuxtHub（PostgreSQL）· Drizzle ORM

项目结构约定：页面/组件在根目录，前后端共享的校验、类型与工具放在 `shared/`。

## 开发

```bash
pnpm install
pnpm dev
```

## 环境变量

在项目根目录创建 `.env`（已被 `.gitignore` 忽略）：

```
MANAGER_PASSWD=你的后台密码
NUXT_SESSION_PASSWORD=会话 cookie 的签名密钥, 至少 32 字符
DATABASE_URL=postgresql://...
```

`MANAGER_PASSWD` 是登录后台时输入的密码；`NUXT_SESSION_PASSWORD` 可用 `openssl rand -base64 32` 生成。两者缺任一，`/login` 都无法正常登录。`DATABASE_URL` 本地可留空（走 PGlite），线上填 Neon 连接串。

## 数据库

PostgreSQL 方言：本地用 PGlite（`.data/db/pglite/`），线上设 `DATABASE_URL` 后切 Neon。表结构在 `server/db/schema.ts`，迁移在 `server/db/migrations/postgresql/`，`pnpm dev` / `pnpm build` 自动应用。

## 页面

| 路径 | 说明 |
| --- | --- |
| `/` | 首页与维修统计 |
| `/booking` | 提交维修预约 |
| `/login` | 后台登录 |
| `/manage` | 管理后台，未登录会自动跳转到 `/login` |

## 命令

```bash
pnpm lint        # ESLint
pnpm lint:fix
pnpm build       # 生产构建
pnpm preview     # 预览构建产物
pnpm clean       # 清理 .nuxt / .output / node_modules
```

## 部署

Vercel + Neon：用 Neon 集成注入 `DATABASE_URL`，并配置 `MANAGER_PASSWD`、`NUXT_SESSION_PASSWORD`；构建时自动应用迁移。
