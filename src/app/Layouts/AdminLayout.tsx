import React from 'react';
import { Calendar, ArrowLeft } from 'lucide-react';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1633] text-slate-300 flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen">
        <div>
          <div className="text-2xl font-black text-white tracking-widest mb-10">
            SWITCH <span className="text-xs text-purple-400 font-normal">ADMIN</span>
          </div>

          <nav className="space-y-2">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-600 text-white font-medium text-sm shadow-lg shadow-purple-600/30">
              <Calendar className="w-4 h-4" />
              <span>Events Management</span>
            </div>
          </nav>
        </div>

        <a
          href="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition py-2"
        >
          <ArrowLeft className="w-4 h-4" /> Перейти на сайт
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};