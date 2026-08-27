'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AboutSection from './AboutSection';
import { AVATAR, TECHNOLOGIES } from '@/constants';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="flex min-h-[85vh] items-center justify-center px-4">
      <div className="max-w-2xl space-y-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-lime-500/20 shadow-lg md:h-32 md:w-32 dark:border-lime-400/20">
            <Image
              src={AVATAR}
              alt="Виктория ОНил"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-medium tracking-[0.3em] text-gray-500 uppercase dark:text-gray-400"
          >
            {t('title')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl leading-[1.1] font-light tracking-tight md:text-7xl"
          >
            {t('name')}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {TECHNOLOGIES.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
        </motion.div>
        <AboutSection />
      </div>
    </section>
  );
}
