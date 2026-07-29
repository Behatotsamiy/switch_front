import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { HeaderControls } from './HeaderControl';
import { Menu, X, User as UserIcon, LogOut, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useLang();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate('/');
  };

  // Получаем форматированное имя для отображения
  const displayName = user?.firstName
    ? `${user.firstName}${user.lastName ? ' ' + user.lastName[0] + '.' : ''}`
    : user?.phone || 'Профиль';

  const navLinks = isAuthenticated
    ? [
        { href: '/', label: 'Главная' },
        { href: '#events', label: t.nav?.events || 'Мероприятия' },
        { href: '#projects', label: t.nav?.projects || 'Проекты' },
        { href: '/profile', label: 'Личный кабинет' },
      ]
    : [
        { href: '#events', label: t.nav?.events || 'Мероприятия' },
        { href: '#community', label: t.nav?.community || 'Сообщество' },
        { href: '#projects', label: t.nav?.projects || 'Проекты' },
        { href: '#mentors', label: t.nav?.mentors || 'Менторы' },
        { href: '#about', label: t.nav?.about || 'О нас' },
      ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Логотип */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl sm:text-2xl font-black tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1 active:scale-95 transition-transform"
          >
            SWITCH
          </Link>

          {/* Десктоп Навигация */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href.startsWith('#') ? '/' + link.href : link.href}
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Десктоп Правый Блок */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <HeaderControls />

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700" />

            {isAuthenticated ? (
              /* Авторизованный пользователь */
              <div className="flex items-center gap-2">
                {/* Если пользователь админ */}
                {user?.role === 'ADMIN' && (
                  <Link
                    to="/admin"
                    title="Админ Панель"
                    className="p-2 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition"
                  >
                    <Shield className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-slate-700/80 transition"
                >
                  <UserIcon className="w-4 h-4" />
                  <span className="text-xs font-semibold max-w-[120px] truncate">{displayName}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Выйти"
                  className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Гость */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 text-sm font-semibold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-slate-800 rounded-full transition-all"
                >
                  {t.nav?.login || 'Войти'}
                </button>
                <button
                  onClick={() => navigate('/auth')}
                  className="px-4 py-2 text-sm font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-md shadow-purple-500/20 active:scale-95 transition-all"
                >
                  {t.nav?.signup || 'Регистрация'}
                </button>
              </div>
            )}
          </div>

          {/* Мобильная панель */}
          <div className="flex items-center gap-2 md:hidden">
            <HeaderControls />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Мобильное Меню */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href.startsWith('#') ? '/' + link.href : link.href}
                onClick={closeMobileMenu}
                className="px-4 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            {isAuthenticated ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="w-full py-3 text-center text-sm font-semibold bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 rounded-xl"
                >
                  Личный кабинет ({user?.firstName || user?.phone})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-center text-sm font-semibold bg-red-50 text-red-600 rounded-xl"
                >
                  Выйти из аккаунта
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { closeMobileMenu(); navigate('/auth'); }}
                  className="w-full py-3 text-center text-sm font-semibold bg-purple-50 dark:bg-slate-800 text-purple-700 dark:text-purple-300 rounded-xl"
                >
                  {t.nav?.login || 'Войти'}
                </button>
                <button
                  onClick={() => { closeMobileMenu(); navigate('/auth'); }}
                  className="w-full py-3 text-center text-sm font-semibold bg-purple-600 text-white rounded-xl"
                >
                  {t.nav?.signup || 'Регистрация'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};