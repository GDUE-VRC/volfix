export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const db = await hubDatabase();
  await db
    .prepare(
      'INSERT INTO issues (uid, name, class, problem, phone, reg_time, app_time, closed) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)'
    )
    .bind(
      body.uid,
      body.name,
      body.class,
      body.problem,
      body.phone,
      Date.now(),
      body.app_time,
      body.closed
    )
    .run();
  return '预约成功!!!';
});
