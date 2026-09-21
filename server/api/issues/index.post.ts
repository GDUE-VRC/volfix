import { insertIssueSchema, issues } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const result = insertIssueSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({ statusCode: 400, message: result.error.issues[0]?.message ?? '提交内容不合法' })
  }

  const [created] = await db
    .insert(issues)
    .values({ ...result.data, regTime: String(Date.now()), closed: false })
    .returning()

  setResponseStatus(event, 201)
  return created
})
