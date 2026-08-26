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
    new Date(dateString).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 min-h-screen">
      <Header />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 md:px-16 overflow-hidden">
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
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />

        <div className="relative z-20 max-w-5xl mx-auto w-full text-center my-auto pt-6 space-y-5 md:space-y-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white uppercase leading-tight sm:leading-[1.05]">
            {t.landing?.heroTitle1 || 'Explore Your'} <br />
            {t.landing?.heroTitle2 || 'Career'}{' '}
            <span className="text-purple-400">{t.landing?.heroTitle3 || 'Future.'}</span>
          </h1>

          <div className="inline-block bg-white/10 backdrop-blur-md border border-white/15 px-4 py-2.5 sm:px-8 sm:py-3.5 rounded-full text-xs sm:text-base text-slate-200 font-normal shadow-lg max-w-[90%]">
            {t.landing?.heroSubtitle || "Don't Choose Your Career. Experience It First."}
          </div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-white/10 sm:border-none">
          <blockquote className="hidden sm:block max-w-xs text-slate-300 text-xs italic border-l-2 border-purple-400/50 pl-3">
            <footer className="mt-1 text-[10px] not-italic uppercase tracking-widest text-slate-400">
              — SWITCH COMMUNITY
            </footer>
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-4">
            <button
              onClick={handlePrimaryAction}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-full shadow-xl transition active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-4 h-4 text-purple-600" />
                  {t.landing?.goToProfile || 'Кабинет'}
                </>
              ) : (
                t.landing?.joinBtn || 'Join Community'
              )}
            </button>

            <button
              onClick={() => scrollTo('challenge')}
              className="w-full sm:w-auto group flex items-center justify-center gap-2.5 text-white hover:text-purple-300 transition py-2"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-white/40 group-hover:border-purple-400 flex items-center justify-center transition">
                <ArrowRight className="w-4 h-4 text-white group-hover:text-purple-300" />
              </div>
              <span className="text-xs font-bold tracking-wider uppercase">
                {t.landing?.exploreLink || 'Explore'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ─── The Career Choice Challenge ─────────────────────────── */}
      <section id="challenge" className="py-12 md:py-20 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-8 md:space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-semibold tracking-wider uppercase">
              <Target className="w-3.5 h-3.5" /> Key Issues
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              The <span className="text-purple-600 dark:text-purple-400">Career Choice</span> Challenge
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-xs sm:text-sm leading-relaxed">
              Millions face career uncertainty. SWITCH provides hands-on clarity and real connections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: HelpCircle, stat: '50%+', title: 'Unsure of Future', desc: 'Teens feel uncertain about their path after school.' },
              { icon: Briefcase, stat: '85%', title: 'No Hands-on Experience', desc: 'Pick majors without practical exposure.' },
              { icon: Users, stat: '70%', title: 'External Pressure', desc: 'Choices driven by family, not personal passion.' },
              { icon: Handshake, stat: '80%', title: 'Lack Mentors', desc: 'No direct access to industry experts.' },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                  <card.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {card.stat}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{card.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Past Sessions ─────────────────────────────────────── */}
      {pastSessions.length > 0 && (
        <section id="past-sessions" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20 space-y-10 md:space-y-16">
          <div className="max-w-xl text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[11px] font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Our Journey
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              Our Journey of <span className="text-purple-600 dark:text-purple-400">Discovery</span>
            </h2>
          </div>

          <div className="space-y-12 md:space-y-16">
            {pastSessions.map((session, idx) => (
              <div
                key={session.id}
                className={`grid lg:grid-cols-2 gap-6 md:gap-10 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
              >
                <div className="lg:[direction:ltr] rounded-2xl overflow-hidden shadow-md border border-slate-200/60 dark:border-slate-800 aspect-[16/9] sm:aspect-[4/3] relative">
                  {session.coverImage ? (
                    <img src={session.coverImage} alt={session.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 dark:from-purple-950 dark:via-slate-900 dark:to-slate-900 flex items-center justify-center">
                      <span className="text-purple-400 dark:text-purple-500 font-serif text-xl">SWITCH</span>
                    </div>
                  )}
                </div>

                <div className="lg:[direction:ltr] space-y-3.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-[11px] font-bold uppercase tracking-wide">
                    ⭐ {session.title}
                  </span>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-purple-500" /> {formatDate(session.startDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-500" /> {session.location}
                    </span>
                  </div>

                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm line-clamp-3">
                    {session.description}
                  </p>

                  {session.speakers && session.speakers.length > 0 && (
                    <div className="pt-1">
                      <div className="flex flex-wrap gap-2">
                        {session.speakers.map((sp) => (
                          <div key={sp.id} className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/60 rounded-full pl-1 pr-2.5 py-1">
                            <img
                              src={sp.photo || `https://api.dicebear.com/7.x/bottts/svg?seed=${sp.firstName}${sp.lastName}`}
                              alt={sp.firstName}
                              className="w-5 h-5 rounded-full object-cover"
                            />
                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              {sp.firstName} {sp.lastName}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/event/${session.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline uppercase tracking-wide pt-1"
                  >
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Upcoming Events ──────────────────────────────────────── */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16 scroll-mt-20">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {t.landing?.upcomingTitle || 'Upcoming Events'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-xs sm:text-sm">
              {t.landing?.upcomingSub || 'Присоединяйтесь к нашим воркшопам'}
            </p>
          </div>
          <button
            onClick={() => navigate('/events')}
            className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline text-xs sm:text-sm"
          >
            {t.landing?.viewAll || 'Все'} <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 py-12 text-center text-slate-400 space-y-1">
            <p className="font-semibold text-sm text-slate-500">Планируем новые сессии</p>
            <p className="text-xs">Следите за обновлениями в Telegram!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {events.map((event) => {
              const activeCount = event.registrations?.filter((r) => r.status === 'ACTIVE').length ?? 0;
              const seatsLabel = event.maxParticipants ? `${activeCount} / ${event.maxParticipants}` : `${activeCount}`;

              return (
                <Link
                  to={`/event/${event.id}`}
                  key={event.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="h-40 bg-purple-100 dark:bg-purple-950/40 relative overflow-hidden">
                      {event.coverImage && (
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                      )}
                      <span className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                        {event.status === 'UPCOMING' ? 'Скоро' : event.status}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{event.title}</h3>
                      <div className="mt-3 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {formatDate(event.startDate)}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {seatsLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 pt-0">
                    <span className="block w-full text-center py-2 bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 font-semibold rounded-xl text-xs">
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