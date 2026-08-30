'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { MapPin, Mail, Home, Briefcase } from 'lucide-react';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const useNavigation = () => {
  const t = useTranslations('navigation');

  return [
    { name: t('home'), href: '/', icon: Home },
    { name: t('journey'), href: '/journey', icon: MapPin },
    { name: t('portfolio'), href: '/portfolio', icon: Briefcase },
    { name: t('contact'), href: '/contact', icon: Mail },
  ];
};

export function SidebarNavigation() {
  const pathname = usePathname();
  const navigation = useNavigation();

  return (
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
              <SidebarMenuButton className="p-0">
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
  );
}
