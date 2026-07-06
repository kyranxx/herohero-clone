import { defaultLocale, locales } from '../../i18n';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export const siteUrl = configuredSiteUrl.replace(/\/+$/, '');

const creatorSlugs = ['sarahcreates', 'techwithjames', 'fitnessmaya', 'chefmarco', 'musicbylex'];

function localizedPath(locale: string, path = '') {
    return `/${locale}${path}`;
}

export function getPublicSitemapPaths() {
    return [
        ...locales.map((locale) => localizedPath(locale)),
        ...creatorSlugs.map((slug) => `/creator/${slug}`),
        ...locales.flatMap((locale) => creatorSlugs.map((slug) => localizedPath(locale, `/creator/${slug}`))),
    ];
}

export function getPublicSitemapUrls() {
    return getPublicSitemapPaths().map((path) => ({
        url: `${siteUrl}${path}`,
        label:
            path === localizedPath(defaultLocale)
                ? 'Domov'
                : path
                    .split('/')
                    .filter(Boolean)
                    .map((part) => part.replace(/-/g, ' '))
                    .join(' / '),
    }));
}
