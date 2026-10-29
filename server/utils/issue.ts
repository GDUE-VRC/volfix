import type { RequestEvent } from 'nuxt/schema'
import { getRouterParam } from 'nuxt/server'

export function getIssueId(event: RequestEvent): number {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: '无效的 id' })
  }
  return id
}
