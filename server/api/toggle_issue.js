export default defineEventHandler(async (event) => {
  const { passwd, id } = await getQuery(event);
  console.log(passwd, id);
  if (passwd != useRuntimeConfig().manager_passwd) {
    return '密码错误';
  }
  const db = hubDatabase();
  const issueStatus = await db.prepare('select closed from issues where id = ?').bind(id).first();
  if (issueStatus.closed) {
    await db.prepare('update issues set closed = 0 where id = ?').bind(id).run();
  } else {
    console.log();
    // await db.prepare('update issue set closed = 1 closed_time = ? where id = ?').bind(Date.now(), id).run();
  }
});
