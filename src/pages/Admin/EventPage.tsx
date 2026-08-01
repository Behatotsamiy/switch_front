import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../../api/axios';

interface EventItem {
  id: string;
  title: string;
  location: string;
  startDate: string;
  maxParticipants: number;
  registeredCount?: number;
}

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '', // добавили — обязательное поле на бэкенде
    location: '',
    startDate: '',
    maxParticipants: 50,
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get<EventItem[]>('/events');
      setEvents(res.data);
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      setSubmitting(true);
      await api.post('/events', {
        ...form,
        // datetime-local отдаёт "2026-08-15T14:00" — приводим к полноценному ISO с таймзоной,
        // как ожидает @IsDateString() на бэкенде
        startDate: new Date(form.startDate).toISOString(),
      });
      setIsModalOpen(false);
      setForm({ title: '', description: '', location: '', startDate: '', maxParticipants: 50 });
      fetchEvents();
    } catch (err: any) {
      const message = err.response?.data?.message;
      setFormError(Array.isArray(message) ? message.join(', ') : message || 'Ошибка при создании события');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить мероприятие?')) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка удаления');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Events</h1>
          <p className="text-sm text-slate-500">Управление событиями</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Создать событие
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Загрузка мероприятий...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100 text-xs text-slate-400 font-semibold uppercase">
              <tr>
                <th className="p-4">Название</th>
                <th className="p-4">Локация</th>
                <th className="p-4">Дата</th>
                <th className="p-4">Участники</th>
                <th className="p-4 text-right">Действие</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {events.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold text-slate-900">{e.title}</td>
                  <td className="p-4 text-slate-600">{e.location}</td>
                  <td className="p-4 text-slate-600">{new Date(e.startDate).toLocaleDateString()}</td>
                  <td className="p-4 text-slate-600">
                    {e.registeredCount || 0} / {e.maxParticipants}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="p-2 text-slate-400 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Новое событие</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Название</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Описание</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="О чём это мероприятие"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Локация</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Макс. мест</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={form.maxParticipants}
                    onChange={(e) => setForm({ ...form, maxParticipants: +e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Дата</label>
                  <input
                    type="datetime-local"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};