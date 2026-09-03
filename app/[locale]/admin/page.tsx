'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/client';
import { Trash2 } from 'lucide-react';

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function AdminPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAdmin = document.cookie.includes('admin=true');

    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }

    setTimeout(() => {
      loadMessages();
    }, 0);
  }, [loadMessages, router]);

  const deleteMessage = async (id: number) => {
    if (!confirm('Удалить сообщение?')) return;

    try {
      await supabaseClient.from('messages').delete().eq('id', id);
      setMessages(messages.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const logout = () => {
    document.cookie = 'admin=; path=/; max-age=0';
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Сообщения</h1>
          <p className="text-sm text-gray-500">Всего {messages.length} сообщений</p>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Выйти
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-900/50">
          <p className="text-gray-500">Пока нет сообщений</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-left dark:border-gray-800 dark:bg-gray-800/50">
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Дата</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Имя</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">Email</th>
                  <th className="px-4 py-3 font-medium text-gray-600 dark:text-gray-400">
                    Сообщение
                  </th>
                  <th className="px-4 py-3 text-center font-medium text-gray-600 dark:text-gray-400">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-gray-100 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {formatDate(msg.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                      {msg.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      <a
                        href={`mailto:${msg.email}`}
                        className="hover:text-lime-600 dark:hover:text-lime-400"
                      >
                        {msg.email}
                      </a>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-gray-600 dark:text-gray-400">
                      {msg.message}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/30"
                        aria-label="Удалить"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
