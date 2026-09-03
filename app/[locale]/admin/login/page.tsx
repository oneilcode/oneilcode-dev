'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkPassword } from '@/actions/admin';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const isValid = await checkPassword(password);

      if (isValid) {
        document.cookie = 'admin=true; path=/; max-age=3600';
        router.push('/admin');
      } else {
        setError('Неверный пароль');
      }
    } catch {
      setError('Ошибка проверки пароля');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Вход в админку
        </h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Введите пароль для доступа к сообщениям
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            autoFocus
            disabled={isLoading}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-lime-600 px-6 py-3 font-medium text-white transition hover:bg-lime-700 disabled:opacity-50"
          >
            {isLoading ? 'Проверка...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}