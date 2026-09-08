'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Compass, Ship, Code2, PawPrint } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('about');

  const stats = [
    { value: '50+', label: t('stats.countries'), icon: Compass },
    { value: 'C1', label: t('stats.language'), icon: Ship },
    { value: '2+', label: t('stats.experience'), icon: Code2 },
    { value: '2', label: t('stats.cats'), icon: PawPrint  },
  ];

  return (
    <section className="px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
         className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
             className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center dark:border-gray-800 dark:bg-gray-900/50 sm:p-4"
          >
             <stat.icon
              size={20}
              className="mx-auto mb-1 text-lime-500 sm:size-5.5 sm:mb-1.5"
            />
            <div className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{stat.value}</div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 sm:text-xs">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:space-y-4 sm:text-base"
      >
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
        <p>{t('cats')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <Link
          href="/journey"
          className="inline-flex items-center gap-2 text-sm font-medium text-lime-600 hover:underline dark:text-lime-400 sm:text-base"
        >
          {t('link')}
        </Link>
      </motion.div>
    </section>
  );
}
