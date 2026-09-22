import { eq } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = getIssueId(event)

  const deleted = await db.delete(issues).where(eq(issues.id, id)).returning({ id: issues.id })

  if (!deleted.length) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  setResponseStatus(event, 204)
})
