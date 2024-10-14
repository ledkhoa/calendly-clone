'use server';

import { db } from '@/drizzle/db';

export const getEvent = async (userId: string) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return await db.query.EventsTable.findMany({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
    orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  });
};
