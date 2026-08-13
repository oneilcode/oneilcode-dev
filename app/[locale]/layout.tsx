import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
// import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppSidebar } from '@/app/components/layout/Sidebar';
import { Header } from '@/app/components/layout/Header';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
   
    <NextIntlClientProvider messages={messages}>
      <TooltipProvider>
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <main className="flex-1 min-h-screen">
            <Header />
            <div className="p-8">{children}</div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </NextIntlClientProvider>

  );
}