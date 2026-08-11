import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Briefcase, 
  Award, 
  MapPin, 
  ArrowRight, 
  User as UserIcon,
  Target,
  HelpCircle,
  Handshake
} from 'lucide-react';
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

  const scrollToChallenge = () => {
    const challengeSection = document.getElementById('challenge');
    if (challengeSection) {
      challengeSection.scrollIntoView({ behavior: 'smooth' });
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

      {/* Hero Section — Точная копия макета с вашего скриншота */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-16 overflow-hidden">
        {/* Видео-фон */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src="../../public/IMG_6477.mp4" type="video/mp4" />
          <source src="../../public/IMG_6477.MOV" type="video/quicktime" />
          Ваш браузер не поддерживает видео.
        </video>

        {/* Тёмная вуаль поверх видео для читаемости текста */}
        <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none" />

        {/* Центральная часть: Крупный заголовок и Glassmorphic плашка */}
        <div className="relative z-20 max-w-6xl mx-auto w-full text-center my-auto pt-10 space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white uppercase leading-[1.05]">
            Explore Your <br />
            Future <span className="text-purple-400">Career.</span>
          </h1>

          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/15 px-6 py-3.5 md:px-10 md:py-4 rounded-full text-sm md:text-lg text-slate-200 font-normal shadow-lg">
            {t.landing?.heroTitle1 || "Don't Choose Your Future. Experience It First."}
          </div>
        </div>

        {/* Нижняя часть: Цитата Манделы слева и Кнопки действий справа */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8">
          
  

          {/* Кнопки справа */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={handlePrimaryAction}
              className="px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-full shadow-2xl transition-all duration-200 active:scale-95 text-sm md:text-base flex items-center gap-2"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-4 h-4 text-purple-600" />
                  {t.landing?.goToProfile || 'Перейти в кабинет'}
                </>
              ) : (
                t.landing?.joinBtn || 'Partner With Us'
              )}
            </button>

            <button
              onClick={scrollToChallenge}
              className="group flex items-center gap-3 text-white hover:text-purple-300 transition"
            >
              <div className="w-12 h-12 rounded-full border border-white/40 group-hover:border-purple-400 flex items-center justify-center transition">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-purple-300 transition" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
                {t.landing?.heroTitle2 || 'Explore The Crisis'}
              </span>
            </button>
          </div>

        </div>
      </section>

      {/* СЕКЦИЯ: The Career Choice Challenge */}
      <section id="challenge" className="py-16 md:py-24 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wider uppercase">
              <Target className="w-4 h-4" /> Key Issues
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              The <span className="text-purple-600 dark:text-purple-400">Career Choice</span> Challenge
            </h2>

            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Millions of students face the same challenges when choosing their future. SWITCH is here to help you navigate through them.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:border-purple-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">50%+</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Unsure About Their Future</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                More than half of teenagers report feeling uncertain about what career path they want to pursue after finishing school.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:border-purple-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">85%</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Never Experienced Their Dream Career</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Around 85% of students choose their university major without any real hands-on experience in the profession they select.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:border-purple-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">70%</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Influenced by Others</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Nearly 7 in 10 students say their career decisions are strongly influenced by parents, family expectations, or social pressure rather than personal interests.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:border-purple-500/40 transition duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                <Handshake className="w-6 h-6" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">80%</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Lack Professional Connections</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Over 80% of young people have little or no access to mentors or professionals who can help them explore career and build industry connections.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
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