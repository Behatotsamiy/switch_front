import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { HeaderControls } from './HeaderControl';
import { Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Список ссылок для навигации
  const navLinks = [
    { href: '#events', label: t.nav.events },
    { href: '#community', label: t.nav.community },
    { href: '#projects', label: t.nav.projects },
    { href: '#mentors', label: t.nav.mentors || 'Mentors' },
    { href: '#about', label: t.nav.about || 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* 1. Логотип */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl sm:text-2xl font-black tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1 active:scale-95 transition-transform"
          >
            SWITCH
          </Link>

          {/* 2. Десктоп Навигация (появляется с lg:) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. Десктоп Правый Блок (появляется с md:) */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <HeaderControls />

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-full transition-all"
              >
                {t.nav.login}
              </button>

              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md shadow-purple-500/20 active:scale-95 transition-all"
              >
                {t.nav.signup}
              </button>
            </div>
          </div>

          {/* 4. Мобильная Панель (Языки/Тема + Кнопка Гамбургера) */}
          <div className="flex items-center gap-2 md:hidden">
            <HeaderControls />

            <button
              onClick={toggleMobileMenu}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. Выпадающее Мобильное Меню */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4 shadow-2xl transition-all">
          <nav className="flex flex-col space-y-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800/80 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Мобильные кнопки Входа и Регистрации */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                closeMobileMenu();
                navigate('/auth');
              }}
              className="w-full py-3 text-center text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-slate-800 rounded-xl hover:bg-purple-100 dark:hover:bg-slate-700 transition-colors"
            >
              {t.nav.login}
            </button>
            <button
              onClick={() => {
                closeMobileMenu();
                navigate('/auth');
              }}
              className="w-full py-3 text-center text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg shadow-purple-500/20 active:scale-[0.99] transition-all"
            >
              {t.nav.signup}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};