import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '../../../i18n';
import "../globals.css";

export const metadata: Metadata = {
    title: "Herohero | Podpor svojich obľúbených tvorcov",
    description: "Platforma bez rušivých prvkov na podporu tvorcov, ktorých milujete. Žiadne reklamy, žiadny algoritmus, len autentický obsah.",
    keywords: ["tvorcovia", "predplatné", "podpora", "obsah", "komunita"],
    openGraph: {
        title: "Herohero | Podpor svojich obľúbených tvorcov",
        description: "Platforma bez rušivých prvkov na podporu tvorcov, ktorých milujete.",
        type: "website",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#0a0a0a",
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!locales.includes(locale as typeof locales[number])) {
        notFound();
    }

    // Get messages for the current locale
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
