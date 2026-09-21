import { eq } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async (event) => {
  requireManagerPassword(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: '无效的 id' })
  }

  const deleted = await db.delete(issues).where(eq(issues.id, id)).returning({ id: issues.id })

  if (!deleted.length) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  setResponseStatus(event, 204)
})
