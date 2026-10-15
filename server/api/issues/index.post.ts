import { issueInsertSchema } from '../../../shared/db/schema'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => issueInsertSchema.safeParse(body))

  if (!(await consumeProof(body.capToken))) {
    throw createError({ statusCode: 403, message: '人机校验失败' })
  }

  const [created] = await db
    .insert(schema.issues)
    .values({ ...body, regTime: new Date() })
    .returning()

  setResponseStatus(event, 201)
  return created
})