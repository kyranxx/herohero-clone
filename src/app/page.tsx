"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

// Mock data for creators
const CREATORS = [
  {
    id: "1",
    username: "sarahcreates",
    displayName: "Sarah Creates",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    bio: "Digital artist & illustrator sharing exclusive tutorials",
    subscribers: 2847,
    price: 5,
    category: "Art",
    coverImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    username: "techwithjames",
    displayName: "Tech with James",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    bio: "Behind-the-scenes of building startups",
    subscribers: 5231,
    price: 7,
    category: "Tech",
    coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    username: "fitnessmaya",
    displayName: "Maya Fitness",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    bio: "Personal trainer with exclusive workout plans",
    subscribers: 8924,
    price: 6,
    category: "Fitness",
    coverImage: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    username: "chefmarco",
    displayName: "Chef Marco",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    bio: "Michelin-trained chef sharing secret recipes",
    subscribers: 3412,
    price: 4,
    category: "Food",
    coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    username: "musicbylex",
    displayName: "Lex Music",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    bio: "Producer & songwriter with exclusive tracks",
    subscribers: 4156,
    price: 5,
    category: "Music",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=400&fit=crop",
  },
];

const CATEGORIES = ["All", "Art", "Tech", "Fitness", "Food", "Music", "Gaming", "Education"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCreators = CREATORS.filter((creator) => {
    const matchesCategory = activeCategory === "All" || creator.category === activeCategory;
    const matchesSearch =
      creator.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      creator.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={styles.logoText}>herohero</span>
          </div>
          <Link href="/login" className={styles.loginBtn}>
            Sign in
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Support creators<br />you <span className={styles.accent}>love</span>
        </h1>
        <p className={styles.heroSubtitle}>
          No ads. No algorithm. Just authentic content.
        </p>

        {/* Search */}
        <div className={styles.searchContainer}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search creators..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Categories */}
      <div className={styles.categories}>
        <div className={styles.categoriesScroll}>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.categoryPill} ${activeCategory === category ? styles.categoryActive : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Grid */}
      <main className={styles.main}>
        <div className={styles.creatorsGrid}>
          {filteredCreators.map((creator, index) => (
            <Link
              href={`/creator/${creator.username}`}
              key={creator.id}
              className={styles.creatorCard}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Cover Image */}
              <div className={styles.cardCover}>
                <img
                  src={creator.coverImage}
                  alt=""
                  className={styles.coverImage}
                />
                <div className={styles.coverOverlay} />
              </div>

              {/* Creator Info */}
              <div className={styles.cardContent}>
                <img
                  src={creator.avatar}
                  alt={creator.displayName}
                  className={styles.creatorAvatar}
                />
                <div className={styles.creatorInfo}>
                  <h3 className={styles.creatorName}>{creator.displayName}</h3>
                  <p className={styles.creatorBio}>{creator.bio}</p>
                  <div className={styles.creatorMeta}>
                    <span className={styles.subscribers}>
                      {creator.subscribers.toLocaleString()} fans
                    </span>
                    <span className={styles.price}>
                      €{creator.price}/mo
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className={styles.bottomNav}>
        <Link href="/" className={`${styles.navItem} ${styles.navItemActive}`}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span>Discover</span>
        </Link>
        <Link href="/subscriptions" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          <span>Following</span>
        </Link>
        <Link href="/create" className={styles.navItem}>
          <div className={styles.createBtn}>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </Link>
        <Link href="/messages" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Messages</span>
        </Link>
        <Link href="/profile" className={styles.navItem}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
}
