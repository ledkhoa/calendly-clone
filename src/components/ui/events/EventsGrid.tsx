import { auth } from '@clerk/nextjs/server';
import { CalendarRangeIcon, CalendarPlus } from 'lucide-react';
import React from 'react';
import { Button } from '../button';
import Link from 'next/link';
import { getEvent } from '@/app/lib/EventActions';

const EventsGrid = async () => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const events = await getEvent(userId);

  return (
    <>
      {events.length ? (
        <div>Events!</div>
      ) : (
        <div className='flex flex-col items-center gap-4'>
          <CalendarRangeIcon className='size-16' />
          <p>You don't have any events yet!</p>
          <Button size='lg' className='text-lg' asChild>
            <Link href='/events/new'>
              <CalendarPlus className='mr-4 size-6' />
              New Event
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default EventsGrid;
