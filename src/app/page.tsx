import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default function Home() {
  const { userId } = auth();

  if (userId) {
    redirect('/events');
  }

  return (
    <div className='text-center container my-4 mx-auto'>
      <h1 className='text-3xl mb-4'>iCalendar</h1>
      <div className='flex gap-2 justify-center bg-accent-foreground'>
        <Button asChild>
          <SignInButton />
        </Button>
        <Button asChild>
          <SignUpButton />
        </Button>
        <UserButton />
      </div>
    </div>
  );
}
