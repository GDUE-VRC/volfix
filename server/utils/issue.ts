import type { H3Event } from 'h3'

export function getIssueId(event: H3Event): number {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: '无效的 id' })
  }
  return id
}
