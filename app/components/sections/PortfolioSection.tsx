'use client';

import { motion } from 'framer-motion';
import { Users, User } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

export function PortfolioSection() {
  const t = useTranslations('portfolio');
  const locale = useLocale();

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

  const getEmoji = (id: number) => {
    const emojis: Record<number, string> = {
      1: '🎯',
      2: '🛍️',
      3: '📝',
      4: '🎤',
      5: '🚀',
    };
    return emojis[id] || '📦';
  };

  const ProjectCard = ({ project, index }: { project: (typeof items)[0]; index: number }) => (
    <motion.div
      key={project.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: 'easeOut' }}
    >
      <Link
        href={`/${locale}/portfolio/${project.slug}`}
        className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-lime-500/30 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-lime-400/30"
      >
        <div className="mb-3 text-3xl">{getEmoji(project.id)}</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-lime-600 opacity-60 transition group-hover:opacity-100 dark:text-lime-400">
          Подробнее
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </motion.div>
  );

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <div className="mb-2 text-sm font-medium text-lime-600 dark:text-lime-400">PROJECTS</div>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-lime-400 to-emerald-400" />
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
              <ProjectCard key={project.id} project={project} index={index} />
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
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
