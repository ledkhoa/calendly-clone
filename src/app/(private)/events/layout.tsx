import { ReactNode } from 'react';
import { CalendarRange } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import NavLink from '@/components/ui/NavLink';
const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <header className='flex py-2 border-b bg-card'>
        <nav className='font-medium flex items-center text-sm gap-6 container'>
          {/* mr-auto is margin right - pushes element as far left as possible */}
          <div className='flex items-center gap-2 font-semibold mr-auto'>
            <CalendarRange className='size-6' />
            {/*sr-only is screen reader only */}
            <span className='sr-only md:not-sr-only'>iCalendar</span>
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
        </nav>
      </header>
      <main className='container my-6'>{children}</main>
    </>
  );
};

export default PrivateLayout;
