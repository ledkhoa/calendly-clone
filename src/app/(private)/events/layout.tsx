'use client';
import { ReactNode } from 'react';
import { CalendarRange, MoonIcon, SunIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import NavLink from '@/components/ui/NavLink';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  const { setTheme } = useTheme();
  return (
    <>
      <header className='flex py-2 border-b bg-card'>
        <nav className='font-medium flex items-center text-sm gap-6 container'>
          {/* mr-auto is margin right - pushes element as far left as possible */}
          <div className='flex items-center gap-2 font-semibold mr-auto'>
            <CalendarRange className='size-6' />
            {/*sr-only is screen reader only */}
            <span className='sr-only md:not-sr-only text-primary'>
              iCalendar
            </span>
          </div>

          <NavLink href='/events'>Events</NavLink>
          <NavLink href='/schedule'>Schedule</NavLink>

          {/* ml-auto is margin left - pushes element as far right as possible */}
          <div className='ml-auto size-10'>
            <UserButton
              appearance={{
                elements: { userButtonAvatarBox: 'size-full' },
              }}
            />
          </div>

          {/* Theme dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <SunIcon className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
                <MoonIcon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
                <span className='sr-only'>Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </header>
      <main className='container my-6'>{children}</main>
    </>
  );
};

export default PrivateLayout;
