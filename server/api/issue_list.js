export default defineEventHandler(async (event) => {
  const { passwd } = getQuery(event);
  if (passwd != useRuntimeConfig().manager_passwd) {
    return '密码错误';
  }
  const db = hubDatabase();
  const issue_list = (await db.prepare('SELECT * FROM issues ORDER BY reg_time DESC LIMIT 32').all()).results;
  return issue_list;
});
