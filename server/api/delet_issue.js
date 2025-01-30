export default defineEventHandler(async (event) => {
  const { passwd, id } = await getQuery(event);
  if (passwd != useRuntimeConfig().manager_passwd) {
    return '密码错误';
  }
  const db = hubDatabase();
  await db.prepare('delete from issues where id = ?').bind(id).run();
});
