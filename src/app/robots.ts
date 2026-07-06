import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/sitemap';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/login', '/sk/login', '/cs/login'],
            },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
    };
}
