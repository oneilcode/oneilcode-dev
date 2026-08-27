'use client';

import { submitForm } from '@/actions/submitForm';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

type FormState = {
  success: boolean;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
};

export default function ContactForm() {
  const t = useTranslations('contacts');

  const initialState: FormState = {
    success: false,
    message: '',
    errors: {},
  };

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitForm,
    initialState
  );

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
      } else if (!state.success && !state.errors) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder={t('name')}
        />
        {state?.errors?.name && <p className="mt-1 text-sm text-red-500">{state.errors.name[0]}</p>}
      </div>

      <div>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder={t('email')}
        />
        {state?.errors?.email && (
          <p className="mt-1 text-sm text-red-500">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 transition outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-500/50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          placeholder={t('message')}
        />
        {state?.errors?.message && (
          <p className="mt-1 text-sm text-red-500">{state.errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-lime-600 px-6 py-3 font-medium text-white transition hover:bg-lime-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-lime-500 dark:hover:bg-lime-600"
      >
        <Send size={18} />
        {isPending ? 'Отправка...' : t('submit')}
      </button>
    </form>
  );
}
