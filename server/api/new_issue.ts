import { insertIssueSchema, issues } from '../db/schema'

export default defineEventHandler(async (event) => {
  const result = insertIssueSchema.safeParse(await readBody(event))

  if (!result.success) {
    throw createError({ statusCode: 400, message: result.error.issues[0]?.message ?? '提交内容不合法' })
  }

  await db.insert(issues).values({ ...result.data, regTime: Date.now(), closed: false })
  return '预约成功!!!'
})
