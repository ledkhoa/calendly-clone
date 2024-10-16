'use server';
import 'use-server'; // throws error if anything here is used outside of server
import { db } from '@/drizzle/db';
import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { ScheduleAvailabilityTable, SchedulesTable } from '@/drizzle/schema';
import { BatchItem } from 'drizzle-orm/batch';
import { eq } from 'drizzle-orm';
import { scheduleFormSchema } from '@/form-schemas/scheduleSchemas';

export const getSchedule = async (userId: string) => {
  return await db.query.SchedulesTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    with: { availabilities: true },
  });
};

export const addSchedule = async (
  unsafeData: z.infer<typeof scheduleFormSchema>
): Promise<{ error: boolean } | undefined> => {
  const { userId } = auth();
  const { success, data } = scheduleFormSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return { error: true };
  }

  const { availabilities, ...scheduleData } = data;

  const [{ id: scheduleId }] = await db
    .insert(SchedulesTable)
    .values({ ...scheduleData, clerkUserId: userId })
    .onConflictDoUpdate({
      target: SchedulesTable.clerkUserId,
      set: scheduleData,
    })
    .returning({ id: SchedulesTable.id });

  const statements: [BatchItem<'pg'>] = [
    db
      .delete(ScheduleAvailabilityTable)
      .where(eq(ScheduleAvailabilityTable.scheduleId, scheduleId)),
  ];

  if (availabilities.length > 0) {
    statements.push(
      db.insert(ScheduleAvailabilityTable).values(
        availabilities.map((availability) => ({
          ...availability,
          scheduleId,
        }))
      )
    );
  }

  await db.batch(statements);
};
