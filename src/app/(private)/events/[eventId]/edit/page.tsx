import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import EventForm from '@/components/ui/events/EventForm';
import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import { notFound } from 'next/navigation';
import React from 'react';

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
export const revalidate = 0;

const EditEvent = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const event = await db.query.EventsTable.findFirst({
    where: ({ id, clerkUserId }, { and, eq }) =>
      and(eq(id, eventId), eq(clerkUserId, userId)),
  });

  if (!event) {
    return notFound();
  }

  return (
    <>
      <section className='flex flex-col items-center gap-4'>
        <h1>Edit Event</h1>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Edit Event</CardTitle>
            <CardDescription>Fill out details about your event</CardDescription>
          </CardHeader>
          <CardContent>
            <EventForm
              event={{ ...event, description: event.description ?? undefined }}
            />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default EditEvent;
