'use client';

import { useTranslations } from 'next-intl';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Download, Menu, X } from 'lucide-react';
import { AVATAR, AVATAR_FALLBACK, CONTACTS } from '@/constants';
import { SidebarNavigation } from '../features/SidebarNavigation';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const t = useTranslations('sidebar');
  const [isMobile, setIsMobile] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const checkSize = () => {
      const mobile = window.innerWidth <= 768;
      const small = window.innerWidth <= 500;

      setIsMobile(mobile);
      setIsSmall(small);

      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const baseClasses =
    'flex flex-col border-r border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80 transition-all duration-300';
  const desktopClasses = !isMobile ? 'fixed left-0 top-0 h-screen w-72' : '';
  const mobileClasses = isMobile
    ? [
        'fixed left-0 top-0 z-50 h-screen shadow-2xl',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        isSmall ? 'w-full' : 'w-72',
      ].join(' ')
    : '';

  const sidebarClasses = cn(baseClasses, desktopClasses, mobileClasses);

  const sidebarContent = (
    <>
      {isMobile && (
        <div className="flex justify-end border-b border-white/10 p-3 dark:border-white/5">
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800/50"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>
      )}

      <SidebarHeader className="px-4 pt-6 pb-4">
        <div className="mb-3 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oneil<span className="text-lime-600 dark:text-lime-400">Code</span>
          </h1>
        </div>
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <Avatar className="h-22 w-22">
              <AvatarImage src={AVATAR} alt="Виктория ОНил" className="object-cover" />
              <AvatarFallback className="bg-lime-100 text-4xl font-bold text-lime-700 dark:bg-lime-900/30 dark:text-lime-400">
                {AVATAR_FALLBACK}
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('name')}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('role')}</p>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-xs text-lime-600 dark:text-lime-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500" />
          </span>
          {t('status')}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
          <MapPin size={12} className="text-lime-500" />
          <span>{t('city')}</span>
        </div>
      </SidebarHeader>

      <SidebarNavigation onItemClick={closeSidebar} />

      <div className="space-y-4 border-t border-gray-200 p-4 dark:border-gray-800">
        <a
          href={t('cvUrl')}
          download
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600"
        >
          <Download size={16} />
          {t('cv')}
        </a>

        <div className="flex justify-center gap-4 pt-1">
          {CONTACTS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </>
  );

  if (!mounted) {
    return (
      <Sidebar className="fixed top-0 left-0 flex h-screen w-72 flex-col border-r border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80">
        {sidebarContent}
      </Sidebar>
    );
  }

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 rounded-lg bg-white/80 p-2.5 backdrop-blur-sm transition-all hover:bg-white dark:bg-[#0a0a0f]/80 dark:hover:bg-[#0a0a0f]"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      )}

      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={toggleSidebar} />
      )}

      {isMobile ? (
        <div className={sidebarClasses}>{sidebarContent}</div>
      ) : (
        <Sidebar className={sidebarClasses}>{sidebarContent}</Sidebar>
      )}
    </>
  );
}

export { Sidebar };
