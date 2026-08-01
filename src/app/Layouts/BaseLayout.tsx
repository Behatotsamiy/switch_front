import React from 'react';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">


      {/* Отображаем переданную страницу через children */}
      <main className="flex-1">{children}</main>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs">
        © 2026 SWITCH Community. All rights reserved.
      </footer>
    </div>
  );
};