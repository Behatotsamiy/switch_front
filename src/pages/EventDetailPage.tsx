import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  QrCode,
  Download,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { Header } from '../components/Header';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  bio?: string;
  photo?: string;
  position?: string;
}

interface Registration {
  id: string;
  userId: string;
  status: 'ACTIVE' | 'CANCELLED';
}

interface EventData {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  coverImage?: string;
  maxParticipants?: number;
  status: 'UPCOMING' | 'ONGOING' | 'FINISHED' | 'CANCELLED';
  speakers?: Speaker[];
  registrations?: Registration[];
  createdAt: string;
}

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { t } = useLang();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [registering, setRegistering] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/events/${id}`);

      if (!response.ok) {
        throw new Error(t.eventDetails?.notFound || 'Мероприятие не найдено');
      }

      const data: EventData = await response.json();
      setEvent(data);

      if (user && data.registrations) {
        const userReg = data.registrations.some(
          (reg) => reg.userId === user.id && reg.status === 'ACTIVE',
        );
        setIsRegistered(userReg);
      }
    } catch (err: any) {
      setError(err.message || t.eventDetails?.errorMsg || 'Ошибка при загрузке данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadEvent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    if (!id) return;

    try {
      setRegistering(true);
      setRegisterError(null);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/registrations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t.eventDetails?.regFailed || 'Не удалось зарегистрироваться');
      }

      setIsRegistered(true);
      // перезапрашиваем событие, чтобы получить актуальный список регистраций с бэка,
      // а не додумывать его на фронте
      await loadEvent();
    } catch (err: any) {
      setRegisterError(err.message || t.eventDetails?.regError || 'Ошибка регистрации');
    } finally {
      setRegistering(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          {t.eventDetails?.notFound || 'Мероприятие не найдено'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{error}</p>
        <Link to="/" className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition">
          {t.eventDetails?.goHome || 'Вернуться на главную'}
        </Link>
      </div>
    );
  }

  const activeRegistrations = event.registrations?.filter((r) => r.status === 'ACTIVE') ?? [];
  const registeredCount = activeRegistrations.length;
  const seatsLeft = event.maxParticipants ? event.maxParticipants - registeredCount : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> {t.eventDetails?.backBtn || 'Назад к мероприятиям'}
        </button>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 dark:border-slate-800 bg-slate-900">
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 opacity-90" />
          )}

          <div className="relative z-10 p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 backdrop-blur-[2px]">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    event.status === 'UPCOMING'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                      : event.status === 'ONGOING'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                        : 'bg-slate-500/20 text-slate-300 border border-slate-400/30'
                  }`}
                >
                  {event.status}
                </span>

                {seatsLeft !== null && (
                  <span className="text-xs font-medium text-slate-300 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                    {t.eventDetails?.seatsLeft || 'Осталось мест:'} <strong className="text-white">{seatsLeft}</strong>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-slate-200 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-72 bg-white/10 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-6 rounded-2xl text-center space-y-4 shadow-2xl shrink-0">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                {t.eventDetails?.participants || 'Участников'}
              </div>
              <div className="text-3xl font-extrabold text-white">
                {registeredCount} {event.maxParticipants ? `/ ${event.maxParticipants}` : ''}
              </div>

              {registerError && (
                <div className="text-xs text-red-300 bg-red-500/10 border border-red-400/30 rounded-xl px-3 py-2">
                  {registerError}
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={registering || isRegistered || (seatsLeft !== null && seatsLeft <= 0)}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm shadow-lg transition active:scale-[0.98] ${
                  isRegistered
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-default'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {registering
                  ? t.eventDetails?.loading || 'Загрузка...'
                  : isRegistered
                    ? t.eventDetails?.registeredBadge || 'Вы зарегистрированы ✓'
                    : seatsLeft !== null && seatsLeft <= 0
                      ? t.eventDetails?.seatsLeft || 'Мест нет'
                      : t.eventDetails?.registerBtn || 'Зарегистрироваться'}
              </button>

              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="w-full py-2 text-xs text-slate-300 hover:text-white flex items-center justify-center gap-1 transition"
              >
                <Share2 className="w-3.5 h-3.5" /> {t.eventDetails?.shareBtn || 'Поделиться ссылкой'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                {t.eventDetails?.aboutTitle || 'О мероприятии'}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {event.description}
              </p>
            </div>

            {event.speakers && event.speakers.length > 0 && (
              <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.eventDetails?.speakersTitle || 'Спикеры'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.speakers.map((speaker) => {
                    const fullName = `${speaker.firstName} ${speaker.lastName}`;
                    return (
                      <div
                        key={speaker.id}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
                      >
                        <img
                          src={speaker.photo || `https://api.dicebear.com/7.x/bottts/svg?seed=${fullName}`}
                          alt={fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-sm">{fullName}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {speaker.position || speaker.bio || t.eventDetails?.speakerRole || 'Спикер'}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="sticky top-24">
            {isRegistered ? (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-purple-500/40 text-center space-y-5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> {t.eventDetails?.yourTicket || 'Ваш электронный билет'}
                </div>

                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">{event.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{formatDate(event.startDate)}</p>
                </div>

                <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2">
                  <QrCode className="w-36 h-36 text-slate-800 dark:text-slate-200" />
                  <span className="text-[10px] uppercase font-mono text-slate-400 tracking-widest">
                    ID: {user?.id?.slice(0, 8) || 'PASS'}
                  </span>
                </div>

                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">
                    {user?.firstName || user?.lastName || user?.phone || 'Участник'}
                  </div>
                  <div className="text-xs text-slate-400">{t.eventDetails?.ticketConfirmed || 'Билет подтвержден'}</div>
                </div>

                <button
                  onClick={() => alert('Download coming soon!')}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-purple-500/20"
                >
                  <Download className="w-4 h-4" /> {t.eventDetails?.downloadTicket || 'Скачать билет (PDF)'}
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 shadow-sm">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-2xl inline-block">
                  <QrCode className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {t.eventDetails?.ticketTitle || 'Электронный билет'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {t.eventDetails?.ticketInstruction || 'Зарегистрируйтесь, чтобы получить персональный билет с QR-кодом.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};