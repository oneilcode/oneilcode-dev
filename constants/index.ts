import { Mail, Briefcase } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa';

export const TECHNOLOGIES = [
  'JavaScript',
  'TypeScript',
  'HTML',
  'CSS',
  'React',
  'Next.js',
  'Redux',
  'RTK',
  'Zustand',
  'Vite',
  'Webpack',
  'Git',
  'REST',
  'Linux',
  'Jest',
  'Cypress',
  'Zod',
];

export const CONTACTS = [
  {
    icon: FaTelegram,
    label: 'Telegram',
    href: 'https://t.me/vikaoneil',
    color: 'hover:text-blue-400',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: 'https://wa.me/79990876564',
    color: 'hover:text-green-500',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/viktoriia-o-neil-956167228',
    color: 'hover:text-blue-600',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/oneilcode',
    color: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:oneilcode111@gmail.com',
    color: 'hover:text-red-500',
  },
  {
    icon: Briefcase,
    label: 'Habr Career',
    href: 'https://career.habr.com/vikaoneil',
    color: 'hover:text-orange-500',
  },
];
