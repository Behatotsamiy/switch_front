import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Clock, 
  Ticket, 
  Share2, 
  ExternalLink,
  Loader2 
} from 'lucide-react';
import { api } from '../api/axios';

interface EventData {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  imageUrl?: string;
  price?: string;
  googleFormUrl?: string; // Укажите вашу ссылку на Google Форму
}

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.get<EventData>(`/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Событие не найдено'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: event?.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-400 gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
        <span>Загрузка события...</span>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Событие не найдено</h2>
        <p className="text-slate-500 mb-6">{error || 'Возможно, оно было удалено'}</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-purple-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> На главную
        </Link>
      </div>
    );
  }

  const eventDate = new Date(event.startDate);
  // Дефолтная ссылка на Google Forms, если для события не задана персональная
  const formLink = event.googleFormUrl || 'https://t.me/switchuzbekistan';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Кнопка Назад и Поделиться */}
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 font-medium transition"
        >
          <ArrowLeft className="w-4 h-4" /> Все события
        </Link>

        <button
          onClick={handleShare}
          className="p-2.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition"
          title="Поделиться"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Главная обложка */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 aspect-[21/9] shadow-lg">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 font-medium">
            Нет изображения
          </div>
        )}
      </div>

      {/* Основная информация */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Описание события */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{event.title}</h1>

          <div className="prose prose-slate max-w-none">
            <h3 className="text-lg font-bold text-slate-900 mb-2">О мероприятии</h3>
            <p className="text-slate-600 whitespace-pre-line leading-relaxed">{event.description}</p>
          </div>
        </div>

        {/* Карточка покупки билета */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6 sticky top-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Дата</div>
                  <div className="text-sm font-semibold">{eventDate.toLocaleDateString()}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Время</div>
                  <div className="text-sm font-semibold">
                    {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Локация</div>
                  <div className="text-sm font-semibold">{event.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                  <Ticket className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Стоимость</div>
                  <div className="text-sm font-bold text-purple-600">{event.price || 'Бесплатно'}</div>
                </div>
              </div>
            </div>

            {/* ПРЯМАЯ ССЫЛКА НА GOOGLE FORMS */}
            <a
              href={formLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-600/25 transition flex items-center justify-center gap-2"
            >
              Купить билет
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};