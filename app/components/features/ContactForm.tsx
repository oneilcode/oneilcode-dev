'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

interface ContactFormProps {
  onSubmit: (data: { name: string; email: string; message: string }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        placeholder="Ваше имя"
      />

      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        placeholder="Email"
      />

      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={4}
        className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        placeholder="Сообщение"
      />

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-medium text-white transition hover:bg-lime-700 dark:bg-lime-500 dark:hover:bg-lime-600"
      >
        <Send size={18} />
        Отправить
      </button>
    </form>
  );
}
