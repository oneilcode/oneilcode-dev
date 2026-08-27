'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Project = {
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
};

const emojis: Record<number, string> = {
  1: '🎯',
  2: '🛍️',
  3: '📝',
  4: '🎤',
  5: '🚀',
};

const getEmoji = (id: number) => emojis[id] || '📦';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function PortfolioCard({ project, index }: ProjectCardProps) {
  const t = useTranslations('portfolio');
  const locale = useLocale();

  return (
    <motion.div
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
          {t('detailLink')}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </motion.div>
  );
}
