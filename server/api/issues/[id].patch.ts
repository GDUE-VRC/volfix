import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getIssueId(event)

  const { closed } = await readBody<{ closed?: boolean }>(event)
  if (typeof closed !== 'boolean') {
    throw createError({ statusCode: 400, message: 'closed 必须是布尔值' })
  }

  const [updated] = await db
    .update(schema.issues)
    .set({ closed, closedTime: closed ? new Date() : null })
    .where(eq(schema.issues.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  return updated
})
