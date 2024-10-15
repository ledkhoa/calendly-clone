import { auth } from '@clerk/nextjs/server';
import { CalendarRangeIcon, CalendarPlus } from 'lucide-react';
import React from 'react';
import { Button } from '../button';
import Link from 'next/link';
import { getEvent } from '@/app/lib/EventActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../card';
import { cn } from '@/lib/utils';
import { formatEventDescription } from '@/lib/formatter';
import { CopyEventButton } from './CopyEventButton';

const EventsGrid = async () => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    // this isn't necessary as redirect is handled in middleware.ts
    // this if check just guarantees userId is not null
    return redirectToSignIn();
  }

  const events = await getEvent(userId);

  return (
    <>
      {events.length ? (
        <div className='grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]'>
          {events.map((e) => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center gap-4'>
          <CalendarRangeIcon className='size-16' />
          <p>
            You don&apos;t have any events yet! Create an event to get started!
          </p>
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

type EventCardProps = {
  id: string;
  isActive: boolean;
  name: string;
  description: string | null;
  durationInMinutes: number;
  clerkUserId: string;
};

function EventCard({
  id,
  isActive,
  name,
  description,
  durationInMinutes,
  clerkUserId,
}: EventCardProps) {
  return (
    <Card className={cn('flex flex-col', !isActive && 'border-secondary/50')}>
      <CardHeader className={cn(!isActive && 'opacity-50')}>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          {formatEventDescription(durationInMinutes)}
        </CardDescription>
      </CardHeader>
      {description != null && (
        <CardContent className={cn(!isActive && 'opacity-50')}>
          {description}
        </CardContent>
      )}
      <CardFooter className='flex justify-end gap-2 mt-auto'>
        {isActive && (
          <CopyEventButton
            variant='outline'
            eventId={id}
            clerkUserId={clerkUserId}
          />
        )}
        <Button asChild>
          <Link href={`/events/${id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
