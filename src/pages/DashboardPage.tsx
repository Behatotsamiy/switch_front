import React from 'react';
import { LayoutDashboard, Calendar, Users, Briefcase, Award, CheckCircle, FileText, Settings, TrendingUp } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Dark Sidebar */}
      <aside className="w-64 bg-[#201c3d] text-slate-300 flex flex-col justify-between p-6">
        <div>
          <div className="text-2xl font-black text-white tracking-widest mb-8">SWITCH</div>
          <nav className="space-y-1">
            {[
              { label: 'Dashboard', icon: LayoutDashboard, active: true },
              { label: 'Events', icon: Calendar },
              { label: 'Participants', icon: Users },
              { label: 'Projects', icon: Briefcase },
              { label: 'Mentors', icon: Award },
              { label: 'Certificates', icon: CheckCircle },
              { label: 'Reports', icon: FileText },
              { label: 'Settings', icon: Settings },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  item.active ? 'bg-purple-600 text-white' : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome back, Admin</p>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: '1,248', growth: '+12%' },
            { label: 'Events', value: '35', growth: '+5%' },
            { label: 'Registrations', value: '856', growth: '+18%' },
            { label: 'Revenue', value: '15.2M UZS', growth: '+22%' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
              <div className="text-2xl font-extrabold text-slate-900 mt-2">{metric.value}</div>
              <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {metric.growth}
              </div>
            </div>
          ))}
        </div>

        {/* Analytics & Top Events Section */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[300px]">
            <h3 className="font-bold text-slate-900 mb-4">Registrations Overview</h3>
            <div className="h-48 border-b border-l border-slate-200 flex items-end justify-between px-4 text-xs text-slate-400">
              {/* Простая имитация графика */}
              <div className="w-8 bg-purple-200 h-1/3 rounded-t"></div>
              <div className="w-8 bg-purple-300 h-1/2 rounded-t"></div>
              <div className="w-8 bg-purple-600 h-3/4 rounded-t"></div>
              <div className="w-8 bg-purple-400 h-2/5 rounded-t"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Top Events</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Switch Session 2</span>
                <span className="text-xs text-slate-400">35 / 50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">UI/UX Workshop</span>
                <span className="text-xs text-slate-400">22 / 30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-slate-700">Pitch Your Startup</span>
                <span className="text-xs text-slate-400">18 / 20</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};