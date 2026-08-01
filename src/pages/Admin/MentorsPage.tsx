import React, { useEffect, useState } from 'react';
import { Plus, Trash2, X, Loader2 } from 'lucide-react';
import { api } from '../../api/axios';

interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  position?: string;
  bio?: string;
  photo?: string;
  telegram?: string;
  instagram?: string;
}

export const MentorsPage: React.FC = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    position: '',
    bio: '',
    telegram: '',
  });

  const fetchSpeakers = () => {
    setLoading(true);
    api
      .get<Speaker[]>('/speakers')
      .then((res) => setSpeakers(res.data))
      .catch((err) => console.error(err.response?.data?.message || err.message))
      .finally(() => setLoading(false));
  };

  useEffect(fetchSpeakers, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      setSubmitting(true);
      await api.post('/speakers', form);
      setIsModalOpen(false);
      setForm({ firstName: '', lastName: '', position: '', bio: '', telegram: '' });
      fetchSpeakers();
    } catch (err: any) {
      const message = err.response?.data?.message;
      setFormError(Array.isArray(message) ? message.join(', ') : message || 'Ошибка при создании ментора');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Удалить ментора?')) return;
    try {
      await api.delete(`/speakers/${id}`);
      setSpeakers((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'Ошибка удаления');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mentors</h1>
          <p className="text-sm text-slate-500">Спикеры и менторы сообщества</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4" /> Добавить ментора
        </button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
          Загрузка менторов...
        </div>
      ) : speakers.length === 0 ? (
        <div className="p-8 text-center text-slate-400 bg-white rounded-2xl border border-slate-100">
          Менторов пока нет — добавьте первого
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {speakers.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={s.photo || `https://api.dicebear.com/7.x/bottts/svg?seed=${s.firstName}${s.lastName}`}
                    alt={s.firstName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-100"
                  />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">
                      {s.firstName} {s.lastName}
                    </div>
                    <div className="text-xs text-slate-500">{s.position || 'Ментор'}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="p-1.5 text-slate-300 hover:text-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              {s.bio && <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{s.bio}</p>}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Новый ментор</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl">{formError}</div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Имя</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Фамилия</label>
                  <input
                    type="text"
                    required
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Должность</label>
                <input
                  type="text"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  placeholder="Frontend Developer at Epam"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">О менторе</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Telegram</label>
                <input
                  type="text"
                  value={form.telegram}
                  onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                  placeholder="@username"
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500"
                />
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
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};