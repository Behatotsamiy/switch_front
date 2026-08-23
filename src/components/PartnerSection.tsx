import React from 'react';
import { Building2, GraduationCap, HandCoins, ArrowRight } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

export const PartnerSection: React.FC = () => {
  const { t } = useLang();

  const partnerTypes = [
    {
      icon: Building2,
      title: t.partner?.company || '',
      desc: t.partner?.companyDesc || '',
    },
    {
      icon: GraduationCap,
      title: t.partner?.center || '',
      desc: t.partner?.centerDesc || '',
    }, 
    {
      icon: HandCoins,
      title: t.partner?.mentor || '',
      desc: t.partner?.mentorDesc || '',
    },
  ];

  return (
    <section id="partner" className="py-20 md:py-28 bg-gradient-to-br from-purple-700 via-purple-600 to-fuchsia-600 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wider uppercase mb-4">
            Partner With Us
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            {t.partner?.title || 'Станьте частью SWITCH'}
          </h2>
          <p className="mt-4 text-purple-100 text-sm md:text-base leading-relaxed">
            SWITCH растёт благодаря компаниям, менторам и учебным центрам, которые верят в то же, что и мы.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {partnerTypes.map((p) => (
            <div
              key={p.title}
              className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-3 hover:bg-white/15 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-white text-purple-700 flex items-center justify-center">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">{p.title}</h3>
              <p className="text-xs text-purple-100 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://forms.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-700 font-bold rounded-full shadow-2xl hover:bg-purple-50 transition active:scale-95 cursor-pointer"
          >
            <span>Стать партнёром</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};