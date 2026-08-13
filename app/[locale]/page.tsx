'use client';

import Link from 'next/link';

export default  function HeroTypographic() {
  return (
    <section className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-2xl">
        <p className="text-sm text-gray-400 dark:text-gray-500 tracking-[0.3em] uppercase">
          Frontend Developer
        </p>

        <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[1.1]">
          Виктория
          <br />
          <span className="font-medium">ОНил</span>
        </h1>

        <p className="text-sm text-gray-400 dark:text-gray-500 tracking-wider">
          Россия · Удалённая работа
        </p>

        <div className="flex justify-center gap-6 pt-4">
          <Link
            href="/portfolio"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Проекты
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link
            href="/contact"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Контакты
          </Link>
          <span className="text-gray-300 dark:text-gray-600">/</span>
          <Link
            href="/journey"
            className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
          >
            Мой путь
          </Link>
        </div>
      </div>
    </section>
  );
}