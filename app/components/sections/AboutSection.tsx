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
    { value: '2', label: t('stats.cats'), icon: PawPrint },
  ];

  return (
    <section className="px-4 py-8 sm:px-6 md:py-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-center sm:p-4 dark:border-gray-800 dark:bg-gray-900/50"
          >
            <stat.icon size={20} className="mx-auto mb-1 text-lime-500 sm:mb-1.5 sm:size-5.5" />
            <div className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
              {stat.value}
            </div>
            <div className="text-[10px] text-gray-500 sm:text-xs dark:text-gray-400">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="space-y-3 text-sm leading-relaxed text-gray-600 sm:space-y-4 sm:text-base dark:text-gray-300"
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
          className="inline-flex items-center gap-2 text-sm font-medium text-lime-600 hover:underline sm:text-base dark:text-lime-400"
        >
          {t('link')}
        </Link>
      </motion.div>
    </section>
  );
}
