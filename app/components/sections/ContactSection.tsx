'use client';

import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CONTACTS } from '@/constants';
import ContactForm from '../features/ContactForm';

export function ContactSection() {
  const t = useTranslations('contacts');

  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center sm:mb-10 md:mb-12"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base dark:text-gray-400">
          {t('subtitle')}
        </p>
        <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-linear-to-r from-lime-400 to-emerald-400 sm:mt-4 sm:w-20" />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-5 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
              <Send size={18} className="text-lime-500 sm:size-5" />
              {t('formTitle')}
            </h2>

            <div className="flex-1">
              <ContactForm />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold sm:text-xl">
              <Sparkles size={18} className="text-lime-500 sm:size-5" />
              {t('contactsTitle')}
            </h2>

            <div className="flex-1 space-y-2 sm:space-y-3">
              {CONTACTS.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`group flex items-center gap-3 rounded-lg bg-gray-50 p-2.5 transition hover:bg-gray-100 sm:p-3 dark:bg-gray-800/50 dark:hover:bg-gray-800`}
                  >
                    <div
                      className={`text-gray-500 transition-colors group-hover:text-current dark:text-gray-400 ${contact.color}`}
                    >
                      <Icon size={18} className="sm:size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                        {contact.label}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
