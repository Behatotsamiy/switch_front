import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Camera, Play, } from 'lucide-react';

const quickLinks = [
  { label: 'Мероприятия', to: '/events' },
  { label: 'О нас', to: '/#mission' },
  { label: 'Партнёрам', to: '/#partner' },
  { label: 'Войти', to: '/auth' },
];

const resources = [
  { label: 'FAQ', to: '/#faq' },
  { label: 'Блог', to: '/#articles' },
  { label: 'Политика конфиденциальности', to: '/privacy' },
  { label: 'Условия использования', to: '/terms' },
];

const socials = [
  { icon: Send, label: 'Telegram', href: 'https://t.me/switch_community', color: 'hover:bg-[#229ED9]' },
  { icon: Camera, label: 'Instagram', href: 'https://instagram.com/switch.community', color: 'hover:bg-gradient-to-br hover:from-[#f09433] hover:to-[#bc1888]' },
  { icon: Play, label: 'YouTube', href: 'https://youtube.com/@switchcommunity', color: 'hover:bg-[#FF0000]' },
  { icon: Link, label: 'LinkedIn', href: 'https://linkedin.com/company/switch-community', color: 'hover:bg-[#0A66C2]' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12">
          <div>
            <span className="font-serif text-2xl font-black tracking-wider text-white">SWITCH</span>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              Сообщество, которое помогает девушкам в Узбекистане исследовать карьеру в технологиях
              и предпринимательстве через реальный опыт.
            </p>
            <div className="flex gap-2.5 mt-6">
              {socials.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition ${item.color}`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Ссылки</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-purple-400 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Ресурсы</h4>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-purple-400 transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Свяжитесь с нами</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="mailto:hello@switch-community.uz" className="flex items-center gap-3 text-sm text-slate-400 hover:text-purple-400 transition">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5" />
                  </span>
                  hello@switch-community.uz
                </a>
              </li>
              <li>
                <a href="tel:+998901234567" className="flex items-center gap-3 text-sm text-slate-400 hover:text-purple-400 transition">
                  <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  +998 90 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <span className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                Ташкент, Узбекистан
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} SWITCH Community. Все права защищены.</p>
          <p className="text-xs text-slate-500">Сделано с 💜 для девушек в технологиях</p>
        </div>
      </div>
    </footer>
  );
};