import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Users, Briefcase, Award, MapPin, ArrowRight, User as UserIcon } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface EventItem {
  id: string;
  title: string;
  startDate: string;
  location: string;
  maxParticipants?: number;
  registrations?: { status: 'ACTIVE' | 'CANCELLED' }[];
  status: 'UPCOMING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';
}

export const LandingPage: React.FC = () => {
  const { t } = useLang();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data: EventItem[]) => setEvents(data.slice(0, 3)))
      .catch(() => setEvents([]))
      .finally(() => setEventsLoading(false));
  }, []);

  const handlePrimaryAction = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth');
    }
  };

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
      <Header />

      {/* Hero Section — без изменений */}
      <section className="relative overflow-hidden py-20 md:py-28 text-white min-h-[80vh] flex items-center">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0">
          <source src="../../public/IMG_6477.mp4" type="video/mp4" />
          <source src="../../public/IMG_6477.MOV" type="video/quicktime" />
          Ваш браузер не поддерживает видео.
        </video>

        <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              {t.landing?.heroTitle1 || 'Добро пожаловать в'} <br />
              <span className="text-purple-400">{t.landing?.heroTitle2 || 'SWITCH Community'}</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-lg">
              {t.landing?.heroDesc || 'Развивайте навыки, участвуйте в хакатонах и находите единомышленников.'}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handlePrimaryAction}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30 active:scale-[0.98] transition flex items-center gap-2"
              >
                {isAuthenticated ? (
                  <>
                    <UserIcon className="w-4 h-4" />
                    {t.landing?.goToProfile || 'Перейти в личный кабинет'}
                  </>
                ) : (
                  t.landing?.joinBtn || 'Принять участие'
                )}
              </button>

              <button
                onClick={scrollToEvents}
                className="px-6 py-3 border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition"
              >
                {t.landing?.eventsBtn || 'Мероприятия'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { label: t.landing?.stats?.members || 'Участников', value: '1,200+', icon: Users },
              { label: t.landing?.stats?.events || 'Ивентов', value: '35', icon: Calendar },
              { label: t.landing?.stats?.projects || 'Проектов', value: '70+', icon: Briefcase },
              { label: t.landing?.stats?.mentors || 'Менторов', value: '20', icon: Award },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/10 dark:bg-slate-900/60 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-colors min-w-0"
              >
                <div className="p-2.5 sm:p-3 bg-purple-500/20 text-purple-300 rounded-xl shrink-0">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl font-bold text-white leading-tight whitespace-nowrap">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 truncate">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section — теперь реальные данные */}
      <section id="events" className="max-w-7xl mx-auto px-6 md:px-8 py-16 scroll-mt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.landing?.upcomingTitle || 'Предстоящие мероприятия'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
              {t.landing?.upcomingSub || 'Присоединяйтесь к нашим ближайшим воркшопам и сессиям'}
            </p>
          </div>
          <button
            onClick={scrollToEvents}
            className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline text-sm sm:text-base"
          >
            {t.landing?.viewAll || 'Смотреть все'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {eventsLoading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 py-16 text-center text-slate-400">
            {t.landing?.noEvents || 'Мероприятий пока нет — загляните позже.'}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => {
              const activeCount = event.registrations?.filter((r) => r.status === 'ACTIVE').length ?? 0;
              const seatsLabel = event.maxParticipants ? `${activeCount} / ${event.maxParticipants}` : `${activeCount}`;

              return (
                <Link
                  to={`/event/${event.id}`}
                  key={event.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:border-slate-700 transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-48 bg-purple-100 dark:bg-purple-950/40 relative">
                      <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                        {event.status === 'UPCOMING' ? 'Скоро' : event.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                      <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {formatDate(event.startDate)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {seatsLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <span className="block w-full text-center py-2.5 bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 font-semibold rounded-xl text-sm">
                      {t.landing?.viewDetails || 'Подробнее'}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};