import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale,

    localePrefix: 'always'
});

export const config = {
    // Match all pathnames except for
    // - API routes
    // - Static files (/_next, /images, etc.)
    // - Favicon and other root files
    matcher: ['/', '/(sk|cs)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
