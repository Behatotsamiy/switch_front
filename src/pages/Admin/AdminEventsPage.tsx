import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, MapPin, Loader2, Image as ImageIcon } from 'lucide-react';
import { api } from '../../api/axios'; // твой axios instance

interface EventItem {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  imageUrl?: string;
  price?: string;
}

export const AdminEventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    imageUrl: '',
    price: 'Free',
  });

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get<EventItem[]>('/events');
      setEvents(res.data);
    } catch (err: any) {
      console.error('Ошибка загрузки:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post('/events', form);
      
      // Сброс формы и обновление списка
      setForm({ title: '', description: '', location: '', startDate: '', imageUrl: '', price: 'Free' });
      fetchEvents();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Не удалось создать событие');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить этот ивент?')) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err: any) {
      alert('Ошибка при удалении');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Управление ивентами</h1>
        <p className="text-sm text-slate-500">Добавляйте новые события для отображения на лендинге</p>
      </div>

      {/* FORM: СОЗДАНИЕ ИВЕНТА */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Plus className="w-5 h-5 text-purple-600" /> Добавить новое событие
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Название ивента *</label>
              <input
                type="text"
                required
                placeholder="например, Switch Session #3"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Локация *</label>
              <input
                type="text"
                required
                placeholder="Tashkent, IMPACT Technology Hub"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Дата и время *</label>
              <input
                type="datetime-local"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Цена / Вход</label>
              <input
                type="text"
                placeholder="Free / 50,000 UZS"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">URL Обложки (Картинка)</label>
              <input
                type="url"
                placeholder="https://..."
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Описание *</label>
            <textarea
              rows={3}
              required
              placeholder="Подробная информация об ивенте, спикерах и программе..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 transition"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Опубликовать ивент
          </button>
        </form>
      </div>

      {/* LIST: СПИСОК АКТИВНЫХ ИВЕНТОВ */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Опубликованные ивенты ({events.length})</h2>

        {loading ? (
          <div className="text-center py-10 text-slate-400 text-sm">Загрузка...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-100 text-slate-400 text-sm">
            Пока нет ни одного ивента. Создайте первый выше!
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  {ev.imageUrl ? (
                    <img src={ev.imageUrl} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900">{ev.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-500" />
                        {new Date(ev.startDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-500" />
                        {ev.location}
                      </span>
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                        {ev.price || 'Free'}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(ev.id)}
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
                  title="Удалить"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};