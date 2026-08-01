import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Briefcase, 
  Award, 
  CheckCircle, 
  FileText, 
  Settings ,
  
} from 'lucide-react';

export const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Events', icon: Calendar, path: '/admin/events' },
    { label: 'Check-in', icon: CheckCircle, path: '/admin/checkin' },
    { label: 'Members', icon: Users, path: '/admin/members' },
    { label: 'Projects', icon: Briefcase, path: '/admin/projects' },
    { label: 'Mentors', icon: Award, path: '/admin/mentors' },
    { label: 'Certificates', icon: CheckCircle, path: '/admin/certificates' },
    { label: 'Reports', icon: FileText, path: '/admin/reports' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#201c3d] text-slate-300 flex flex-col justify-between p-6 shrink-0 sticky top-0 h-screen">
        <div>
          <div className="text-2xl font-black text-white tracking-widest mb-8">SWITCH</div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium hover:bg-white/5 text-slate-400 hover:text-white transition"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Контейнер страниц */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};