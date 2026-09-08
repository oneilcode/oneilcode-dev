'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Briefcase, GraduationCap, Code, FileCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ProgressAnimation } from '../features/ProgressAnimation';

const iconMap = {
  Code: <Code size={20} />,
  Briefcase: <Briefcase size={20} />,
  GraduationCap: <GraduationCap size={20} />,
};

export function JourneyTimelineSection() {
  const t = useTranslations('journey');

  const items = t.raw('items') as Array<{
    id: number;
    date: string;
    title: string;
    subtitle: string;
    description: string[];
    location: string;
    color: string;
    hasCertificate?: boolean;
    certificateUrl?: string;
  }>;

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-lime-400 to-emerald-400" />
      </motion.div>

      <div className="mb-12" suppressHydrationWarning>
        <ProgressAnimation />
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 hidden w-0.5 -translate-x-1/2 bg-linear-to-b from-lime-400/50 via-gray-200 to-gray-200 md:left-1/2 md:block dark:via-gray-700 dark:to-gray-700" />

        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = iconMap[
            item.color === 'yellow'
              ? 'Code'
              : item.color === 'green'
                ? 'Briefcase'
                : 'GraduationCap'
          ] || <Code size={20} />;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
              className={`relative mb-16 flex flex-col items-start gap-6 md:flex-row ${
                isEven ? 'md:pr-12' : 'md:ml-auto md:pl-12'
              } ${isEven ? 'md:flex-row md:text-right' : 'md:flex-row-reverse md:text-left'}`}
            >
              <div
                className={`absolute top-1 left-4 z-20 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 bg-white md:left-1/2 md:flex dark:bg-gray-900 ${
                  isEven
                    ? 'text-lime-600 dark:border-lime-400 dark:text-lime-400'
                    : 'border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
                }`}
              >
                {Icon}
              </div>

              <div className="absolute top-1 left-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-lime-500 bg-lime-500/10 text-lime-600 md:hidden dark:border-lime-400 dark:bg-lime-400/10 dark:text-lime-400">
                {Icon}
              </div>

              <div className="ml-16 w-full md:ml-0 md:w-[calc(50%-2rem)]">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900/50"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-lime-400 to-emerald-400" />

                  <div className="mb-3 flex items-center gap-2 text-sm font-medium text-lime-600 dark:text-lime-400">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-left text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-left font-medium text-gray-600 dark:text-gray-300">
                    {item.subtitle}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-left text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={14} />
                    <span>{item.location}</span>
                  </div>

                  <ul className="mt-3 space-y-1 text-left text-sm text-gray-600 dark:text-gray-300">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400/60" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {item.hasCertificate && item.certificateUrl && (
                    <div className="mt-4">
                      <Link
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-50/70 px-4 py-1.5 text-sm font-medium text-lime-700 transition-all hover:bg-lime-100 dark:border-lime-400/30 dark:bg-lime-950/30 dark:text-lime-400 dark:hover:bg-lime-950/50"
                      >
                        <FileCheck size={15} />
                        <span>{t('certificate')}</span>
                        <span className="text-xs opacity-60">↗</span>
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
