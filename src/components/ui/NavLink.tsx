'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps } from 'react';

const NavLink = ({ className, ...props }: ComponentProps<typeof Link>) => {
  const path = usePathname();

  const pathSplit = path.split('/');
  const hrefSplit = props.href.toString().split('/');

  const isActive = pathSplit[1] === hrefSplit[1];

  return (
    <Link
      {...props}
      className={cn(
        'transition-colors',
        isActive
          ? 'text-foreground'
          : 'text-muted-foreground hover:text-foreground',
        className
      )}
    />
  );
};

export default NavLink;
