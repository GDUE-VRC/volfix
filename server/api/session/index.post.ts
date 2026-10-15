export default defineEventHandler(async (event) => {
  const { password, capToken } = await readBody<{ password?: string, capToken?: string }>(event)

  if (!await consumeProof(capToken)) {
    throw createError({ statusCode: 403, message: '人机校验失败' })
  }

  const { manager_passwd: expected } = useRuntimeConfig()

  if (!expected || password !== expected) {
    throw createError({ statusCode: 401, message: '密码错误' })
  }

  await setUserSession(event, { user: { manager: true } })

  return { manager: true }
})
