'use client';
import React, { useTransition } from 'react';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema } from '@/schema/eventSchemas';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Button } from '../button';
import Link from 'next/link';
import { Switch } from '../switch';
import { addEvent, deleteEvent, updateEvent } from '@/app/lib/EventActions';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../alert-dialog';

const EventForm = ({
  event,
}: {
  event?: {
    id: string;
    name: string;
    description?: string;
    durationInMinutes: number;
    isActive: boolean;
  };
}) => {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event ?? {
      isActive: true,
      durationInMinutes: 30,
    },
  });

  const { toast } = useToast();
  const [isDeletePending, startDeleteTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    // == for null checks
    const action = event == null ? addEvent : updateEvent.bind(null, event.id);
    const result = await action(values);

    if (result?.error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again!',
        variant: 'destructive',
      });
    } else {
      toast({
        description: 'Event saved!',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        {/* Name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Event Name
                <span className='text-destructive'> *</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name users will see when booking
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration in minutes */}
        <FormField
          control={form.control}
          name='durationInMinutes'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Duration
                <span className='text-destructive'> *</span>
              </FormLabel>
              <FormControl>
                <Input type='number' {...field} />
              </FormControl>
              <FormDescription>
                The duration of the event in minutes
              </FormDescription>
              <FormMessage />{' '}
              {/* FormMessage displays the error message from zod */}
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className='resize-none h-32' {...field} />
              </FormControl>
              <FormDescription>Details about the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* isActive */}
        <FormField
          control={form.control}
          name='isActive'
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center gap-2'>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Inactive events will not be visible for users to book
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end gap-2'>
          {event && (
            <AlertDialog>
              <AlertDialogTrigger>
                {' '}
                <Button
                  type='button'
                  variant={'destructive'}
                  disabled={isDeletePending || form.formState.isSubmitting}
                >
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your event.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isDeletePending || form.formState.isSubmitting}
                    variant='destructive'
                    onClick={() => {
                      startDeleteTransition(async () => {
                        const result = await deleteEvent(event.id);
                        if (result?.error) {
                          toast({
                            title: 'Something went wrong',
                            description: 'Please try again!',
                            variant: 'destructive',
                          });
                        }
                      });
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            asChild
            type='button'
            variant={'outline'}
          >
            <Link href='/events'>Cancel</Link>
          </Button>
          <Button
            disabled={isDeletePending || form.formState.isSubmitting}
            type='submit'
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
