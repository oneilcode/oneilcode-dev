import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Users, User } from 'lucide-react';
import { FaGithub, FaYoutube } from 'react-icons/fa';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations('portfolio');

  const items = t.raw('items') as Array<{
    id: number;
    slug: string;
    title: string;
    description: string;
    tech: string[];
    github: string;
    demo: string | null;
    youtube: string | null;
    featured: boolean;
    type: 'personal' | 'team';
    role: string | null;
    features: string[];
    detail: {
      overview: string;
      role: string;
      challenge: string;
      solution: string;
      results: string;
    };
  }>;

  if (!Array.isArray(items)) {
    notFound();
  }

  const project = items.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {/* Назад */}
      <Link
        href={`/${locale}/portfolio`}
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        <ArrowLeft size={16} />
        {t('back')}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ===== ОСНОВНАЯ ЧАСТЬ ===== */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50">
            {/* Заголовок */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                  {project.title}
                </h1>
                {/* {project.type === 'team' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Users size={12} /> Team
                  </span>
                )}
                {project.type === 'personal' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <User size={12} /> Solo
                  </span>
                )} */}
                {/* {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-500 px-3 py-1 text-xs font-medium text-white">
                    ⭐ Featured
                  </span>
                )} */}
              </div>
              <p className="mt-2 text-gray-500 dark:text-gray-400">{project.description}</p>
            </div>

            {/* ===== СЕКЦИИ ===== */}
            <div className="space-y-8">
              {/* О проекте */}
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  О проекте
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{project.detail.overview}</p>
              </div>

              {/* Моя роль и вклад */}
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Моя роль и вклад
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {project.role || project.detail.role}
                </p>
              </div>

              {/* Проблемы и решения */}
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Проблемы и решения
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Задача:</span>{' '}
                    {project.detail.challenge}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Решение:</span>{' '}
                    {project.detail.solution}
                  </p>
                </div>
              </div>

              {/* Результаты */}
              <div>
                <h3 className="mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Результат
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{project.detail.results}</p>
              </div>

              {/* Фишки (опционально) */}
              {/* {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Ключевые фишки
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-lime-50 px-3 py-1 text-sm text-lime-700 dark:bg-lime-950/30 dark:text-lime-400"
                      >
                        ✦ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* ===== БОКОВАЯ ПАНЕЛЬ ===== */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50">
            {/* Заголовок + бейдж в правом верхнем углу */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                Стек и ссылки
              </h3>
              <div className="flex items-center gap-1.5">
                {project.type === 'team' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    <Users size={12} /> Team
                  </span>
                )}
                {project.type === 'personal' && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/80 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
                    <User size={12} /> Solo
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Ссылки */}
              <div>
                <div className="mt-1 space-y-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <FaGithub size={16} />
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-lime-600 px-3 py-2 text-sm text-white transition hover:bg-lime-700"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                  {project.youtube && (
                    <a
                      href={project.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm transition hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <FaYoutube size={16} />
                      Presentation
                    </a>
                  )}
                </div>
              </div>

              {/* Технологии */}
              <div>
                <h4 className="text-xs font-medium text-gray-400">Технологии</h4>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
