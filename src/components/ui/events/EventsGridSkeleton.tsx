import React from 'react';
import { Skeleton } from '../skeleton';

const EventsGridSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Skeleton className='h-16 w-16 rounded-md'></Skeleton>
      <Skeleton className='h-8 w-32 rounded-md'></Skeleton>
      <Skeleton className='h-10 w-64 rounded-md'></Skeleton>
    </div>
  );
};

export default EventsGridSkeleton;
