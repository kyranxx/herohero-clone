import type { Metadata } from 'next';
import { getPublicSitemapUrls } from '@/lib/sitemap';

export const metadata: Metadata = {
    title: 'Mapa stránky | Herohero',
    description: 'Prehľad verejných stránok a ukážkových profilov tvorcov.',
};

export default function HtmlSitemapPage() {
    const entries = getPublicSitemapUrls();

    return (
        <main style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', padding: '48px 20px' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
                <p style={{ color: '#ff3366', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Herohero
                </p>
                <h1 style={{ margin: '12px 0 0', fontSize: 'clamp(2rem, 6vw, 3.5rem)', lineHeight: 1.05 }}>
                    Mapa stránky
                </h1>
                <p style={{ marginTop: '16px', maxWidth: '640px', color: '#c9c9c9', lineHeight: 1.7 }}>
                    Verejný prehľad lokalizovaných stránok a ukážkových profilov tvorcov.
                </p>

                <ol
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
                        gap: '12px',
                        padding: 0,
                        margin: '36px 0 0',
                        listStyle: 'none',
                    }}
                >
                    {entries.map((entry) => (
                        <li key={entry.url}>
                            <a
                                href={entry.url}
                                style={{
                                    display: 'block',
                                    border: '1px solid rgba(255,255,255,0.14)',
                                    borderRadius: '8px',
                                    padding: '12px 14px',
                                    color: '#fff',
                                    textDecoration: 'none',
                                    background: 'rgba(255,255,255,0.04)',
                                    fontWeight: 600,
                                }}
                            >
                                {entry.label}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </main>
    );
}
