"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import styles from './LanguageSwitcher.module.css';

const languages = [
    { code: 'sk', name: 'SK', flag: '🇸🇰' },
    { code: 'cs', name: 'CZ', flag: '🇨🇿' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        // Remove current locale from pathname if present
        const segments = pathname.split('/');
        const currentLocaleIndex = segments.findIndex(s => ['sk', 'cs'].includes(s));

        if (currentLocaleIndex !== -1) {
            segments[currentLocaleIndex] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }

        const newPath = segments.join('/') || '/';
        router.push(newPath);
    };

    return (
        <div className={styles.switcher}>
            {languages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => switchLocale(lang.code)}
                    className={`${styles.langBtn} ${locale === lang.code ? styles.active : ''}`}
                    aria-label={`Switch to ${lang.name}`}
                >
                    <span className={styles.flag}>{lang.flag}</span>
                    <span className={styles.code}>{lang.name}</span>
                </button>
            ))}
        </div>
    );
}
