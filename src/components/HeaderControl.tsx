import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type ThemeMode } from '../context/ThemeContext';
import { useLang, type Language } from '../context/LanguageContext';
import { Sun, Moon, Monitor, Globe, ChevronDown } from 'lucide-react';

export const HeaderControls: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLang();
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике снаружи
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setLangOpen(false);
        setThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themeIcons = {
    light: <Sun className="w-4 h-4 text-amber-500" />,
    dark: <Moon className="w-4 h-4 text-purple-400" />,
    device: <Monitor className="w-4 h-4 text-slate-400" />,
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'Русский (RU)' },
    { code: 'uz', label: "O'zbekcha (UZ)" },
    { code: 'en', label: 'English (EN)' },
  ];

  return (
    <div ref={containerRef} className="flex items-center gap-2 sm:gap-3">
      {/* Выбор Языка */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setLangOpen(!langOpen);
            setThemeOpen(false);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <Globe className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="uppercase">{lang}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>

        {langOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLang(item.code);
                  setLangOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center justify-between hover:bg-purple-50 dark:hover:bg-slate-700 transition ${
                  lang === item.code ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Выбор Темы */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setThemeOpen(!themeOpen);
            setLangOpen(false);
          }}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          title="Сменить тему"
        >
          {themeIcons[theme]}
        </button>

        {themeOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
            {(['light', 'dark', 'device'] as ThemeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setTheme(mode);
                  setThemeOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium flex items-center gap-2.5 hover:bg-purple-50 dark:hover:bg-slate-700 transition ${
                  theme === mode ? 'text-purple-600 dark:text-purple-400 font-bold' : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                {themeIcons[mode]}
                <span>{t.theme?.[mode] || mode}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};