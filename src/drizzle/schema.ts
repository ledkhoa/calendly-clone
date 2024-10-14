import { DAY_OF_WEEK as DAYS_OF_WEEK } from '@/constants/constants';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('createdAt').notNull().defaultNow();
const updatedAt = timestamp('updatedAt')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const EventsTable = pgTable(
  'events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    description: text('description'),
    durationInMinutes: integer('durationInMinutes').notNull(),
    clerkUserId: text('clerkUserId').notNull(),
    isActive: boolean('isActive').notNull().default(true),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index('clerkUserIdIndex').on(table.clerkUserId),
  })
);

export const SchedulesTable = pgTable('schedules', {
  id: uuid('id').primaryKey().defaultRandom(),
  timezone: text('timezone').notNull(),
  clerkUserId: text('clerkUserId').notNull(),
  createdAt,
  updatedAt,
});
export const scheduleRelations = relations(SchedulesTable, ({ many }) => ({
  availabilities: many(ScheduleAvailabilityTable),
}));

export const dayOfWeekEnum = pgEnum('day', DAYS_OF_WEEK);

export const ScheduleAvailabilityTable = pgTable(
  'scheduleAvailabilities',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    scheduleId: uuid('scheduleId')
      .notNull()
      .references(() => SchedulesTable.id, { onDelete: 'cascade' }),
    startTime: text('startTime').notNull(),
    endTime: text('endTime').notNull(),
    dayOfWeek: dayOfWeekEnum('dayOfWeek').notNull(),
  },
  (table) => ({
    scheduleIdIndex: index('scheduleIdIndex').on(table.scheduleId),
  })
);
export const scheduleAvailabilitiesRelations = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(SchedulesTable, {
      fields: [ScheduleAvailabilityTable.scheduleId],
      references: [SchedulesTable.id],
    }),
  })
);
