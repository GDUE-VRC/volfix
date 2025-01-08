export default defineEventHandler(async (event) => {
  const db = hubDatabase();
  let dateList = (await db.prepare('SELECT app_time FROM issues').all()).results;
  dateList = dateList.map((time) => new Date(Number(time.app_time)));
  let weeks = new Set();
  dateList.forEach((date) => {
    const dayOfWeek = date.getDay();
    const diffToMonday = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    date.setDate(diffToMonday);
    weeks.add(date.toISOString().split('T')[0]);
  });
  weeks = Array.from(weeks);
  const lastWeekDay = new Date(weeks[weeks.length - 1]).getDay();
  return (weeks.length - 1) * 5 - lastWeekDay;
});
