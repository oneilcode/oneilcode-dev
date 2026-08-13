'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';  // ← из корневой components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';  // ← из корневой lib

const navigation = [
  { name: 'The Origin', href: '/' },
  { name: 'The Journey', href: '/journey' },
  { name: 'Superpowers', href: '/portfolio' },
  { name: 'Call to Action', href: '/contact' },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b pb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              VO
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold">OneilCode</h1>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton>
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <div className="border-t p-4">
        <Button className="w-full">Download CV</Button>
      </div>
    </Sidebar>
  );
}

export { Sidebar };
