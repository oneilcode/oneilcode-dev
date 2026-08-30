import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">404</h1>
      <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{t('title')}</h2>
      <p className="mt-2 text-gray-500 dark:text-gray-400">{t('description')}</p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-lime-600 px-6 py-3 text-white transition hover:bg-lime-700"
      >
        {t('back')}
      </Link>
    </div>
  );
}
