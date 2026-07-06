import type { MetadataRoute } from 'next';
import { getPublicSitemapUrls } from '@/lib/sitemap';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    return getPublicSitemapUrls().map((entry) => ({
        url: entry.url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: entry.url.endsWith('/sk') ? 1 : 0.7,
    }));
}
