import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/app/components/layout/Sidebar';
import { Header } from '@/app/components/layout/Header';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <TooltipProvider>
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <main className="min-h-screen flex-1">
            <Header />
            <div className="p-8">{children}</div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </NextIntlClientProvider>
  );
}
