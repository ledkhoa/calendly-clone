import React, { ReactNode } from 'react';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return <main className='container my-5'>{children}</main>;
};

export default PublicLayout;
