'use client';

import { motion } from 'framer-motion';
import { Send, Sparkles, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CONTACTS } from '@/constants';
import ContactForm from '../features/ContactForm';

export function ContactSection() {
  const t = useTranslations('contact');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (data: { name: string; email: string; message: string }) => {
    console.log('Sending:', data);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-3"
        >
          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Send size={20} className="text-lime-500" />
              {t('formTitle')}
            </h2>

            {isSubmitted ? (
              <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-lime-500/10">
                  <CheckCircle size={32} className="text-lime-500" />
                </div>
                <h3 className="text-lg font-medium">{t('successTitle')}</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t('successMessage')}
                </p>
              </div>
            ) : (
              <div className="flex-1">
                <ContactForm onSubmit={handleFormSubmit} />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="lg:col-span-2"
        >
          <div className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900/50">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
              <Sparkles size={20} className="text-lime-500" />
              {t('contactsTitle')}
            </h2>

            <div className="flex-1 space-y-3">
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
                    className={`group flex items-center gap-3 rounded-lg bg-gray-50 p-3 transition hover:bg-gray-100 dark:bg-gray-800/50 dark:hover:bg-gray-800`}
                  >
                    <div
                      className={`text-gray-500 transition-colors group-hover:text-current dark:text-gray-400 ${contact.color}`}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
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
