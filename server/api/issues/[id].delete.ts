import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getIssueId(event)

  const deleted = await db.delete(schema.issues).where(eq(schema.issues.id, id)).returning({ id: schema.issues.id })

  if (!deleted.length) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  setResponseStatus(event, 204)
})
