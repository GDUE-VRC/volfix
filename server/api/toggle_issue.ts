import { eq } from 'drizzle-orm'
import { issues } from '../db/schema'

export default defineEventHandler(async (event) => {
  requireManagerPassword(event)

  const { id } = getQuery(event)
  const issueId = Number(id)
  const issue = await db
    .select({ closed: issues.closed })
    .from(issues)
    .where(eq(issues.id, issueId))
    .get()

  if (!issue) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  if (issue.closed) {
    await db.update(issues).set({ closed: false }).where(eq(issues.id, issueId))
    return
  }

  await db.update(issues).set({ closed: true, closedTime: Date.now() }).where(eq(issues.id, issueId))
})
