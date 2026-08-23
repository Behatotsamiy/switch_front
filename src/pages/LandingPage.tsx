import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  Briefcase,
  MapPin,
  ArrowRight,
  User as UserIcon,
  Target,
  HelpCircle,
  Handshake,
  Sparkles,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MissionSection } from '../components/MissionSection';
import { PartnerSection } from '../components/PartnerSection';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  startDate: string;
  location: string;
  coverImage?: string;
  maxParticipants?: number;
  registrations?: { status: 'ACTIVE' | 'CANCELLED' }[];
  speakers?: Speaker[];
  status: 'UPCOMING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';
}

export const LandingPage: React.FC = () => {
  const { t } = useLang();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [pastSessions, setPastSessions] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data: EventItem[]) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        );
        setEvents(sorted.filter((e) => e.status === 'UPCOMING' || e.status === 'ONGOING').slice(0, 3));
        setPastSessions(sorted.filter((e) => e.status === 'FINISHED').slice(0, 4));
      })
      .catch(() => {
        setEvents([]);
        setPastSessions([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePrimaryAction = () => {
    navigate(isAuthenticated ? '/profile' : '/auth');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
      <Header />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 md:px-16 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src="/IMG_6477.mp4" type="video/mp4" />
          <source src="/IMG_6477.MOV" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />

        <div className="relative z-20 max-w-6xl mx-auto w-full text-center my-auto pt-10 space-y-8">
          <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-6xl font-serif font-bold tracking-tight text-white uppercase leading-[1.05]">
            {t.landing?.heroTitle1 || 'Explore Your'} <br />
            {t.landing?.heroTitle2 || 'Career'}{' '}
            <span className="text-purple-400">{t.landing?.heroTitle3 || 'Future.'}</span>
          </h1>

          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/15 px-6 py-3.5 md:px-10 md:py-4 rounded-full text-sm md:text-lg text-slate-200 font-normal shadow-lg">
            {t.landing?.heroTitle2 || "Don't Choose Your Career. Experience It First."}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8">
          <blockquote className="max-w-sm text-slate-300 text-sm leading-relaxed italic border-l-2 border-purple-400/50 pl-4">
            <footer className="mt-2 text-[11px] not-italic uppercase tracking-widest text-slate-400">
              — SWITCH COMMUNITY
            </footer>
          </blockquote>

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
                t.landing?.joinBtn || 'Join Community'
              )}
            </button>

            <button
              onClick={() => scrollTo('challenge')}
              className="group flex items-center gap-3 text-white hover:text-purple-300 transition"
            >
              <div className="w-12 h-12 rounded-full border border-white/40 group-hover:border-purple-400 flex items-center justify-center transition">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-purple-300 transition" />
              </div>
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
                {t.landing?.exploreLink || 'Explore The Challenge'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── The Career Choice Challenge ─────────────────────────── */}
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
              Millions of girls face the same challenge when choosing their future in tech and business.
              SWITCH is here to help them navigate through it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: HelpCircle, stat: '50%+', title: 'Unsure About Their Future', desc: 'More than half of teenage girls report feeling uncertain about what career path to pursue after school.' },
              { icon: Briefcase, stat: '85%', title: 'Never Tried the Field', desc: 'Around 85% choose their major without any real hands-on experience in tech or entrepreneurship.' },
              { icon: Users, stat: '70%', title: 'Influenced by Others', desc: 'Nearly 7 in 10 say their choices are driven by family expectations rather than personal interest.' },
              { icon: Handshake, stat: '80%', title: 'Lack Mentors', desc: 'Over 80% have little or no access to mentors who could help them build real industry connections.' },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md dark:hover:border-purple-500/40 transition duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition">
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {card.stat}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Прошедшие сессии ─────────────────────────────────────── */}
      {pastSessions.length > 0 && (
        <section id="past-sessions" className="max-w-7xl mx-auto px-6 md:px-8 py-20 space-y-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-4 h-4" /> Our Journey
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Our Journey of <span className="text-purple-600 dark:text-purple-400">Career Discovery</span>
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
              Реальный опыт, новые связи и открытые пути — вот как участницы SWITCH находят своё место.
            </p>
          </div>

          <div className="space-y-20">
            {pastSessions.map((session, idx) => (
              <div
                key={session.id}
                className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                <div className="lg:[direction:ltr] rounded-3xl overflow-hidden shadow-xl border border-slate-200/60 dark:border-slate-800 aspect-[4/3] relative">
                  {session.coverImage ? (
                    <img src={session.coverImage} alt={session.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 dark:from-purple-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
                      <span className="text-purple-400 dark:text-purple-500 font-serif text-2xl">SWITCH</span>
                    </div>
                  )}
                </div>

                <div className="lg:[direction:ltr] space-y-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wide">
                    ⭐ {session.title}
                  </span>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" /> {formatDate(session.startDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-500" /> {session.location}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base whitespace-pre-line">
                    {session.description}
                  </p>

                  {session.speakers && session.speakers.length > 0 && (
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-purple-500 font-bold mb-2">
                        Спикеры сессии
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {session.speakers.map((sp) => (
                          <div key={sp.id} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/60 rounded-full pl-1.5 pr-3 py-1.5">
                            <img
                              src={sp.photo || `https://api.dicebear.com/7.x/bottts/svg?seed=${sp.firstName}${sp.lastName}`}
                              alt={sp.firstName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                              {sp.firstName} {sp.lastName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/event/${session.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline uppercase tracking-wide"
                  >
                    View Full Story <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Upcoming Events ──────────────────────────────────────── */}
      <section id="events" className="max-w-7xl mx-auto px-6 md:px-8 py-16 scroll-mt-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.landing?.upcomingTitle || "What's Happening Soon"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
              {t.landing?.upcomingSub || 'Присоединяйтесь к нашим ближайшим воркшопам и сессиям'}
            </p>
          </div>
          <button
            onClick={() => navigate('/events')}
            className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline text-sm sm:text-base"
          >
            {t.landing?.viewAll || 'Смотреть все'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 py-16 text-center text-slate-400 space-y-2">
            <p className="font-semibold text-slate-500">Мы планируем новые сессии</p>
            <p className="text-sm">Следите за обновлениями в нашем Telegram-канале!</p>
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
                    <div className="h-48 bg-purple-100 dark:bg-purple-950/40 relative overflow-hidden">
                      {event.coverImage && (
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                      )}
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
      <PartnerSection />
      <MissionSection />
     <Footer />

    </div>
    
  );
  
};