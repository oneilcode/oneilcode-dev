'use client';

import { useState, useEffect } from 'react';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

export function Header() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
      <LanguageSwitcher />
      <ThemeToggle />
    </header>
  );
}
