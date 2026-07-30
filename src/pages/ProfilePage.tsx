import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, Calendar, CheckCircle2, Save, MapPin } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user , loading} = useAuth();

  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const [enrolledSessions, setEnrolledSessions] = useState<number[]>([1]);



   useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleEnroll = (id: number) => {
    setEnrolledSessions((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Шапка Кабинета */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Личный кабинет
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Добро пожаловать, <span className="font-semibold text-purple-600 dark:text-purple-400">{user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.phone}</span>
          </p>
        </div>

        {user?.role === 'ADMIN' && (
          <a
            href="/admin"
            className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-90 transition"
          >
            Панель Администратора
          </a>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Форма Редактирования */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Данные профиля</h2>

          {saved && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Данные обновлены!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Имя</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Фамилия</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Телефон</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Сохранить
            </button>
          </form>
        </div>

        {/* Мои Записи */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Мои записи на сессии</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* {sessions.map((item) => {
              const isEnrolled = enrolledSessions.includes(item.id);
              return (
                <div key={item.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-1 bg-purple-50 dark:bg-slate-800 text-purple-600 dark:text-purple-400 rounded-full">
                      {item.tag}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-3">{item.title}</h3>
                    <div className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-purple-500" /> {item.date}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-purple-500" /> {item.location}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleEnroll(item.id)}
                    className={`w-full mt-5 py-2 text-xs font-semibold rounded-xl transition ${
                      isEnrolled
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-purple-600 text-white'
                    }`}
                  >
                    {isEnrolled ? '✓ Вы записаны' : 'Записаться'}
                  </button>
                </div>
              );
            })} */}
          </div>
        </div>

      </div>
    </div>
  );
};