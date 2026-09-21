import { eq } from 'drizzle-orm'
import { issues } from '../../db/schema'

export default defineEventHandler(async (event) => {
  await requireUserSession(event)

  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: '无效的 id' })
  }

  const { closed } = await readBody<{ closed?: boolean }>(event)
  if (typeof closed !== 'boolean') {
    throw createError({ statusCode: 400, message: 'closed 必须是布尔值' })
  }

  const [updated] = await db
    .update(issues)
    .set({ closed, closedTime: closed ? String(Date.now()) : null })
    .where(eq(issues.id, id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 404, message: '记录不存在' })
  }

  return updated
})
