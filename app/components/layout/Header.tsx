'use client';

import { useTheme } from 'next-themes';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { Moon, Sun, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    const nextLocale = locale === 'en' ? 'ru' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  if (!mounted) {
    return (
      <header className="flex items-center justify-end gap-4 border-b border-gray-200 px-8 py-4 dark:border-gray-800">
        <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </header>
    );
  }

  return (
    <header className="flex items-center justify-end gap-4 border-b border-gray-200 px-8 py-4 transition-colors dark:border-gray-800">
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="Switch language"
      >
        <Globe size={18} />
        <span className="uppercase">{locale}</span>
      </button>

      <button
        onClick={toggleTheme}
        className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
