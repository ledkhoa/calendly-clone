'use client';
import React, { Fragment } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../form';
import { Button } from '../button';
import { useToast } from '@/hooks/use-toast';
import { DAY_OF_WEEK } from '@/constants/constants';
import { timeToInt } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { formatTimezoneOffset } from '@/lib/formatter';
import { Plus, X } from 'lucide-react';
import { Input } from '../input';
import { addSchedule } from '@/app/lib/ScheduleActions';
import { scheduleFormSchema } from '@/form-schemas/scheduleSchemas';

type Availability = {
  startTime: string;
  endTime: string;
  dayOfWeek: (typeof DAY_OF_WEEK)[number];
};

const ScheduleForm = ({
  schedule,
}: {
  schedule?: {
    timezone: string;
    availabilities: Availability[];
  };
}) => {
  const form = useForm<z.infer<typeof scheduleFormSchema>>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      timezone:
        schedule?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
      availabilities: schedule?.availabilities.toSorted(
        (a, b) => timeToInt(a.startTime) - timeToInt(b.startTime)
      ),
    },
  });

  const { toast } = useToast();

  const {
    append: addAvailability,
    remove: deleteAvailability,
    fields: availabilityFields,
  } = useFieldArray({ name: 'availabilities', control: form.control });

  const groupedAvailabilityFields = Object.groupBy(
    availabilityFields.map((field, index) => ({ ...field, index })),
    (availability) => availability.dayOfWeek
  );

  //   const groupBy = <T>(array: T[], key: (item: T) => string) =>
  //   array.reduce((result: Record<string, T[]>, currentValue: T) => {
  //     const groupKey = key(currentValue);
  //     if (!result[groupKey]) {
  //       result[groupKey] = [];
  //     }
  //     result[groupKey].push(currentValue);
  //     return result;
  //   }, {});

  // const groupedAvailabilities = groupBy(
  //   schedule.availabilities,
  //   a => a.dayOfWeek
  // );

  const onSubmit = async (values: z.infer<typeof scheduleFormSchema>) => {
    const result = await addSchedule(values);
    if (result?.error) {
      toast({
        title: 'Error saving schedule',
        description: 'Please try again!',
        variant: 'destructive',
      });
    } else {
      toast({
        description: 'Schedule saved!',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        {/* Timezone */}
        <FormField
          control={form.control}
          name='timezone'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Timezone
                <span className='text-destructive'> *</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Intl.supportedValuesOf('timeZone').map((timezone) => (
                    <SelectItem key={timezone} value={timezone}>
                      {timezone}
                      {` (${formatTimezoneOffset(timezone)})`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-[auto,1fr] gap-y-6 gap-x-4'>
          {DAY_OF_WEEK.map((day) => (
            <Fragment key={day}>
              <div className='capitalize text-sm font-semibold'>
                {day.substring(0, 3)}
              </div>
              <div className='flex flex-col gap-2'>
                <Button
                  type='button'
                  className='size-6 p-1'
                  variant={'outline'}
                  onClick={() => {
                    addAvailability({
                      dayOfWeek: day,
                      startTime: '9:00',
                      endTime: '17:00',
                    });
                  }}
                >
                  <Plus className='size-full' />
                </Button>
                {groupedAvailabilityFields[day]?.map((field, labelIndex) => (
                  <div key={field.id} className='flex flex-col gap-1'>
                    <div className='flex gap-2 items-center'>
                      <FormField
                        control={form.control}
                        name={`availabilities.${field.index}.startTime`}
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              {...field}
                              className='w-24'
                              aria-label={`${day} Start Time ${labelIndex + 1}`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      -
                      <FormField
                        key={labelIndex}
                        control={form.control}
                        name={`availabilities.${field.index}.endTime`}
                        render={({ field }) => (
                          <FormItem>
                            <Input
                              {...field}
                              className='w-24'
                              aria-label={`${day} Start Time ${labelIndex + 1}`}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type='button'
                        className='size-6 p-1'
                        variant={'destructive'}
                        onClick={() => deleteAvailability(field.index)}
                      >
                        <X />
                      </Button>
                    </div>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.root?.message
                      }
                    </FormMessage>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.startTime?.message
                      }
                    </FormMessage>
                    <FormMessage>
                      {
                        form.formState.errors.availabilities?.at?.(field.index)
                          ?.endTime?.message
                      }
                    </FormMessage>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        </div>

        <div className='flex justify-end gap-2'>
          <Button disabled={form.formState.isSubmitting} type='submit'>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ScheduleForm;
