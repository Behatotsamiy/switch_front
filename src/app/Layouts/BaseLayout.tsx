import React from 'react';


interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors">


      {/* Отображаем переданную страницу через children */}
      <main className="flex-1">{children}


      </main>
  
    </div>
  );
};