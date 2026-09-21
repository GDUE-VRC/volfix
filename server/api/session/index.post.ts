export default defineEventHandler(async (event) => {
  const { password } = await readBody<{ password?: string }>(event)
  const { manager_passwd: expected } = useRuntimeConfig()

  if (!expected || password !== expected) {
    throw createError({ statusCode: 401, message: '密码错误' })
  }

  await setUserSession(event, { user: { manager: true } })

  return { manager: true }
})
