# 电脑义务维修中心

广东第二师范学院电脑义务维修中心的预约与后台管理系统。

## 技术栈

Nuxt 4（SPA）· Tailwind CSS 4 · Reka UI · Nuxt Icon（lucide）· NuxtHub（SQLite）· Drizzle ORM

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
```

`MANAGER_PASSWD` 是登录后台时输入的密码；`NUXT_SESSION_PASSWORD` 可用 `openssl rand -base64 32` 生成。两者缺任一，`/login` 都无法正常登录。

## 数据库

开发环境用的是本地 SQLite：`.data/db/sqlite.db`。表结构在 `server/db/schema.ts`，迁移文件在 `server/db/migrations/sqlite/`，`pnpm dev` 与 `pnpm build` 时会自动应用。

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

线上需要单独配置 `MANAGER_PASSWD` 环境变量，否则后台无法登录。
