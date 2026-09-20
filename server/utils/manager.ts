import type { H3Event } from 'h3'

export function requireManagerPassword(event: H3Event) {
  const { manager_passwd: expected } = useRuntimeConfig()
  const { passwd } = getQuery(event)

  if (!expected || passwd !== expected) {
    throw createError({ statusCode: 401, message: '密码错误' })
  }
}
