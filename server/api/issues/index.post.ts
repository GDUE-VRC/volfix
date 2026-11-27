import { and, eq, gte, isNull } from 'drizzle-orm'
import { createError, defineEventHandler, readBody, setResponseStatus } from 'nuxt/server'
import { issueInsertSchema } from '../../../shared/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody<Record<string, unknown>>(event)

  if (!await consumeProof(body.capToken)) {
    throw createError({ statusCode: 403, message: '人机校验失败' })
  }

  const result = issueInsertSchema.safeParse(body)

  if (!result.success) {
    throw createError({ statusCode: 400, message: result.error.issues[0]?.message ?? '提交内容不合法' })
  }

  // 同一学号每个自然日（北京时间）只能提交一次, 软删除的记录不占用当日名额
  const [todayIssue] = await db
    .select({ appTime: schema.issues.appTime })
    .from(schema.issues)
    .where(and(
      eq(schema.issues.uid, result.data.uid),
      isNull(schema.issues.deletedAt),
      gte(schema.issues.regTime, beijingTodayStart()),
    ))
    .limit(1)

  if (todayIssue) {
    throw createError({
      statusCode: 409,
      message: `该学号今天已预约过（预约日期 ${todayIssue.appTime}），每人每天只能预约一次`,
    })
  }

  const [created] = await db
    .insert(schema.issues)
    .values({ ...result.data, regTime: new Date() })
    .returning()

  setResponseStatus(event, 201)
  return created
})
