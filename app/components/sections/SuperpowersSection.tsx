'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SuperpowersSection() {
  const t = useTranslations('superpowers');
  const [openId, setOpenId] = useState<number | null>(null);

  const skills = t.raw('skills') as Array<{
    id: number;
    name: string;
    icon: string;
    experience: string[];
  }>;

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t('subtitle')}</p>
        <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-lime-400 to-emerald-400" />
      </motion.div>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
          >
            <button
              onClick={() => toggleOpen(skill.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{skill.icon}</span>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{skill.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{t('details')}</span>
                {openId === skill.id ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
                )}
              </div>
            </button>

            {openId === skill.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 px-6 py-4 dark:border-gray-800"
              >
                <div>
                  <ul className="space-y-1.5">
                    {skill.experience.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
