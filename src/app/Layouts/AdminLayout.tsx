import React from 'react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>


      {/* Отображаем страницу админки */}
      <main >{children}</main>
    </div>
  );
};