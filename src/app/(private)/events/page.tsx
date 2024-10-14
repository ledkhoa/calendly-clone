import { Button } from '@/components/ui/button';
import EventsGrid from '@/components/ui/events/EventsGrid';
import EventsGridSkeleton from '@/components/ui/events/EventsGridSkeleton';
import { db } from '@/drizzle/db';
import { auth } from '@clerk/nextjs/server';
import { CalendarPlus, CalendarRangeIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const Events = async () => {
  return (
    <>
      <div className='flex gap-4 items-baseline'>
        <h1 className='text-3xl lg:text-4xl xl:text-5xl font-semibold mb-6'>
          Events
        </h1>
        <Button asChild>
          <Link href='/events/new'>
            <CalendarPlus className='mr-4 size-6' />
            New Event
          </Link>
        </Button>
      </div>

      <Suspense fallback={<EventsGridSkeleton />}>
        <EventsGrid />
      </Suspense>
    </>
  );
};

export default Events;
