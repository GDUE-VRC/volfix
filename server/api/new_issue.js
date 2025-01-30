import { md5 } from 'js-md5';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (md5(btoa(body.verifycode)) != body.verifycode_url) {
    throw createError({
      statusCode: 400,
      statusMessage: '验证码错误',
    });
  }
  const db = await hubDatabase();
  await db
    .prepare(
      'INSERT INTO issues (uid, name, class, problem, phone, reg_time, app_time, closed) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)'
    )
    .bind(
      body.response.uid,
      body.response.name,
      body.response.class,
      body.response.problem,
      body.response.phone,
      Date.now(),
      body.response.app_time,
      body.response.closed
    )
    .run();
  return '预约成功!!!';
});
