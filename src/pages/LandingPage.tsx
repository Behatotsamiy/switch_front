import React from 'react';
import { Calendar, Users, Briefcase, Award, MapPin, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { Header } from '../components/Header';

export const LandingPage: React.FC = () => {
  const { t } = useLang();

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
            {t.landing.heroTitle1} <br />
            <span className="text-purple-600 dark:text-purple-400">{t.landing.heroTitle2}</span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg">
            {t.landing.heroDesc}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg shadow-purple-500/20 active:scale-[0.98] transition">
              {t.landing.joinBtn}
            </button>
            <button className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/60 transition">
              {t.landing.eventsBtn}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
  {[
    { label: t.landing.stats.members, value: '1,200+', icon: Users },
    { label: t.landing.stats.events, value: '35', icon: Calendar },
    { label: t.landing.stats.projects, value: '70+', icon: Briefcase },
    { label: t.landing.stats.mentors, value: '20', icon: Award },
  ].map((stat, idx) => (
    <div
      key={idx}
      className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-colors min-w-0"
    >
      <div className="p-2.5 sm:p-3 bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
        <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="min-w-0">
        <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight whitespace-nowrap">
          {stat.value}
        </div>
        <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 truncate">
          {stat.label}
        </div>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* Upcoming Events Section */}
      <section id="events" className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">{t.landing.upcomingTitle}</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">{t.landing.upcomingSub}</p>
          </div>
          <a
            href="#all-events"
            className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline text-sm sm:text-base"
          >
            {t.landing.viewAll} <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Switch Session 2', date: '25-26 Jun, 2026', location: 'Westminster University', seats: '35 / 50', tag: 'Bootcamp & Hackathon' },
            { title: 'UI/UX Design Workshop', date: '10 August, 2026', location: 'IT Park Tashkent', seats: '22 / 30', tag: 'Tech Workshop' },
            { title: 'Pitch Your Startup', date: '20 August, 2026', location: 'Impact Hub', seats: '18 / 20', tag: 'Competition' },
          ].map((event, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:border-slate-700 transition duration-200"
            >
              <div className="h-48 bg-purple-100 dark:bg-purple-950/40 relative">
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                  {event.tag}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{event.title}</h3>
                <div className="mt-4 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" /> {event.seats}
                  </div>
                </div>
                <button className="w-full mt-6 py-2.5 bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 font-semibold rounded-xl hover:bg-purple-100 dark:hover:bg-slate-700 transition">
                  {t.landing.viewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};