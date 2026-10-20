'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types/project';
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
        className="group block rounded-2xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-1 hover:border-lime-500/30 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-lime-400/30"
      >
        <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={450}
            priority={index < 2}
            className="h-full w-full object-fill transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {project.description}
        </p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-lime-600 opacity-60 transition group-hover:opacity-100 dark:text-lime-400">
          {t('detailLink')}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </motion.div>
  );
}
