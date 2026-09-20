import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema } from 'drizzle-zod'

export const issues = sqliteTable('issues', {
  id: integer().primaryKey({ autoIncrement: true }),
  uid: text().notNull(),
  name: text().notNull(),
  class: text().notNull(),
  problem: text().notNull(),
  phone: text().notNull(),
  regTime: integer('reg_time').notNull(),
  appTime: integer('app_time').notNull(),
  closed: integer({ mode: 'boolean' }).notNull().default(false),
  closedTime: integer('closed_time'),
})

export type Issue = typeof issues.$inferSelect
export type NewIssue = typeof issues.$inferInsert

export const insertIssueSchema = createInsertSchema(issues, {
  uid: schema => schema.regex(/^\d{11}$/, '学号应为 11 位数字'),
  phone: schema => schema.regex(/^\d{11}$/, '电话应为 11 位数字'),
  name: schema => schema.min(1, '请填写姓名'),
  class: schema => schema.min(1, '请填写班级'),
  problem: schema => schema.min(1, '请填写详情'),
}).omit({ id: true, regTime: true, closed: true, closedTime: true })
