import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const issues = sqliteTable('issues', {
  id: integer().primaryKey({ autoIncrement: true }),
  uid: text().notNull(),
  name: text().notNull(),
  class: text().notNull(),
  phone: text().notNull(),
  problem: text().notNull(),
  regTime: text('reg_time').notNull(),
  appTime: text('app_time').notNull(),
  closed: integer({ mode: 'boolean' }).notNull(),
  closedTime: text('closed_time'),
})

export type Issue = typeof issues.$inferSelect
export type NewIssue = typeof issues.$inferInsert

export const insertIssueSchema = createInsertSchema(issues, {
  uid: schema => schema.regex(/^\d{11}$/, '学号应为 11 位数字'),
  phone: schema => schema.regex(/^\d{11}$/, '电话应为 11 位数字'),
  name: schema => schema.min(1, '请填写姓名'),
  class: schema => schema.min(1, '请填写班级'),
  problem: schema => schema.min(1, '请填写详情'),
  appTime: () => z.coerce.string().regex(/^\d+$/, '请选择预约日期'),
}).omit({ id: true, regTime: true, closed: true, closedTime: true })
