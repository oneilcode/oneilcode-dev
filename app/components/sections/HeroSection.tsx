'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import AboutSection from './AboutSection';
import { AVATAR, TECHNOLOGIES } from '@/constants';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="flex min-h-[calc(100vh-60px)] items-center justify-center px-4 py-8 sm:py-12 md:min-h-[calc(100vh-80px)] md:py-0">
      <div className="max-w-2xl space-y-4 text-center md:space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-lime-500/20 shadow-lg sm:h-24 sm:w-24 md:h-32 md:w-32 dark:border-lime-400/20">
            <Image
              src={AVATAR}
              alt="Виктория ОНил"
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        <div className="space-y-1 md:space-y-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xs font-medium tracking-[0.3em] text-gray-500 uppercase sm:text-sm dark:text-gray-400"
          >
            {t('title')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-3xl leading-[1.1] font-light tracking-tight sm:text-4xl md:text-5xl lg:text-7xl"
          >
            {t('name')}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
        >
          {TECHNOLOGIES.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-gray-200 px-2 py-0.5 text-[10px] text-gray-500 sm:px-3 sm:py-1 sm:text-xs dark:border-gray-700 dark:text-gray-400"
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
