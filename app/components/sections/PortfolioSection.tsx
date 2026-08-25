'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Swagger Editor App',
    description: 'Редактор Swagger-спецификаций с деплоем на Netlify',
    tech: ['React', 'TypeScript', 'Swagger'],
    github: 'https://github.com/oneilcode',
    demo: 'https://example.com',
    image: '/projects/swagger.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'Interview Simulator',
    description: 'Симулятор собеседований на TypeScript + React',
    tech: ['TypeScript', 'React', 'Team Project'],
    github: 'https://github.com/oneilcode',
    demo: null,
    image: '/projects/interview.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'Сайт-визитка с локализацией и тёмной темой',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    github: 'https://github.com/oneilcode/oneilcode-dev',
    demo: 'https://oneilcode-dev.vercel.app',
    image: '/projects/portfolio.jpg',
    featured: false,
  },
];

export function PortfolioSection() {
  return (
    <section className="mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Мои проекты</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Пет-проекты и командные работы</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="relative flex h-48 items-center justify-center bg-linear-to-br from-lime-100 to-lime-200 dark:from-lime-900/30 dark:to-lime-800/20">
              <div className="text-6xl opacity-50">
                {project.id === 1 && '📝'}
                {project.id === 2 && '🎤'}
                {project.id === 3 && '🚀'}
              </div>
              {project.featured && (
                <span className="absolute top-3 right-3 rounded-full bg-lime-500 px-2 py-1 text-xs text-white">
                  Featured
                </span>
              )}
            </div>

            <div className="p-5">
              <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {project.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition hover:text-gray-900 dark:hover:text-white"
                    aria-label="GitHub"
                  ></a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 transition hover:text-lime-600 dark:hover:text-lime-400"
                    aria-label="Demo"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
