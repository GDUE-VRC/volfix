# AGENTS.md

广东第二师范学院「电脑义务维修中心」预约 + 后台系统。Nuxt 4 (SSR) · Tailwind 4 · Reka UI · NuxtHub (SQLite) · Drizzle ORM。

## 命令

用 `pnpm`（仓库只有 `pnpm-lock.yaml`，无 `packageManager` 字段，勿用 npm/yarn）。

- `pnpm dev` / `pnpm build` / `pnpm preview`
- `pnpm lint` / `pnpm lint:fix`
- `pnpm typecheck`
- 无测试套件；`lint` + `typecheck` 就是验证步骤（当前均通过）。
- `postinstall` 会自动跑 `nuxt prepare`。`.nuxt/`、`.output/`、`.data/` 均为生成物，不要手改或提交。

## 环境变量

复制 `.env.example` 为 `.env`，填 `MANAGER_PASSWD`（后台登录密码）和 `NUXT_SESSION_PASSWORD`（≥32 字符，`openssl rand -base64 32`）。缺任一 `/login` 都无法登录。

## 数据库与迁移

- 开发库：`.data/db/sqlite.db`（已 gitignore）。
- Schema 唯一来源是 `shared/db/schema.ts`；`server/db/schema.ts` 只是 `export *` 转发。
- 迁移在 `server/db/migrations/sqlite/`，`pnpm dev` / `pnpm build` 会自动应用。
- 改完 schema 后用 `pnpm exec nuxt-hub db generate` 生成迁移；另有 `db migrate`、`db sql`、`db squash`。
- 仓库里**没有** `drizzle.config.ts`：NuxtHub 运行时生成 `.nuxt/hub/db/drizzle.config.ts`。别手动 `drizzle-kit generate`。
- Drizzle 客户端 `db` 在 server 代码中是 NuxtHub 全局自动导入，无需 import。

## 结构约定

- Nuxt 4 根目录布局：`pages/ components/ composables/ middleware/`。
- `shared/` 只有 `utils/**` 和 `types/**` 会前后端自动导入。`shared/constants.ts`、`shared/db/schema.ts` 必须显式 import（前端用 `~/shared/...`，server 用相对路径）。
- `server/utils/*` server 端自动导入（如 `getIssueId`）。
- API：`server/api/issues/index.get.ts`（分页列表，需登录）、`index.post.ts`（公开预约）、`[id].patch.ts` / `[id].delete.ts`（需登录）、`server/api/session/index.post.ts`（登录）。
- 鉴权用 nuxt-auth-utils：服务端 `await requireUserSession(event)`；客户端 `middleware/auth.ts` 保护 `/manage`，登录后 session 为 `{ user: { manager: true } }`。

## 表单校验与时区

- 校验规则前后端共用：`shared/db/schema.ts` 里的 `issueInsertSchema`（drizzle-zod）同时被 `pages/booking.vue` 和 `server/api/issues/index.post.ts` 使用，改一处即可。
- 所有时间戳是 epoch 毫秒、**以 TEXT 存储**。格式化统一走 `shared/utils/datetime.ts` 的北京时间 (+8) 逻辑（用 `getUTC*` 手动偏移），**不要**用本地 `Date` 方法。

## UI 约定

- Tailwind 4 经 `@tailwindcss/vite` 接入；主题色在 `assets/main.css` 定义（`base-100/200`、`base-content`、`primary/success/warning/error`）。用这些 token，别用 Tailwind 默认色板。
- 暗色模式：`@nuxtjs/color-mode`，`classSuffix: ''`，CSS 里用 `@custom-variant dark`。
- Reka UI 组件全局自动导入（`Pagination*`、`Toast*`、`RadioGroup*` 等）。图标用 `<Icon name="lucide:..." />`。
- 项目自有组件以 `App` 前缀命名（`AppButton`、`AppInput`、`AppCheckbox` 等）。

## 规范

- ESLint 使用 `@antfu/eslint-config`：无分号、单引号、2 空格缩进。`server/db/migrations/**` 被忽略，不要手改，重新生成。
- TS 通过 Nuxt 生成配置；根 `tsconfig.json` 仅 `extends ./.nuxt/tsconfig.json`。
