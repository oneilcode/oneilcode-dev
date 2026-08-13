import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from './providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'OneilCode | Frontend Developer',
  description: 'Portfolio of a Frontend Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>   {/* ← только здесь */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}