import React from 'react';
import { Target, Compass, Users2, Rocket } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const pillars = [
  {
    icon: Compass,
    title: 'Explore',
  },
  {
    icon: Users2,
    title: 'Connect',
  },
  {
    icon: Rocket,
    title: 'Build',
  },
];


export const MissionSection: React.FC = () => {
  const { t } = useLang();
  return (
    <section id="mission" className="py-20 md:py-28 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Target className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              <span className="text-purple-600 dark:text-purple-400">{t.landing.missionTitle}</span>
            </h2>
            {/* <p className="mt-6 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              SWITCH существует, чтобы девушки в Узбекистане могли увидеть себя в технологиях,
              предпринимательстве и лидерстве — не по наслышке, а на собственном опыте: через сессии,
              менторство и реальные проекты, а не абстрактные советы «кем быть».
            </p> */}
          </div>

          <div className="grid gap-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="flex gap-5 items-start p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 hover:border-purple-200 dark:hover:border-purple-500/30 transition"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                  <p.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};