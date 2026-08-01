import React, { useEffect, useState } from 'react';
import { Calendar, Users, TrendingUp, Award, UserCheck } from 'lucide-react';
import { api } from '../../api/axios';

interface EventItem {
  id: string;
  title: string;
  status: string;
  registrations?: { status: string; attended: boolean }[];
}

export const ReportsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get<EventItem[]>('/events'), api.get('/users')])
      .then(([eventsRes, usersRes]) => {
        setEvents(eventsRes.data);
        setUsersCount(usersRes.data.length);
      })
      .catch((err) => console.error(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-slate-400">Считаем статистику...</div>;
  }

  const activeRegs = (e: EventItem) => e.registrations?.filter((r) => r.status === 'ACTIVE') ?? [];

  const totalRegistrations = events.reduce((sum, e) => sum + activeRegs(e).length, 0);
  const totalAttended = events.reduce(
    (sum, e) => sum + activeRegs(e).filter((r) => r.attended).length,
    0,
  );
  const attendanceRate = totalRegistrations > 0 ? Math.round((totalAttended / totalRegistrations) * 100) : 0;

  const finishedCount = events.filter((e) => e.status === 'FINISHED').length;
  const upcomingCount = events.filter((e) => e.status === 'UPCOMING').length;

  const topEvents = [...events]
    .map((e) => ({ title: e.title, count: activeRegs(e).length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxCount = Math.max(...topEvents.map((e) => e.count), 1);

  // явка только по завершённым/идущим событиям — на UPCOMING она всегда 0, это не показательно
  const attendanceByEvent = events
    .filter((e) => e.status === 'FINISHED' || e.status === 'ONGOING')
    .map((e) => {
      const regs = activeRegs(e);
      const attended = regs.filter((r) => r.attended).length;
      return { title: e.title, attended, total: regs.length, rate: regs.length ? Math.round((attended / regs.length) * 100) : 0 };
    })
    .sort((a, b) => b.rate - a.rate);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>
        <p className="text-sm text-slate-500">Общая статистика по сообществу</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Событий всего', value: events.length, icon: Calendar },
          { label: 'Активных регистраций', value: totalRegistrations, icon: Users },
          { label: 'Завершено / Скоро', value: `${finishedCount} / ${upcomingCount}`, icon: TrendingUp },
          { label: 'Участников', value: usersCount ?? '—', icon: Award },
          { label: 'Явка', value: `${attendanceRate}%`, icon: UserCheck },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl inline-flex mb-3">
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-5">Топ-5 событий по регистрациям</h3>
        {topEvents.length === 0 ? (
          <p className="text-sm text-slate-400">Пока нет данных</p>
        ) : (
          <div className="space-y-3">
            {topEvents.map((e) => (
              <div key={e.title} className="flex items-center gap-4">
                <div className="w-40 shrink-0 text-sm text-slate-600 truncate">{e.title}</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(e.count / maxCount) * 100}%` }} />
                </div>
                <div className="w-8 text-right text-sm font-semibold text-slate-900">{e.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-bold text-slate-900 mb-5">Явка по завершённым / текущим событиям</h3>
        {attendanceByEvent.length === 0 ? (
          <p className="text-sm text-slate-400">Пока нет завершённых событий</p>
        ) : (
          <div className="space-y-3">
            {attendanceByEvent.map((e) => (
              <div key={e.title} className="flex items-center gap-4">
                <div className="w-40 shrink-0 text-sm text-slate-600 truncate">{e.title}</div>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${e.rate >= 70 ? 'bg-emerald-500' : e.rate >= 40 ? 'bg-amber-500' : 'bg-red-400'}`}
                    style={{ width: `${e.rate}%` }}
                  />
                </div>
                <div className="w-20 text-right text-sm font-semibold text-slate-900">
                  {e.attended}/{e.total} ({e.rate}%)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};