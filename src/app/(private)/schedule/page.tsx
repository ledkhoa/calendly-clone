import { getSchedule } from '@/app/lib/ScheduleActions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import ScheduleForm from '@/components/ui/schedule/ScheduleForm';
import { auth } from '@clerk/nextjs/server';
import React from 'react';

const Schedule = async () => {
  const { userId, redirectToSignIn } = auth();

  if (!userId) {
    // this isn't necessary as redirect is handled in middleware.ts
    // this if check just guarantees userId is not null
    return redirectToSignIn();
  }

  const schedule = await getSchedule(userId);

  return (
    <>
      <section className='flex flex-col items-center gap-4'>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ScheduleForm schedule={schedule} />
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default Schedule;
