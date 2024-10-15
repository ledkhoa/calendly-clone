import React from 'react';
import { Skeleton } from '../skeleton';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card';

const EventsGridSkeleton = () => {
  return (
    <Card className='flex flex-col'>
      <CardHeader>
        <CardTitle>
          <Skeleton className='w-[35%] h-8'></Skeleton>
        </CardTitle>
        <CardDescription>
          <Skeleton className='w-[15%] h-4'></Skeleton>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className='w-full h-8'></Skeleton>
      </CardContent>
      <CardFooter className='flex justify-end gap-2 mt-auto'>
        <Skeleton className='w-[20%] h-8'></Skeleton>
        <Skeleton className='w-[15%] h-8'></Skeleton>
      </CardFooter>
    </Card>
  );
};

export default EventsGridSkeleton;
