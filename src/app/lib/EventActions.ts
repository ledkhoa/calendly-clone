'use server';
import 'use-server'; // throws error if anything here is used outside of server
import { db } from '@/drizzle/db';
import { z } from 'zod';
import { eventFormSchema } from '@/form-schemas/eventSchemas';
import { EventsTable } from '@/drizzle/schema';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { and, eq } from 'drizzle-orm';

export const getEvent = async (userId: string) => {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  return await db.query.EventsTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });
};

export const addEvent = async (
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> => {
  const { success, data } = eventFormSchema.safeParse(unsafeData);
  const { userId } = auth();

  if (!success || !userId) {
    return { error: true };
  }

  await db.insert(EventsTable).values({ ...data, clerkUserId: userId });

  redirect('/events');
};

export const updateEvent = async (
  id: string,
  unsafeData: z.infer<typeof eventFormSchema>
): Promise<{ error: boolean } | undefined> => {
  const { success, data } = eventFormSchema.safeParse(unsafeData);
  const { userId } = auth();

  if (!success || !userId) {
    return { error: true };
  }

  const { rowCount } = await db
    .update(EventsTable)
    .set({ ...data })
    .where(and(eq(EventsTable.id, id), eq(EventsTable.clerkUserId, userId)));

  if (rowCount === 0) {
    return { error: true };
  }

  redirect('/events');
};

export const deleteEvent = async (
  id: string
): Promise<{ error: boolean } | undefined> => {
  const { userId } = auth();

  if (!userId) {
    return { error: true };
  }

  const { rowCount } = await db
    .delete(EventsTable)
    .where(and(eq(EventsTable.id, id), eq(EventsTable.clerkUserId, userId)));

  if (rowCount === 0) {
    return { error: true };
  }

  redirect('/events');
};
