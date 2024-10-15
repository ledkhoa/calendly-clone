import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import EventForm from '@/components/ui/events/EventForm';
import React from 'react';

const NewEvent = () => {
  return (
    <>
      <section className='flex flex-col items-center gap-4'>
        <h1>Create Event</h1>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>New Event</CardTitle>
            <CardDescription>Fill out details about your event</CardDescription>
          </CardHeader>
          <CardContent>
            <EventForm />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default NewEvent;
