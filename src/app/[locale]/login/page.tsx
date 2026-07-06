"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";
import styles from "./page.module.css";

export default function LoginPage() {
    const t = useTranslations();
    const locale = useLocale();
    const [mode, setMode] = useState<"login" | "register">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsLoading(false);
        // Handle actual auth here
    };

    return (
        <div className={styles.page}>
            {/* Back button */}
            <Link href={`/${locale}`} className={styles.backBtn}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </Link>

            {/* Language Switcher */}
            <div className={styles.langSwitcherContainer}>
                <LanguageSwitcher />
            </div>

            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>◆</span>
                        <span className={styles.logoText}>{t('common.appName')}</span>
                    </div>
                    <p className={styles.tagline}>
                        {mode === "login"
                            ? t('login.welcomeBack')
                            : t('login.joinCommunity')}
                    </p>
                </div>

                {/* Auth Form */}
                <form className={styles.form} onSubmit={handleSubmit}>
                    {mode === "register" && (
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>{t('login.name')}</label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder={t('login.yourName')}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('login.email')}</label>
                        <input
                            type="email"
                            className={styles.input}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>{t('login.password')}</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                    </div>

                    {mode === "login" && (
                        <Link href={`/${locale}/forgot-password`} className={styles.forgotLink} prefetch={false}>
                            {t('common.forgotPassword')}
                        </Link>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className={styles.spinner} />
                        ) : (
                            mode === "login" ? t('common.signIn') : t('common.createAccount')
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className={styles.divider}>
                    <span>{t('common.or')}</span>
                </div>

                {/* Social Login */}
                <div className={styles.socialButtons}>
                    <button className={styles.socialBtn}>
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                            <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                            <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                            <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                        </svg>
                        {t('login.google')}
                    </button>

                    <button className={styles.socialBtn}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        {t('login.twitter')}
                    </button>
                </div>

                {/* Toggle Mode */}
                <p className={styles.toggleText}>
                    {mode === "login" ? (
                        <>
                            {t('common.noAccount')}{" "}
                            <button
                                type="button"
                                className={styles.toggleBtn}
                                onClick={() => setMode("register")}
                            >
                                {t('common.signUp')}
                            </button>
                        </>
                    ) : (
                        <>
                            {t('common.hasAccount')}{" "}
                            <button
                                type="button"
                                className={styles.toggleBtn}
                                onClick={() => setMode("login")}
                            >
                                {t('common.signIn')}
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
