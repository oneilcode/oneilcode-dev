'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { MapPin, Mail, Download, Home, Briefcase } from 'lucide-react';
import { CONTACTS } from '@/constants';

const useNavigation = () => {
  const t = useTranslations('navigation');

  return [
    { name: t('home'), href: '/', icon: Home },
    { name: t('portfolio'), href: '/portfolio', icon: Briefcase },
    { name: t('journey'), href: '/journey', icon: MapPin },
    { name: t('contact'), href: '/contact', icon: Mail },
  ];
};

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations('sidebar');
  const navigation = useNavigation();

  return (
    <Sidebar className="flex h-full w-72 flex-col border-r border-white/20 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0f]/80">
      <SidebarHeader className="px-4 pt-6 pb-4">
        <div className="mb-3 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Oneil<span className="text-lime-600 dark:text-lime-400">Code</span>
          </h1>
        </div>

        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <Avatar className="h-22 w-22">
              <AvatarImage src="/avatar.jpg" alt="Виктория ОНил" className="object-cover" />
              <AvatarFallback className="bg-lime-100 text-4xl font-bold text-lime-700 dark:bg-lime-900/30 dark:text-lime-400">
                VO
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

      <SidebarContent className="flex-1 px-4 py-6">
        <SidebarMenu className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            const isActive = (() => {
              if (pathname === item.href) return true;

              if (item.href === '/') {
                return pathname === '/' || pathname === '/en' || pathname === '/ru';
              }

              return pathname?.includes(item.href);
            })();

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-lime-500/10 text-lime-700 dark:bg-lime-400/10 dark:text-lime-400'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white'
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-lime-500 dark:bg-lime-400" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <div className="space-y-4 border-t border-gray-200 p-4 dark:border-gray-800">
        <Button className="w-full gap-2 bg-lime-600 text-white transition-all hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600">
          <Download size={16} />
          {t('cv')}
        </Button>

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
    </Sidebar>
  );
}

export { Sidebar };
