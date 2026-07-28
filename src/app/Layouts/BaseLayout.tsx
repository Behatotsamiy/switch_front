import React from 'react';

export const BaseLayout =  ({ children }: { children: React.ReactNode }) => {
  return (
    <div>{children}</div>
  );
};