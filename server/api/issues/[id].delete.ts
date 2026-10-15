import { and, eq, isNull } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getIssueId(event)

  const [deleted] = await db
    .update(schema.issues)
    .set({ deletedAt: new Date() })
    .where(and(eq(schema.issues.id, id), isNull(schema.issues.deletedAt)))
    .returning({ id: schema.issues.id })

  if (!deleted) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  setResponseStatus(event, 204)
})
