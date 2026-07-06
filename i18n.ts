import { getRequestConfig } from 'next-intl/server';

// Supported locales
export const locales = ['sk', 'cs'] as const;
export const defaultLocale = 'sk';

export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    const currentLocale = locales.includes(requestedLocale as Locale)
        ? requestedLocale as Locale
        : defaultLocale;

    return {
        locale: currentLocale,
        messages: (await import(`./messages/${currentLocale}.json`)).default
    };
});
