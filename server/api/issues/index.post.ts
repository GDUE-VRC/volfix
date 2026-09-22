import { issueInsertSchema } from '../../../shared/db/schema'

export default defineEventHandler(async (event) => {
  const result = issueInsertSchema.safeParse(await readBody(event))

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
