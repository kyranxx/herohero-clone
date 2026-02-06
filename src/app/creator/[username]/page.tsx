"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import styles from "./page.module.css";

// Mock creator data
const CREATORS: Record<string, {
    username: string;
    displayName: string;
    avatar: string;
    bio: string;
    subscribers: number;
    price: number;
    coverImage: string;
    joinedDate: string;
    socialLinks: { platform: string; url: string }[];
}> = {
    sarahcreates: {
        username: "sarahcreates",
        displayName: "Sarah Creates",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
        bio: "Digital artist & illustrator sharing exclusive tutorials, behind-the-scenes of my creative process, and early access to new artwork. Join my community of 2,800+ art enthusiasts!",
        subscribers: 2847,
        price: 5,
        coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=400&fit=crop",
        joinedDate: "2023",
        socialLinks: [
            { platform: "instagram", url: "#" },
            { platform: "twitter", url: "#" },
        ],
    },
    techwithjames: {
        username: "techwithjames",
        displayName: "Tech with James",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
        bio: "Behind-the-scenes of building startups. Weekly deep-dives into tech, coding tutorials, and exclusive Q&A sessions.",
        subscribers: 5231,
        price: 7,
        coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
        joinedDate: "2022",
        socialLinks: [
            { platform: "twitter", url: "#" },
            { platform: "youtube", url: "#" },
        ],
    },
};

// Mock posts data
const POSTS = [
    {
        id: "1",
        type: "video",
        title: "New Tutorial: Digital Painting Basics",
        preview: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop",
        isLocked: true,
        date: "2 hours ago",
        comments: 24,
    },
    {
        id: "2",
        type: "image",
        title: "Work in Progress - Fantasy Landscape",
        preview: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=300&fit=crop",
        isLocked: false,
        date: "1 day ago",
        comments: 42,
    },
    {
        id: "3",
        type: "video",
        title: "Live Stream Recording: Q&A Session",
        preview: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=400&h=300&fit=crop",
        isLocked: true,
        date: "3 days ago",
        comments: 89,
    },
    {
        id: "4",
        type: "text",
        title: "Exclusive: My Creative Process Revealed",
        preview: "",
        isLocked: true,
        date: "1 week ago",
        comments: 15,
    },
];

export default function CreatorProfile() {
    const params = useParams();
    const username = params.username as string;
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [activeTab, setActiveTab] = useState<"posts" | "about">("posts");

    // Get creator data or use default
    const creator = CREATORS[username] || {
        username: username,
        displayName: username,
        avatar: `https://ui-avatars.com/api/?name=${username}&background=ff3366&color=fff`,
        bio: "Creator profile",
        subscribers: 0,
        price: 5,
        coverImage: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=400&fit=crop",
        joinedDate: "2024",
        socialLinks: [],
    };

    const handleSubscribe = () => {
        setIsSubscribed(!isSubscribed);
    };

    return (
        <div className={styles.page}>
            {/* Back Header */}
            <header className={styles.header}>
                <Link href="/" className={styles.backBtn}>
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </Link>
                <button className={styles.shareBtn}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="18" cy="5" r="3" />
                        <circle cx="6" cy="12" r="3" />
                        <circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                </button>
            </header>

            {/* Cover Image */}
            <div className={styles.coverContainer}>
                <img
                    src={creator.coverImage}
                    alt=""
                    className={styles.coverImage}
                />
                <div className={styles.coverGradient} />
            </div>

            {/* Profile Info */}
            <div className={styles.profileSection}>
                <div className={styles.avatarContainer}>
                    <img
                        src={creator.avatar}
                        alt={creator.displayName}
                        className={styles.avatar}
                    />
                </div>

                <div className={styles.profileInfo}>
                    <h1 className={styles.displayName}>{creator.displayName}</h1>
                    <p className={styles.username}>@{creator.username}</p>

                    <p className={styles.bio}>{creator.bio}</p>

                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{creator.subscribers.toLocaleString()}</span>
                            <span className={styles.statLabel}>subscribers</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{POSTS.length}</span>
                            <span className={styles.statLabel}>posts</span>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{creator.joinedDate}</span>
                            <span className={styles.statLabel}>joined</span>
                        </div>
                    </div>

                    {/* Subscribe Button */}
                    <button
                        className={`${styles.subscribeBtn} ${isSubscribed ? styles.subscribed : ""}`}
                        onClick={handleSubscribe}
                    >
                        {isSubscribed ? (
                            <>
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                                Subscribed
                            </>
                        ) : (
                            <>
                                Subscribe for €{creator.price}/mo
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Content Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "posts" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    Posts
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "about" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("about")}
                >
                    About
                </button>
            </div>

            {/* Content */}
            <main className={styles.content}>
                {activeTab === "posts" ? (
                    <div className={styles.postsGrid}>
                        {POSTS.map((post, index) => (
                            <article
                                key={post.id}
                                className={styles.postCard}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {post.preview && (
                                    <div className={styles.postPreview}>
                                        <img src={post.preview} alt="" className={styles.postImage} />
                                        {post.isLocked && !isSubscribed && (
                                            <div className={styles.lockedOverlay}>
                                                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                                                </svg>
                                                <span>Subscribe to unlock</span>
                                            </div>
                                        )}
                                        {post.type === "video" && (
                                            <div className={styles.playIcon}>
                                                <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className={styles.postInfo}>
                                    <h3 className={styles.postTitle}>{post.title}</h3>
                                    <div className={styles.postMeta}>
                                        <span>{post.date}</span>
                                        <span>·</span>
                                        <span>{post.comments} comments</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className={styles.aboutSection}>
                        <div className={styles.aboutCard}>
                            <h3>About {creator.displayName}</h3>
                            <p>{creator.bio}</p>
                        </div>

                        {creator.socialLinks.length > 0 && (
                            <div className={styles.aboutCard}>
                                <h3>Connect</h3>
                                <div className={styles.socialLinks}>
                                    {creator.socialLinks.map((link) => (
                                        <a key={link.platform} href={link.url} className={styles.socialLink}>
                                            {link.platform}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.aboutCard}>
                            <h3>Subscription includes</h3>
                            <ul className={styles.benefitsList}>
                                <li>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--success)">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Access to all exclusive posts
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--success)">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Direct messaging
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--success)">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Early access to new content
                                </li>
                                <li>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="var(--success)">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    Support the creator directly
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
