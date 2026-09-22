import { issueInsertSchema } from '../../../shared/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!await consumeProof(body.capToken)) {
    throw createError({ statusCode: 403, message: '人机校验失败, 请刷新页面重试' })
  }

  const result = issueInsertSchema.safeParse(body)

  if (!result.success) {
    throw createError({ statusCode: 400, message: result.error.issues[0]?.message ?? '提交内容不合法' })
  }

  const [created] = await db
    .insert(schema.issues)
    .values({ ...result.data, regTime: new Date() })
    .returning()

  setResponseStatus(event, 201)
  return created
})
