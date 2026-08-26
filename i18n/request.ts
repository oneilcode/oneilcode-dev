import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale =
    requestedLocale && routing.locales.includes(requestedLocale as 'en' | 'ru')
      ? (requestedLocale as 'en' | 'ru')
      : routing.defaultLocale;

  const messages = {
    ...(await import(`../messages/${locale}.json`)).default,
    ...(await import(`../messages/journey/${locale}.json`)).default,
    ...(await import(`../messages/portfolio/${locale}.json`)).default,
    ...(await import(`../messages/contacts/${locale}.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
