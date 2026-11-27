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

  const [recentIssue] = await db
    .select({ id: schema.issues.id })
    .from(schema.issues)
    .where(and(
      eq(schema.issues.uid, result.data.uid),
      isNull(schema.issues.deletedAt),
      gte(schema.issues.regTime, hoursAgo(12)),
    ))
    .limit(1)

  if (recentIssue) {
    throw createError({
      statusCode: 409,
      message: '该学号 12 小时内已提交过预约，请稍后再试',
    })
  }

  const [created] = await db
    .insert(schema.issues)
    .values({ ...result.data, regTime: new Date() })
    .returning()

  setResponseStatus(event, 201)
  return created
})
