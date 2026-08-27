'use client';

import { motion } from 'framer-motion';
import { Users, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { PortfolioCard } from '../features/PortfolioCard';

export function PortfolioSection() {
  const t = useTranslations('portfolio');

  const items = t.raw('items') as Array<{
    id: number;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo: string | null;
    featured: boolean;
    type: 'personal' | 'team';
    role: string | null;
    features: string[];
  }>;

  if (!Array.isArray(items)) {
    return null;
  }

  const personalProjects = items.filter((p) => p.type === 'personal');
  const teamProjects = items.filter((p) => p.type === 'team');

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-lime-400 to-emerald-400" />
      </motion.div>

      {teamProjects.length > 0 && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t('teamTitle')}
            </h2>
          </div>
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      )}

      {personalProjects.length > 0 && (
        <>
          <div className="mb-4 flex items-center gap-2">
            <User size={18} className="text-purple-500" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {t('personalTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((project, index) => (
              <PortfolioCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
