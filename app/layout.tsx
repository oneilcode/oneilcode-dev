import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@fontsource/playfair-display/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import { ThemeProvider } from './providers/ThemeProvider';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'OneilCode | Frontend Developer',
  description: 'Portfolio of a Frontend Developer',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <Toaster position="top-center" richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
