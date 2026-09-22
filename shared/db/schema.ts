import { boolean, date, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'

export const issues = pgTable('issues', {
  id: serial().primaryKey(),
  uid: varchar({ length: 11 }).notNull(),
  name: varchar({ length: 50 }).notNull(),
  class: varchar({ length: 50 }).notNull(),
  phone: varchar({ length: 11 }).notNull(),
  problem: text().notNull(),
  regTime: timestamp('reg_time', { withTimezone: true }).notNull(),
  appTime: date('app_time').notNull(),
  closed: boolean().notNull().default(false),
  closedTime: timestamp('closed_time', { withTimezone: true }),
})

type IssueRow = typeof issues.$inferSelect

export type Issue = Omit<IssueRow, 'regTime' | 'appTime' | 'closedTime'> & {
  regTime: string
  appTime: string
  closedTime: string | null
}

export const issueInsertSchema = createInsertSchema(issues, {
  uid: schema => schema.regex(/^\d{11}$/, '请填写11位学号'),
  phone: schema => schema.regex(/^\d{11}$/, '请填写11位电话'),
  name: schema => schema.min(1, '请填写姓名'),
  class: schema => schema.min(1, '请填写班级'),
  problem: schema => schema.min(1, '请填写详情'),
  appTime: () => z.iso.date('请选择预约日期'),
}).omit({ id: true, regTime: true, closed: true, closedTime: true })
