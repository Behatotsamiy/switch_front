import React, { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { api } from '../../api/axios'; // Импортируй свой экземпляр axios

interface StatsData {
  totalUsers: number;
  totalEvents: number;
  totalRegistrations: number;
  revenue: string;
}

interface TopEvent {
  id: string;
  title: string;
  registeredCount: number;
  maxParticipants: number;
}

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [topEvents, setTopEvents] = useState<TopEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Запросы отправляются параллельно с уже вшитым access_token
      const [statsRes, eventsRes] = await Promise.all([
        api.get<StatsData>('/admin/stats'),
        api.get<TopEvent[]>('/events/top'),
      ]);

      setStats(statsRes.data);
      setTopEvents(eventsRes.data);
    } catch (err: any) {
      console.error('Ошибка загрузки дашборда:', err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-slate-400 gap-2">
        <RefreshCw className="w-5 h-5 animate-spin text-purple-600" />
        <span>Загрузка данных...</span>
      </div>
    );
  }

  const metrics = [
    { label: 'Total Users', value: stats?.totalUsers?.toLocaleString() || '0', growth: '+12%' },
    { label: 'Events', value: stats?.totalEvents || '0', growth: '+5%' },
    { label: 'Registrations', value: stats?.totalRegistrations || '0', growth: '+18%' },
    { label: 'Revenue', value: stats?.revenue || '0 UZS', growth: '+22%' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, Admin</p>
        </div>
        <button
          onClick={loadDashboardData}
          className="p-2 text-slate-400 hover:text-purple-600 transition"
          title="Обновить"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
            <div className="text-2xl font-extrabold text-slate-900 mt-2">{metric.value}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {metric.growth}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Top Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm min-h-[300px]">
          <h3 className="font-bold text-slate-900 mb-4">Registrations Overview</h3>
          <div className="h-48 border-b border-l border-slate-200 flex items-end justify-between px-4 text-xs text-slate-400">
            <div className="w-8 bg-purple-200 h-1/3 rounded-t"></div>
            <div className="w-8 bg-purple-300 h-1/2 rounded-t"></div>
            <div className="w-8 bg-purple-600 h-3/4 rounded-t"></div>
            <div className="w-8 bg-purple-400 h-2/5 rounded-t"></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4">Top Events</h3>
          <div className="space-y-4 text-sm">
            {topEvents.length === 0 ? (
              <p className="text-xs text-slate-400">Нет данных</p>
            ) : (
              topEvents.map((ev) => (
                <div key={ev.id} className="flex justify-between items-center">
                  <span className="font-medium text-slate-700 truncate max-w-[160px]">{ev.title}</span>
                  <span className="text-xs text-slate-400">
                    {ev.registeredCount} / {ev.maxParticipants}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};