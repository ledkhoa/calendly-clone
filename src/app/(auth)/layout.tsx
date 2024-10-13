import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

/*
    Everything in (auth) folder is to self host Clerk's sign in/sign up pages, instead of 
    redirecting the user to Clerk's url. 
    [[...]] is Clerk syntax to overwrite their pages

    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    are also required in .env.local to tell Clerk to use our components

    This layout file adds styling to the self hosted pages
*/
const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { userId } = auth();

  if (userId) {
    redirect('/');
  }

  return (
    <div className='flex flex-col justify-center min-h-screen items-center'>
      {children}
    </div>
  );
};

export default AuthLayout;
