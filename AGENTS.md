# AGENTS.md

广东第二师范学院「电脑义务维修中心」预约 + 后台系统。Nuxt 4 (SSR) · Tailwind 4 · Reka UI · NuxtHub (PostgreSQL) · Drizzle ORM。

## 命令

用 `pnpm`（仓库只有 `pnpm-lock.yaml`，无 `packageManager` 字段，勿用 npm/yarn）。

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm lint` / `pnpm lint:fix`
- `pnpm typecheck`
- 无测试套件；`lint` + `typecheck` 就是验证步骤（当前均通过）。
- `postinstall` 会自动跑 `nuxt prepare`。`.nuxt/`、`.output/`、`.data/` 均为生成物，不要手改或提交。

## 环境变量

复制 `.env.example` 为 `.env`，填 `MANAGER_PASSWD`（后台登录密码）和 `NUXT_SESSION_PASSWORD`（≥32 字符，`openssl rand -base64 32`）。缺任一 `/login` 都无法登录。`DATABASE_URL` 可选：本地留空则用 PGlite，线上填 Neon 连接串。

## 数据库与迁移

- 数据库统一是 PostgreSQL 方言。本地不配 driver，NuxtHub 默认用 PGlite 文件库，数据在 `.data/db/pglite/`（已 gitignore）；设置 `DATABASE_URL`（或 `POSTGRES_URL` / `POSTGRESQL_URL`）时 `nuxt.config.ts` 才显式指定 `neon-http` driver 连 Neon。
- 本地（无 `DATABASE_URL`）额外设了 `applyMigrationsDuringBuild: false`：NuxtHub 0.10.8 关闭 PGlite 时调用的是不存在的 `end()`（PGlite 只有 `close()`），会让 `nuxt build` 以及 `nuxt db migrate` / `db sql` / `db squash` / `db drop` 在跑完后卡住不退出。所以本地构建不连 PGlite，迁移交给 `pnpm dev` 自动应用；线上 Neon 仍在构建期迁移。
- 表结构与校验规则唯一来源是 `shared/db/schema.ts`（`pgTable` + `createInsertSchema`）；`server/db/schema.ts` 只是 `export *` 转发。
- 迁移在 `server/db/migrations/postgresql/`，`pnpm dev` / `pnpm build` 会自动应用。
- 改完表结构后用 `pnpm exec nuxt-hub db generate` 生成迁移；另有 `db migrate`、`db sql`、`db squash`。
- 仓库里**没有** `drizzle.config.ts`：NuxtHub 运行时生成 `.nuxt/hub/db/drizzle.config.ts`。别手动 `drizzle-kit generate`。
- NuxtHub 在 server 端自动导入 `db` 和 `schema`，直接用 `schema.issues` 即可，无需 import；`server/db/schema.ts` 只做 `export *` 转发，供 NuxtHub 扫描 schema。

## 结构约定

- Nuxt 4 根目录布局：`pages/ components/ composables/ middleware/`。
- `shared/` 只有 `utils/**` 和 `types/**` 会前后端自动导入。`shared/constants.ts`、`shared/db/schema.ts` 必须显式 import（前端用 `~/shared/...`，server 用相对路径）。
- `server/utils/*` server 端自动导入（如 `getIssueId`）。
- API：`server/api/issues/index.get.ts`（分页列表，需登录）、`index.post.ts`（公开预约）、`[id].patch.ts` / `[id].delete.ts`（需登录）、`server/api/session/index.post.ts`（登录）。
- 鉴权用 nuxt-auth-utils：服务端 `await requireUserSession(event)`；客户端 `middleware/auth.ts` 保护 `/manage`，登录后 session 为 `{ user: { manager: true } }`。

## 表单校验与时区

- 校验规则前后端共用：`shared/db/schema.ts` 里的 `issueInsertSchema`（drizzle-zod）同时被 `pages/booking.vue` 和 `server/api/issues/index.post.ts` 使用，改一处即可。
- 时间字段用 Postgres 原生类型：`reg_time` / `closed_time` 是 `timestamptz`，`app_time` 是 `date`（预约日期，`YYYY-MM-DD`）。格式化统一走 `shared/utils/datetime.ts`（`Intl` + `Asia/Shanghai`），**不要**用本地 `Date` 方法。
- API 经 JSON 后 `Date` 会变成 ISO 字符串；`shared/db/schema.ts` 的 `Issue` 类型就是这套序列化后的形状（`regTime`/`closedTime` 为 ISO 字符串，`appTime` 为 `YYYY-MM-DD`）。

## UI 约定

- Tailwind 4 经 `@tailwindcss/vite` 接入；主题色在 `assets/main.css` 定义（`base-100/200`、`base-content`、`primary/success/warning/error`）。用这些 token，别用 Tailwind 默认色板。
- 暗色模式：`@nuxtjs/color-mode`，`classSuffix: ''`，CSS 里用 `@custom-variant dark`。
- Reka UI 组件全局自动导入（`Pagination*`、`Toast*`、`RadioGroup*` 等）。图标用 `<Icon name="lucide:..." />`。
- 项目自有组件以 `App` 前缀命名（`AppButton`、`AppInput`、`AppCheckbox` 等）。

## 规范

- ESLint 使用 `@antfu/eslint-config`：无分号、单引号、2 空格缩进。`server/db/migrations/**` 被忽略，不要手改，重新生成。
- TS 通过 Nuxt 生成配置；根 `tsconfig.json` 仅 `extends ./.nuxt/tsconfig.json`。
