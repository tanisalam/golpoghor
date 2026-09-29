import { useState, useEffect, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=Noto+Serif+Bengali:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');`;

const COLORS = {
  navy: "#0D1117",
  cream: "#F5ECD7",
  gold: "#C9A84C",
  goldLight: "#E8C87A",
  terracotta: "#B5541A",
  sage: "#4A6741",
  offWhite: "#EDE8DC",
  parchment: "#F0E6C8",
  inkDark: "#1A1F2E",
  warmGray: "#8B7355",
};

const READING_THEMES = {
  modern: {
    name: "আধুনিক",
    bg: "#FAFAFA",
    text: "#1A1A2E",
    accent: "#C9A84C",
    surface: "#FFFFFF",
    border: "#E0D8CC",
    font: "'Noto Serif Bengali', serif",
    ui: "#666",
    label: "Modern",
  },
  diary: {
    name: "ডায়েরি",
    bg: "#F5EAC8",
    text: "#2C1810",
    accent: "#8B4513",
    surface: "#FBF0D9",
    border: "#C8A878",
    font: "'Noto Serif Bengali', serif",
    ui: "#6B4226",
    label: "Diary",
    lined: true,
  },
  vintage: {
    name: "ভিন্টেজ",
    bg: "#1C1208",
    text: "#E8D5A3",
    accent: "#C9A84C",
    surface: "#251A0A",
    border: "#4A3520",
    font: "'Playfair Display', 'Noto Serif Bengali', serif",
    ui: "#A08040",
    label: "Vintage",
  },
  amoled: {
    name: "রাত্রি",
    bg: "#000000",
    text: "#E8E8E8",
    accent: "#C9A84C",
    surface: "#0A0A0A",
    border: "#1A1A1A",
    font: "'Noto Serif Bengali', serif",
    ui: "#888",
    label: "AMOLED",
  },
  typewriter: {
    name: "টাইপরাইটার",
    bg: "#F2EDD4",
    text: "#1A1208",
    accent: "#444",
    surface: "#F8F3E0",
    border: "#999",
    font: "'Courier Prime', 'Noto Serif Bengali', monospace",
    ui: "#555",
    label: "Typewriter",
  },
};

const STORIES = [
  {
    id: 1,
    title: "নীল দিগন্তের শেষে",
    author: "তাসনিম আহমেদ",
    genre: "উপন্যাস",
    rating: 4.8,
    reads: "৪২হাজার",
    premium: false,
    verified: true,
    color: "#2D4A6B",
    quote: "সেদিন বৃষ্টি নামলে সে জানালার পাশে বসে ভাবছিল—জীবন আসলে কতটা ছোট, স্মৃতি কতটা দীর্ঘ।",
    excerpt: `আকাশের রং যখন বদলে যায়, তখন মনে হয় পুরো পৃথিবীটাই নতুন হয়ে উঠছে। রাফি জানালার ধারে বসে সেই পরিবর্তন দেখছিল—নীল থেকে কমলা, কমলা থেকে বেগুনি, তারপর একটা গাঢ় রাতের অন্ধকার।\n\n"তুমি কি কখনো ভেবেছ," সে বলল নিজেকেই, "যদি একটা দিন চিরকাল থেমে থাকত? শুধু এই মুহূর্তটুকু।"\n\nকিন্তু সময় থামে না। সে কখনো থামেনি। এবং রাফি জানত, এই শহর ছেড়ে যেতেই হবে তাকে—যেমন বৃষ্টির পানি মাটির সাথে মিশে যায়, যেমন ধোঁয়া আকাশে মিলিয়ে যায়।`,
  },
  {
    id: 2,
    title: "আলোর পথিক",
    author: "মেহজাবিন চৌধুরী",
    genre: "কবিতা",
    rating: 4.9,
    reads: "১লক্ষ",
    premium: true,
    verified: true,
    color: "#6B2D4A",
    quote: "তোমার চোখে যে জল আসে, সেটা দুর্বলতা নয়—সেটা তোমার মানবতার প্রমাণ।",
    excerpt: `আলোর পথে হাঁটতে হাঁটতে\nযখন অন্ধকার নামে,\nমনে রেখো—প্রতিটি রাতের শেষে\nভোর আসে নিজ নামে।\n\nতুমি একা নও এই পথে,\nলক্ষ পথিক সাথে আছে,\nপ্রতিটি তারা জ্বলছে সেথায়\nতোমার জন্যই রাতের কাছে।`,
  },
  {
    id: 3,
    title: "পুরনো ঢাকার গলিতে",
    author: "সিফাত হোসেন",
    genre: "ভৌতিক",
    rating: 4.7,
    reads: "২৮হাজার",
    premium: false,
    verified: false,
    color: "#2D4A2D",
    quote: "রাত তিনটায় যখন মসজিদের মিনার থেকে আজান ভেসে আসে না, তখন বুঝতে হয় কিছু একটা ঠিক নেই।",
    excerpt: `পুরনো ঢাকার সেই গলিটা আমি আর কখনো দিনের আলোতে দেখিনি। প্রথমবার গিয়েছিলাম রাত দশটায়, বন্ধুর বাসা খুঁজতে। পথ হারিয়ে ফেলেছিলাম।\n\nগলির ভেতরে একটা পুরনো কলের আওয়াজ। ট্যাপ বন্ধ, কিন্তু পানি পড়ছে। মাটিতে পানির দাগ—কিন্তু তাজা। যেন কেউ এইমাত্র গেছে।\n\nআমি ডাক দিলাম। কোনো সাড়া নেই।`,
  },
  {
    id: 4,
    title: "শেষ বর্ষার চিঠি",
    author: "নাদিরা ইসলাম",
    genre: "রোমান্স",
    rating: 4.6,
    reads: "৫৫হাজার",
    premium: true,
    verified: true,
    color: "#4A2D2D",
    quote: "তুমি চলে যাওয়ার পরও বৃষ্টি আসে—এবারও আসবে, কিন্তু তোমাকে আর জানাতে পারব না।",
    excerpt: `প্রিয়,\n\nতুমি বলেছিলে শেষ বর্ষায় একটা চিঠি লিখব তোমাকে। আজ লিখছি। জানালার বাইরে বৃষ্টি—তুমি বলতে যে বৃষ্টির শব্দ শুনলে আমার কথা মনে পড়ে।\n\nআমারও তাই।\n\nকিন্তু এবার চিঠিটা পাঠাব না। কারণ তুমি এখন অন্য কারো জীবনের বৃষ্টি হয়ে গেছ।`,
  },
];

const GENRES = ["সব", "উপন্যাস", "কবিতা", "ডায়েরি", "ভৌতিক", "রোমান্স", "ছোটগল্প", "ইতিহাস"];

const styles = `
${FONTS}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'DM Sans', sans-serif; }

.app {
  width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  background: ${COLORS.navy};
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* Grain overlay */
.app::before {
  content: '';
  position: fixed;
  inset: 0;
  width: 390px;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
  opacity: 0.5;
}

/* SPLASH */
.splash {
  width: 100%;
  height: 100vh;
  background: linear-gradient(160deg, #0D1117 0%, #1A1F2E 40%, #0F1A0F 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.splash-bg {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 300px 200px at 50% 30%, rgba(201,168,76,0.12) 0%, transparent 70%),
    radial-gradient(ellipse 200px 300px at 20% 70%, rgba(74,103,65,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 250px 150px at 80% 80%, rgba(181,84,26,0.06) 0%, transparent 60%);
}

.splash-book {
  width: 160px;
  height: 120px;
  margin-bottom: 32px;
  position: relative;
  animation: floatBook 4s ease-in-out infinite;
}

@keyframes floatBook {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.splash-title {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 56px;
  font-weight: 700;
  color: ${COLORS.gold};
  line-height: 1;
  margin-bottom: 12px;
  text-shadow: 0 0 60px rgba(201,168,76,0.4);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { text-shadow: 0 0 60px rgba(201,168,76,0.4); }
  50% { text-shadow: 0 0 80px rgba(201,168,76,0.7), 0 0 120px rgba(201,168,76,0.2); }
}

.splash-tagline {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 16px;
  color: ${COLORS.offWhite};
  opacity: 0.7;
  margin-bottom: 48px;
  letter-spacing: 0.5px;
}

.splash-divider {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, ${COLORS.gold}, transparent);
  margin: 0 auto 48px;
}

.cta-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 280px;
}

.cta-primary {
  background: linear-gradient(135deg, ${COLORS.gold}, #A8802A);
  color: ${COLORS.navy};
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.3px;
}
.cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.4); }

.cta-secondary {
  background: transparent;
  color: ${COLORS.offWhite};
  border: 1px solid rgba(237,232,220,0.3);
  padding: 16px 32px;
  border-radius: 12px;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}
.cta-secondary:hover { border-color: ${COLORS.gold}; color: ${COLORS.gold}; }

/* NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 390px;
  background: rgba(13,17,23,0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(201,168,76,0.15);
  display: flex;
  justify-content: space-around;
  padding: 10px 0 20px;
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  border: none;
  background: transparent;
}

.nav-icon { font-size: 22px; line-height: 1; }
.nav-label {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 10px;
  color: rgba(237,232,220,0.4);
}
.nav-item.active .nav-label { color: ${COLORS.gold}; }
.nav-item.active .nav-icon { filter: drop-shadow(0 0 4px rgba(201,168,76,0.6)); }

/* HEADER */
.screen-header {
  padding: 52px 20px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-logo {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: ${COLORS.gold};
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(201,168,76,0.2);
  background: rgba(201,168,76,0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${COLORS.gold};
  font-size: 16px;
  transition: all 0.2s;
}
.icon-btn:hover { background: rgba(201,168,76,0.15); }

/* SEARCH */
.search-bar {
  margin: 0 20px 16px;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 12px;
  padding: 10px 16px;
  gap: 10px;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: ${COLORS.offWhite};
  font-family: 'Noto Serif Bengali', serif;
  font-size: 14px;
  flex: 1;
}
.search-input::placeholder { color: rgba(237,232,220,0.3); }

/* GENRE PILLS */
.genre-scroll {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 20px 16px;
  scrollbar-width: none;
}
.genre-scroll::-webkit-scrollbar { display: none; }

.genre-pill {
  flex-shrink: 0;
  padding: 7px 16px;
  border-radius: 20px;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  border: 1px solid rgba(201,168,76,0.2);
  background: transparent;
  color: rgba(237,232,220,0.6);
}
.genre-pill.active {
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  border-color: ${COLORS.gold};
  font-weight: 600;
}

/* FEATURED BANNER */
.featured-banner {
  margin: 0 20px 24px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  height: 220px;
  cursor: pointer;
}

.featured-bg {
  position: absolute;
  inset: 0;
  transition: transform 0.6s ease;
}
.featured-banner:hover .featured-bg { transform: scale(1.03); }

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
}

.featured-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.featured-title {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 22px;
  font-weight: 700;
  color: white;
  margin-bottom: 4px;
  line-height: 1.3;
}

.featured-author {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 10px;
}

.typewriter-quote {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  font-style: italic;
  line-height: 1.5;
  border-left: 2px solid ${COLORS.gold};
  padding-left: 10px;
}

/* SECTION HEADER */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 14px;
}

.section-title {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.offWhite};
}

.section-more {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${COLORS.gold};
  cursor: pointer;
  background: none;
  border: none;
}

/* HORIZONTAL STORY CARDS */
.h-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 0 20px 20px;
  scrollbar-width: none;
}
.h-scroll::-webkit-scrollbar { display: none; }

.story-card-h {
  flex-shrink: 0;
  width: 140px;
  cursor: pointer;
  transition: transform 0.25s;
}
.story-card-h:hover { transform: translateY(-4px); }

.story-cover {
  width: 140px;
  height: 195px;
  border-radius: 10px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
  box-shadow: 4px 6px 20px rgba(0,0,0,0.5);
}

.cover-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 12px;
}

.cover-title-small {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-align: center;
  line-height: 1.4;
  text-shadow: 0 1px 6px rgba(0,0,0,0.8);
}

.premium-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'DM Sans', sans-serif;
}

.card-author {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: rgba(237,232,220,0.5);
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}

.card-genre {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 10px;
  color: ${COLORS.gold};
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 4px;
  padding: 1px 6px;
}

.card-rating {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: rgba(237,232,220,0.5);
  display: flex;
  align-items: center;
  gap: 2px;
}

/* VERTICAL STORY LIST */
.story-list { padding: 0 20px 100px; display: flex; flex-direction: column; gap: 12px; }

.story-list-item {
  display: flex;
  gap: 14px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,168,76,0.1);
  border-radius: 14px;
  padding: 14px;
  cursor: pointer;
  transition: all 0.25s;
  position: relative;
  overflow: hidden;
}

.story-list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: ${COLORS.gold};
  opacity: 0;
  transition: opacity 0.2s;
}
.story-list-item:hover::before { opacity: 1; }
.story-list-item:hover { background: rgba(255,255,255,0.06); transform: translateX(4px); }

.list-cover {
  width: 60px;
  height: 84px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6px;
  overflow: hidden;
}

.list-info { flex: 1; min-width: 0; }

.list-title {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 15px;
  font-weight: 600;
  color: ${COLORS.offWhite};
  margin-bottom: 4px;
  line-height: 1.4;
}

.list-author {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: rgba(237,232,220,0.5);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.verified-badge {
  color: ${COLORS.gold};
  font-size: 11px;
}

.list-stats {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

/* READING SCREEN */
.reading-screen {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 0.5s;
}

.reading-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 52px 16px 12px;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.reading-progress-bar {
  height: 3px;
  transition: background 0.5s;
}

.reading-content {
  flex: 1;
  padding: 20px 24px;
  line-height: 1.9;
}

.chapter-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
}

.reading-body {
  font-size: 17px;
  line-height: 1.9;
  white-space: pre-line;
}

.reading-controls {
  padding: 16px 20px 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.theme-bar {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  overflow-x: auto;
  scrollbar-width: none;
}
.theme-bar::-webkit-scrollbar { display: none; }

.theme-dot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 700;
  transition: all 0.2s;
}
.theme-dot.active { border-color: ${COLORS.gold}; transform: scale(1.15); }

.lined-bg {
  background-image: repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.08) 28px);
}

/* WRITER DASHBOARD */
.dashboard {
  min-height: 100vh;
  background: ${COLORS.navy};
  padding-bottom: 100px;
}

.dashboard-hero {
  background: linear-gradient(135deg, #1A1F2E 0%, #0D1117 100%);
  padding: 52px 20px 24px;
  border-bottom: 1px solid rgba(201,168,76,0.12);
  position: relative;
  overflow: hidden;
}

.dashboard-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 250px 150px at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 70%);
}

.welcome-text {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 14px;
  color: rgba(237,232,220,0.5);
  margin-bottom: 4px;
}

.writer-name {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 26px;
  font-weight: 700;
  color: ${COLORS.offWhite};
}

.writer-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(201,168,76,0.15);
  border: 1px solid rgba(201,168,76,0.3);
  border-radius: 20px;
  padding: 4px 10px;
  margin-top: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: ${COLORS.gold};
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 20px;
}

.stat-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 14px;
  padding: 16px;
}

.stat-label {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 12px;
  color: rgba(237,232,220,0.4);
  margin-bottom: 8px;
}

.stat-value {
  font-family: 'DM Sans', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: ${COLORS.offWhite};
}

.stat-change {
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: #4A9B6A;
  margin-top: 4px;
}

.earnings-graph {
  margin: 0 20px 20px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,168,76,0.1);
  border-radius: 14px;
  padding: 16px;
}

.graph-title {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 14px;
  color: ${COLORS.offWhite};
  margin-bottom: 12px;
}

.graph-bars {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
}

.graph-bar {
  flex: 1;
  border-radius: 4px 4px 0 0;
  transition: all 0.8s ease;
  cursor: pointer;
  position: relative;
}
.graph-bar:hover { filter: brightness(1.3); }

.graph-labels {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}
.graph-label {
  flex: 1;
  text-align: center;
  font-family: 'DM Sans', sans-serif;
  font-size: 9px;
  color: rgba(237,232,220,0.3);
}

.my-stories { padding: 0 20px 16px; }

.stories-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.story-item-dash {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(201,168,76,0.08);
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.story-dash-cover {
  width: 44px;
  height: 60px;
  border-radius: 6px;
  flex-shrink: 0;
}

.story-dash-title {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 14px;
  font-weight: 600;
  color: ${COLORS.offWhite};
  margin-bottom: 4px;
}

.status-badge {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  font-weight: 600;
}

.status-published { background: rgba(74,155,106,0.15); color: #4A9B6A; }
.status-draft { background: rgba(201,168,76,0.15); color: ${COLORS.gold}; }
.status-review { background: rgba(181,84,26,0.15); color: ${COLORS.terracotta}; }

.write-cta {
  margin: 0 20px;
  background: linear-gradient(135deg, ${COLORS.gold}, #A8802A);
  color: ${COLORS.navy};
  border: none;
  width: calc(100% - 40px);
  padding: 16px;
  border-radius: 14px;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s;
}
.write-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(201,168,76,0.35); }

/* PAYMENT SCREEN */
.payment-screen {
  min-height: 100vh;
  background: ${COLORS.navy};
}

.payment-preview {
  position: relative;
  padding: 20px 24px;
  margin: 20px;
  background: rgba(245,236,215,0.05);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 16px;
}

.preview-text {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 15px;
  color: ${COLORS.offWhite};
  line-height: 1.8;
}

.preview-fade {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(transparent, rgba(13,17,23,0.95));
  border-radius: 0 0 16px 16px;
}

.unlock-card {
  margin: 0 20px;
  background: rgba(201,168,76,0.06);
  border: 1px solid rgba(201,168,76,0.25);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
}

.lock-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.unlock-title {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.offWhite};
  margin-bottom: 8px;
}

.unlock-price {
  font-family: 'DM Sans', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: ${COLORS.gold};
  margin-bottom: 4px;
}

.writer-note {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 12px;
  color: rgba(237,232,220,0.5);
  margin-top: 8px;
  margin-bottom: 20px;
  font-style: italic;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.pay-btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}

.bkash-btn { background: rgba(220,20,60,0.1); border-color: rgba(220,20,60,0.3); color: #E83C6B; }
.nagad-btn { background: rgba(255,140,0,0.1); border-color: rgba(255,140,0,0.3); color: #FF8C00; }
.card-btn { background: rgba(74,103,65,0.1); border-color: rgba(74,103,65,0.3); color: #6DB05C; }

.pay-btn:hover { transform: translateY(-1px); }

.full-book-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  background: transparent;
  border: 1px dashed rgba(201,168,76,0.3);
  color: ${COLORS.gold};
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}
.full-book-btn:hover { background: rgba(201,168,76,0.05); }

/* WRITER PROFILE */
.profile-hero {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.profile-hero-bg {
  position: absolute;
  inset: 0;
}

.profile-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13,17,23,1) 0%, transparent 60%);
}

.profile-avatar {
  position: absolute;
  bottom: -30px;
  left: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid ${COLORS.gold};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.profile-info {
  padding: 44px 20px 20px;
}

.profile-name {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 22px;
  font-weight: 700;
  color: ${COLORS.offWhite};
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.profile-bio {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 13px;
  color: rgba(237,232,220,0.6);
  line-height: 1.6;
  margin-bottom: 16px;
}

.profile-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.profile-stat {
  text-align: center;
}

.profile-stat-num {
  font-family: 'DM Sans', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.offWhite};
}

.profile-stat-label {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 11px;
  color: rgba(237,232,220,0.4);
}

.profile-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.follow-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  background: ${COLORS.gold};
  color: ${COLORS.navy};
  border: none;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tip-btn {
  flex: 1;
  padding: 12px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid rgba(201,168,76,0.3);
  color: ${COLORS.gold};
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.works-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 0 20px 100px;
}

.work-card {
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s;
}
.work-card:hover { transform: scale(1.03); }

.work-cover {
  height: 150px;
  display: flex;
  align-items: flex-end;
  padding: 10px;
}

.work-title {
  font-family: 'Noto Serif Bengali', serif;
  font-size: 13px;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 6px rgba(0,0,0,0.8);
  line-height: 1.4;
}

/* EDITOR */
.editor-screen {
  min-height: 100vh;
  background: #0F1117;
  display: flex;
  flex-direction: column;
}

.editor-header {
  padding: 52px 16px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

.editor-title-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Noto Serif Bengali', serif;
  font-size: 18px;
  font-weight: 600;
  color: ${COLORS.offWhite};
}
.editor-title-input::placeholder { color: rgba(237,232,220,0.2); }

.editor-body {
  flex: 1;
  padding: 20px 20px;
}

.editor-textarea {
  width: 100%;
  min-height: 300px;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Noto Serif Bengali', serif;
  font-size: 16px;
  color: rgba(237,232,220,0.85);
  line-height: 2;
  resize: none;
}
.editor-textarea::placeholder { color: rgba(237,232,220,0.2); }

.editor-settings {
  padding: 16px 20px;
  border-top: 1px solid rgba(255,255,255,0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.setting-label {
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 13px;
  color: rgba(237,232,220,0.5);
}

.toggle {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 0.3s;
  border: none;
}

.commission-note {
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.15);
  border-radius: 10px;
  padding: 12px;
  font-family: 'Noto Serif Bengali', serif;
  font-size: 12px;
  color: ${COLORS.gold};
  line-height: 1.6;
}

.publish-actions {
  display: flex;
  gap: 10px;
  padding: 16px 20px 100px;
}

.publish-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  background: linear-gradient(135deg, ${COLORS.gold}, #A8802A);
  color: ${COLORS.navy};
  border: none;
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.draft-btn {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  background: transparent;
  border: 1px solid rgba(201,168,76,0.3);
  color: ${COLORS.gold};
  font-family: 'Hind Siliguri', sans-serif;
  font-size: 16px;
  cursor: pointer;
}

.autosave {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 20px 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 11px;
  color: rgba(237,232,220,0.3);
}

.autosave-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4A9B6A;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* ORNAMENTS */
.ornament-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 20px;
  margin-bottom: 16px;
}
.ornament-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent); }
.ornament-symbol { font-size: 14px; color: rgba(201,168,76,0.5); }

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in { animation: fadeInUp 0.5s ease forwards; }
.fade-in-delay-1 { animation: fadeInUp 0.5s ease 0.1s both; }
.fade-in-delay-2 { animation: fadeInUp 0.5s ease 0.2s both; }
.fade-in-delay-3 { animation: fadeInUp 0.5s ease 0.3s both; }

@keyframes inkBleed {
  from { stroke-dashoffset: 300; }
  to { stroke-dashoffset: 0; }
}

.ink-draw { animation: inkBleed 1.5s ease forwards; stroke-dasharray: 300; }

/* Wax seal */
.wax-seal {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(circle, #C0392B, #8B0000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 12px rgba(0,0,0,0.5);
  animation: sealPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes sealPop {
  from { transform: scale(0) rotate(-30deg); }
  to { transform: scale(1) rotate(0deg); }
}
`;

// Story cover gradients
const coverGradient = (color, idx) => {
  const palettes = [
    `linear-gradient(160deg, #1A3A4A 0%, #2D6B8A 50%, ${color} 100%)`,
    `linear-gradient(140deg, #2D1A4A 0%, #6B2D7A 50%, ${color} 100%)`,
    `linear-gradient(160deg, #1A2D1A 0%, #2D5A2D 50%, ${color} 100%)`,
    `linear-gradient(140deg, #3A1A1A 0%, #7A2D2D 50%, ${color} 100%)`,
  ];
  return palettes[idx % palettes.length];
};

function TypewriterText({ text, speed = 40 }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed(text.slice(0, idx + 1));
        setIdx(i => i + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [idx, text, speed]);
  useEffect(() => { setDisplayed(""); setIdx(0); }, [text]);
  return <span>{displayed}<span style={{ opacity: idx < text.length ? 1 : 0, transition: "opacity 0.3s" }}>|</span></span>;
}

export default function Golpoghor() {
  const [screen, setScreen] = useState("splash");
  const [activeNav, setActiveNav] = useState("home");
  const [activeGenre, setActiveGenre] = useState("সব");
  const [readingTheme, setReadingTheme] = useState("modern");
  const [fontSize, setFontSize] = useState(17);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [progress, setProgress] = useState(23);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [graphAnimated, setGraphAnimated] = useState(false);

  // Cycle featured story
  useEffect(() => {
    const t = setInterval(() => setFeaturedIdx(i => (i + 1) % STORIES.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (screen === "dashboard") setTimeout(() => setGraphAnimated(true), 300);
    else setGraphAnimated(false);
  }, [screen]);

  const featured = STORIES[featuredIdx];
  const theme = READING_THEMES[readingTheme];

  const navigate = (s, nav) => {
    setScreen(s);
    if (nav) setActiveNav(nav);
  };

  const openStory = (story) => {
    setSelectedStory(story);
    setIsPremium(story.premium);
    setScreen(story.premium ? "payment" : "reading");
  };

  const earningsBars = [45, 62, 38, 78, 55, 90, 72];
  const barLabels = ["সো", "র", "মং", "বৃ", "শু", "শ", "র"];

  return (
    <div className="app">
      <style>{styles}</style>

      {/* === SPLASH === */}
      {screen === "splash" && (
        <div className="splash">
          <div className="splash-bg" />
          {/* Illustrated book SVG */}
          <div className="splash-book">
            <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <ellipse cx="80" cy="90" rx="60" ry="8" fill="url(#glow)" />
              {/* Left page */}
              <path d="M20 20 Q20 15 28 15 L78 18 L80 100 L20 100 Z" fill="#F5ECD7" stroke="#C9A84C" strokeWidth="0.5" />
              {/* Right page */}
              <path d="M80 18 L132 15 Q140 15 140 20 L140 100 L80 100 Z" fill="#EDE8DC" stroke="#C9A84C" strokeWidth="0.5" />
              {/* Spine glow */}
              <line x1="80" y1="18" x2="80" y2="100" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8" />
              {/* Golden light effect */}
              <ellipse cx="80" cy="55" rx="30" ry="40" fill="#C9A84C" opacity="0.08" />
              {/* Lines on pages */}
              {[30,38,46,54,62,70,78,86].map(y => (
                <g key={y}>
                  <line x1="28" y1={y} x2="75" y2={y} stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
                  <line x1="85" y1={y} x2="132" y2={y} stroke="#C9A84C" strokeWidth="0.4" opacity="0.3" />
                </g>
              ))}
              {/* Bengali char on left */}
              <text x="40" y="60" fontFamily="Hind Siliguri" fontSize="12" fill="#C9A84C" opacity="0.4" textAnchor="middle">গল্প</text>
              {/* Star on right */}
              <text x="110" y="60" fontFamily="serif" fontSize="14" fill="#C9A84C" opacity="0.5" textAnchor="middle">✦</text>
            </svg>
          </div>

          <div className="splash-title fade-in">গল্পঘর</div>
          <div className="splash-tagline fade-in-delay-1">যেখানে গল্প বেঁচে থাকে</div>
          <div className="splash-divider fade-in-delay-2" />

          <div className="cta-group fade-in-delay-3">
            <button className="cta-primary" onClick={() => navigate("home", "home")}>
              পড়তে শুরু করো
            </button>
            <button className="cta-secondary" onClick={() => navigate("editor")}>
              লেখক হও
            </button>
          </div>
        </div>
      )}

      {/* === HOME === */}
      {screen === "home" && (
        <div style={{ background: COLORS.navy, minHeight: "100vh", paddingBottom: 80 }}>
          {/* Header */}
          <div className="screen-header">
            <div className="header-logo">গল্পঘর</div>
            <div className="header-actions">
              <button className="icon-btn">🔔</button>
              <button className="icon-btn" onClick={() => navigate("profile-writer")}>👤</button>
            </div>
          </div>

          {/* Search */}
          <div className="search-bar">
            <span style={{ color: "rgba(201,168,76,0.5)", fontSize: 16 }}>🔍</span>
            <input className="search-input" placeholder="গল্প, লেখক বা বিষয় খুঁজুন..." />
          </div>

          {/* Genres */}
          <div className="genre-scroll">
            {GENRES.map(g => (
              <button key={g} className={`genre-pill ${activeGenre === g ? "active" : ""}`} onClick={() => setActiveGenre(g)}>
                {g}
              </button>
            ))}
          </div>

          {/* Featured */}
          <div className="featured-banner" onClick={() => openStory(featured)}>
            <div className="featured-bg" style={{ background: coverGradient(featured.color, featuredIdx) }} />
            <div className="featured-overlay">
              <div className="featured-badge">⭐ এই সপ্তাহের বাছাই</div>
              <div className="featured-title">{featured.title}</div>
              <div className="featured-author">{featured.author} · {featured.genre}</div>
              <div className="typewriter-quote">
                <TypewriterText text={`"${featured.quote}"`} speed={35} />
              </div>
            </div>
          </div>

          {/* Best of week */}
          <div className="ornament-divider">
            <div className="ornament-line" />
            <span className="ornament-symbol">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="section-header">
            <span className="section-title">এই সপ্তাহের সেরা</span>
            <button className="section-more">সব দেখো →</button>
          </div>

          <div className="h-scroll">
            {STORIES.map((s, i) => (
              <div className="story-card-h" key={s.id} onClick={() => openStory(s)} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="story-cover">
                  <div className="cover-inner" style={{ background: coverGradient(s.color, i) }}>
                    <div className="cover-title-small">{s.title}</div>
                  </div>
                  {s.premium && <div className="premium-badge">প্রিমিয়াম</div>}
                </div>
                <div className="card-author">
                  {s.author}
                  {s.verified && <span className="verified-badge">✓</span>}
                </div>
                <div className="card-meta">
                  <span className="card-genre">{s.genre}</span>
                  <span className="card-rating">⭐ {s.rating}</span>
                </div>
              </div>
            ))}
          </div>

          {/* New stories */}
          <div className="ornament-divider">
            <div className="ornament-line" />
            <span className="ornament-symbol">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="section-header">
            <span className="section-title">নতুন প্রকাশিত</span>
            <button className="section-more">সব দেখো →</button>
          </div>

          <div className="story-list">
            {STORIES.map((s, i) => (
              <div className="story-list-item" key={s.id} onClick={() => openStory(s)}>
                <div className="list-cover" style={{ background: coverGradient(s.color, i) }}>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{s.genre}</div>
                </div>
                <div className="list-info">
                  <div className="list-title">{s.title}</div>
                  <div className="list-author">
                    {s.author}
                    {s.verified && <span className="verified-badge">✓</span>}
                  </div>
                  <div className="list-stats">
                    <span className="card-genre">{s.genre}</span>
                    <span className="card-rating">⭐ {s.rating}</span>
                    <span style={{ fontSize: 10, color: "rgba(237,232,220,0.3)", fontFamily: "'DM Sans', sans-serif" }}>👁 {s.reads}</span>
                    {s.premium && <span style={{ fontSize: 10, background: "rgba(201,168,76,0.15)", color: COLORS.gold, padding: "1px 6px", borderRadius: 4, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>৳</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === READING SCREEN === */}
      {screen === "reading" && selectedStory && (
        <div className="reading-screen" style={{ background: theme.bg, minHeight: "100vh" }}>
          {/* Progress bar */}
          <div className="reading-progress-bar" style={{ background: `linear-gradient(90deg, ${theme.accent} ${progress}%, rgba(0,0,0,0.1) ${progress}%)` }} />

          {/* Header */}
          <div className="reading-header" style={{ background: `${theme.bg}dd` }}>
            <button onClick={() => navigate("home", "home")} style={{ background: "none", border: "none", cursor: "pointer", color: theme.ui, fontSize: 20 }}>←</button>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: theme.ui }}>
              অধ্যায় ১ · {progress}%
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setBookmarked(b => !b)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18 }}>
                {bookmarked ? "🔖" : "📌"}
              </button>
              <button onClick={() => setShowThemePicker(t => !t)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: theme.accent }}>🎨</button>
            </div>
          </div>

          {/* Theme picker */}
          {showThemePicker && (
            <div style={{ background: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: "10px 16px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: theme.ui, marginBottom: 8 }}>থিম বেছে নাও</div>
              <div className="theme-bar" style={{ padding: 0 }}>
                {Object.entries(READING_THEMES).map(([key, t]) => (
                  <div key={key} className={`theme-dot ${readingTheme === key ? "active" : ""}`}
                    style={{ background: t.bg, border: `2px solid ${readingTheme === key ? COLORS.gold : t.border}`, color: t.text }}
                    onClick={() => setReadingTheme(key)}
                    title={t.name}>
                    <span style={{ fontSize: 8, fontWeight: 700 }}>{t.label[0]}</span>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 8 }}>
                  <button onClick={() => setFontSize(s => Math.max(13, s - 1))} style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: theme.ui, fontSize: 16 }}>A−</button>
                  <button onClick={() => setFontSize(s => Math.min(22, s + 1))} style={{ background: "none", border: `1px solid ${theme.border}`, borderRadius: 6, width: 28, height: 28, cursor: "pointer", color: theme.ui, fontSize: 16 }}>A+</button>
                </div>
              </div>
            </div>
          )}

          {/* Lined bg for diary */}
          <div className={`reading-content ${theme.lined ? "lined-bg" : ""}`} style={{ background: theme.bg }}>
            <div className="chapter-title" style={{ fontFamily: theme.font, color: theme.text, borderBottom: `2px solid ${theme.accent}`, paddingBottom: 12 }}>
              {readingTheme === "diary" ? "~ প্রথম অধ্যায় ~" : "প্রথম অধ্যায়"}
            </div>
            <div className="reading-body" style={{ fontFamily: theme.font, color: theme.text, fontSize: fontSize }}>
              {selectedStory.excerpt}
            </div>

            {/* Decorative quote */}
            <div style={{
              margin: "24px 0",
              padding: "16px 20px",
              borderLeft: `3px solid ${theme.accent}`,
              background: `${theme.accent}10`,
              borderRadius: "0 8px 8px 0",
              fontFamily: theme.font,
              fontSize: fontSize - 1,
              color: theme.text,
              fontStyle: "italic",
              lineHeight: 1.7,
            }}>
              {selectedStory.quote}
            </div>

            <div className="reading-body" style={{ fontFamily: theme.font, color: theme.text, fontSize: fontSize }}>
              গল্পটি এখনো শেষ হয়নি। পরের পাতায় আরো অনেক কথা অপেক্ষা করছে—যেমন নদীর বাঁকে লুকানো জলের শব্দ, যেমন বৃষ্টির রাতে কেউ একা জানালায় দাঁড়িয়ে থাকে।
            </div>
          </div>

          {/* Nav controls */}
          <div className="reading-controls" style={{ background: theme.surface, borderTop: `1px solid ${theme.border}`, paddingBottom: 100 }}>
            <button style={{ padding: "10px 20px", borderRadius: 10, background: "transparent", border: `1px solid ${theme.border}`, color: theme.ui, fontFamily: "'Hind Siliguri', sans-serif", cursor: "pointer" }}>
              ← আগের
            </button>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: theme.ui }}>১/৮</div>
            <button style={{ padding: "10px 20px", borderRadius: 10, background: theme.accent, border: "none", color: readingTheme === "amoled" || readingTheme === "vintage" ? COLORS.navy : "white", fontFamily: "'Hind Siliguri', sans-serif", cursor: "pointer", fontWeight: 600 }}>
              পরের →
            </button>
          </div>
        </div>
      )}

      {/* === PAYMENT SCREEN === */}
      {screen === "payment" && selectedStory && (
        <div className="payment-screen">
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "52px 20px 16px" }}>
            <button onClick={() => navigate("home", "home")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gold, fontSize: 20 }}>←</button>
            <div style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 16, color: COLORS.offWhite }}>{selectedStory.title}</div>
          </div>

          {/* Preview with fade */}
          <div className="payment-preview">
            <div className="preview-text">{selectedStory.excerpt.slice(0, 180)}...</div>
            <div className="preview-fade" />
          </div>

          <div style={{ marginTop: 20 }}>
            <div className="unlock-card">
              <div className="lock-icon">🔒</div>
              <div className="unlock-title">এই অধ্যায় আনলক করো</div>
              <div className="unlock-price">৳ ২৫</div>
              <div className="writer-note">
                তোমার এই কেনাকাটা সরাসরি লেখক<br />
                <strong style={{ color: COLORS.gold }}>{selectedStory.author}</strong>-এর কাছে যাবে
              </div>

              <div className="payment-methods">
                <button className="pay-btn bkash-btn">
                  <span style={{ fontSize: 18 }}>💳</span> bKash দিয়ে দাও
                </button>
                <button className="pay-btn nagad-btn">
                  <span style={{ fontSize: 18 }}>📱</span> Nagad দিয়ে দাও
                </button>
                <button className="pay-btn card-btn" onClick={() => { setScreen("reading"); setIsPremium(false); }}>
                  <span style={{ fontSize: 18 }}>🏦</span> কার্ড দিয়ে দাও
                </button>
              </div>

              <button className="full-book-btn">
                📚 সম্পূর্ণ বই কিনুন — ৳১৮০ (৳৪০ ছাড়)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === DASHBOARD === */}
      {screen === "dashboard" && (
        <div className="dashboard">
          <div className="dashboard-hero">
            <div className="welcome-text">নমস্কার,</div>
            <div className="writer-name">তাসনিম আহমেদ</div>
            <div className="writer-badge">
              <span>✓</span> যাচাইকৃত লেখক
            </div>
          </div>

          <div className="stats-grid">
            {[
              { label: "মোট পাঠক", value: "৪২,৩৮৭", change: "+১২৪৮ এই সপ্তাহে" },
              { label: "মোট আয়", value: "৳৮,৯৪০", change: "+৳১,২০০ এই মাসে" },
              { label: "মাসের ভিউ", value: "১৮,৪২১", change: "+৩৪% বৃদ্ধি" },
              { label: "নতুন ফলোয়ার", value: "৩৪৭", change: "+৫৬ আজকে" },
            ].map((s, i) => (
              <div className="stat-card fade-in" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className="stat-change">{s.change}</div>
              </div>
            ))}
          </div>

          <div className="earnings-graph fade-in-delay-1">
            <div className="graph-title">এই সপ্তাহের আয়</div>
            <div className="graph-bars">
              {earningsBars.map((h, i) => (
                <div key={i} className="graph-bar" style={{
                  height: graphAnimated ? `${h}%` : "0%",
                  background: `linear-gradient(to top, ${COLORS.terracotta}, ${COLORS.gold})`,
                  transition: `height 0.8s ease ${i * 0.1}s`,
                  opacity: 0.8 + (i === 5 ? 0.2 : 0),
                  border: i === 5 ? `1px solid ${COLORS.gold}` : "none",
                }} />
              ))}
            </div>
            <div className="graph-labels">
              {barLabels.map((l, i) => <span key={i} className="graph-label">{l}</span>)}
            </div>
          </div>

          <div className="my-stories">
            <div className="stories-header">
              <span className="section-title">আমার গল্পগুলো</span>
              <button className="section-more">সব দেখো</button>
            </div>
            {[
              { title: "নীল দিগন্তের শেষে", status: "published", reads: "৪২হাজার" },
              { title: "শেষ বর্ষার চিঠি", status: "published", reads: "৫৫হাজার" },
              { title: "অন্ধকারের রং", status: "draft", reads: "—" },
              { title: "স্বপ্নের মানচিত্র", status: "review", reads: "—" },
            ].map((s, i) => (
              <div className="story-item-dash" key={i}>
                <div className="story-dash-cover" style={{ background: coverGradient(STORIES[i % STORIES.length].color, i) }} />
                <div style={{ flex: 1 }}>
                  <div className="story-dash-title">{s.title}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className={`status-badge status-${s.status}`}>
                      {{ published: "প্রকাশিত", draft: "খসড়া", review: "পর্যালোচনায়" }[s.status]}
                    </span>
                    {s.reads !== "—" && <span style={{ fontSize: 11, color: "rgba(237,232,220,0.35)", fontFamily: "'DM Sans', sans-serif" }}>👁 {s.reads}</span>}
                  </div>
                </div>
                <span style={{ color: "rgba(237,232,220,0.2)", fontSize: 18 }}>›</span>
              </div>
            ))}
          </div>

          <button className="write-cta" onClick={() => navigate("editor")}>
            <span style={{ fontSize: 20 }}>✍</span>
            নতুন গল্প লেখো
          </button>
        </div>
      )}

      {/* === EDITOR === */}
      {screen === "editor" && (
        <div className="editor-screen">
          <div className="editor-header">
            <button onClick={() => navigate("dashboard")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.gold, fontSize: 20 }}>←</button>
            <input className="editor-title-input" placeholder="গল্পের শিরোনাম লেখো..." defaultValue="" />
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(237,232,220,0.3)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>অধ্যায় ১</button>
          </div>

          <div className="autosave">
            <div className="autosave-dot" />
            স্বয়ংক্রিয়ভাবে সেভ হচ্ছে...
          </div>

          <div className="editor-body">
            <textarea
              className="editor-textarea"
              placeholder="এখানে তোমার গল্প শুরু করো...&#10;&#10;একটি কলম, একটি কাগজ, আর একটি গল্প—এই তিনটি জিনিসই যথেষ্ট একটি পৃথিবী তৈরি করতে।"
            />
          </div>

          <div style={{ padding: "8px 20px" }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["উপন্যাস", "কবিতা", "ভৌতিক", "রোমান্স", "ডায়েরি"].map(g => (
                <button key={g} style={{
                  padding: "5px 12px", borderRadius: 16, border: "1px solid rgba(201,168,76,0.2)",
                  background: g === "উপন্যাস" ? "rgba(201,168,76,0.15)" : "transparent",
                  color: g === "উপন্যাস" ? COLORS.gold : "rgba(237,232,220,0.4)",
                  fontFamily: "'Hind Siliguri', sans-serif", fontSize: 12, cursor: "pointer"
                }}>{g}</button>
              ))}
            </div>
          </div>

          <div className="editor-settings">
            <div className="setting-row">
              <span className="setting-label">প্রিমিয়াম অধ্যায়</span>
              <button className="toggle" style={{ background: "rgba(201,168,76,0.3)", position: "relative" }}>
                <div style={{ position: "absolute", top: 2, right: 2, width: 20, height: 20, borderRadius: "50%", background: COLORS.gold }} />
              </button>
            </div>
            <div className="commission-note">
              💰 মূল্য: ৳২৫ | তুমি পাবে: <strong>৳২০</strong> | প্ল্যাটফর্ম পাবে: ৳৫
            </div>
            <div className="setting-row">
              <span className="setting-label">বয়স সীমা (১৮+)</span>
              <button className="toggle" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div style={{ position: "absolute", top: 2, left: 2, width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
              </button>
            </div>
          </div>

          <div className="publish-actions">
            <button className="draft-btn">খসড়া রাখো</button>
            <button className="publish-btn">প্রকাশ করো ✦</button>
          </div>
        </div>
      )}

      {/* === WRITER PROFILE === */}
      {screen === "profile-writer" && (
        <div style={{ background: COLORS.navy, minHeight: "100vh", paddingBottom: 80 }}>
          {/* Hero */}
          <div className="profile-hero">
            <div className="profile-hero-bg" style={{ background: "linear-gradient(135deg, #1A3A4A, #2D4A6B, #4A2D6B)" }} />
            <div className="profile-hero-overlay" />
            <button onClick={() => navigate("home", "home")} style={{
              position: "absolute", top: 52, left: 16,
              background: "rgba(0,0,0,0.3)", border: "none", borderRadius: 8,
              color: "white", fontSize: 18, width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>←</button>
            <div className="profile-avatar" style={{ background: "linear-gradient(135deg, #2D6B8A, #1A3A4A)" }}>
              ত
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-name">
              তাসনিম আহমেদ
              <span style={{ color: COLORS.gold, fontSize: 16 }}>✓</span>
            </div>
            <div className="profile-bio">
              ঢাকায় বসে স্বপ্নের গল্প লিখি। ভালোবাসি বৃষ্টি, পুরনো বই আর রাতের নিরবতা। ৫টি উপন্যাস, ৩০টিরও বেশি ছোটগল্প।
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-num">৪২হাজার</div>
                <div className="profile-stat-label">পাঠক</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-num">১২,৩৪৫</div>
                <div className="profile-stat-label">ফলোয়ার</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-num">৮টি</div>
                <div className="profile-stat-label">রচনা</div>
              </div>
            </div>

            <div className="profile-actions">
              <button className="follow-btn">✦ ফলো করো</button>
              <button className="tip-btn">💝 Tip করো</button>
            </div>
          </div>

          <div className="ornament-divider">
            <div className="ornament-line" />
            <span className="ornament-symbol">✦</span>
            <div className="ornament-line" />
          </div>

          <div className="works-grid">
            {STORIES.map((s, i) => (
              <div className="work-card" key={s.id} onClick={() => openStory(s)}>
                <div className="work-cover" style={{ background: coverGradient(s.color, i) }}>
                  <div className="work-title">{s.title}</div>
                </div>
                <div style={{ padding: "8px 10px", background: "rgba(255,255,255,0.04)", borderRadius: "0 0 12px 12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="card-meta" style={{ justifyContent: "space-between" }}>
                    <span className="card-genre">{s.genre}</span>
                    <span className="card-rating">⭐ {s.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === EXPLORE === */}
      {screen === "explore" && (
        <div style={{ background: COLORS.navy, minHeight: "100vh", paddingBottom: 80 }}>
          <div className="screen-header">
            <span className="header-logo" style={{ fontSize: 22 }}>খুঁজুন</span>
          </div>
          <div className="search-bar" style={{ margin: "0 20px 20px" }}>
            <span style={{ color: "rgba(201,168,76,0.5)", fontSize: 16 }}>🔍</span>
            <input className="search-input" placeholder="গল্প, লেখক বা বিষয় খুঁজুন..." autoFocus />
          </div>
          <div className="section-header">
            <span className="section-title">বিষয় অনুযায়ী</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, padding: "0 20px" }}>
            {[
              { name: "উপন্যাস", emoji: "📖", color: "#1A3A4A" },
              { name: "কবিতা", emoji: "🌸", color: "#3A1A4A" },
              { name: "ভৌতিক", emoji: "👻", color: "#1A2D1A" },
              { name: "রোমান্স", emoji: "💕", color: "#4A1A1A" },
              { name: "ইতিহাস", emoji: "📜", color: "#3A2A0A" },
              { name: "ডায়েরি", emoji: "✍️", color: "#0A1A3A" },
            ].map((g, i) => (
              <div key={i} onClick={() => setActiveGenre(g.name)} style={{
                background: `${g.color}CC`,
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 14,
                padding: "20px 16px",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{g.emoji}</div>
                <div style={{ fontFamily: "'Hind Siliguri', sans-serif", fontSize: 16, fontWeight: 600, color: COLORS.offWhite }}>{g.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === LIBRARY === */}
      {screen === "library" && (
        <div style={{ background: COLORS.navy, minHeight: "100vh", paddingBottom: 80 }}>
          <div className="screen-header">
            <span className="header-logo" style={{ fontSize: 22 }}>লাইব্রেরি</span>
          </div>
          <div style={{ padding: "0 20px" }}>
            <div style={{ fontFamily: "'Noto Serif Bengali', serif", fontSize: 14, color: "rgba(237,232,220,0.5)", marginBottom: 16 }}>তোমার সংরক্ষিত গল্পগুলো</div>
            {STORIES.slice(0, 2).map((s, i) => (
              <div className="story-list-item" key={s.id} onClick={() => openStory(s)} style={{ marginBottom: 12 }}>
                <div className="list-cover" style={{ background: coverGradient(s.color, i) }} />
                <div className="list-info">
                  <div className="list-title">{s.title}</div>
                  <div className="list-author">{s.author}</div>
                  <div style={{ marginTop: 6 }}>
                    <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 3, height: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: COLORS.gold, width: `${[67, 23][i]}%`, borderRadius: 3 }} />
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(237,232,220,0.3)", marginTop: 4 }}>{[67, 23][i]}% পড়া হয়েছে</div>
                  </div>
                </div>
              </div>
            ))}
            {STORIES.slice(2).map((s, i) => (
              <div className="story-list-item" key={s.id} onClick={() => openStory(s)} style={{ marginBottom: 12, opacity: 0.6 }}>
                <div className="list-cover" style={{ background: coverGradient(s.color, i + 2) }}>
                  {s.premium && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔒</div>}
                </div>
                <div className="list-info">
                  <div className="list-title">{s.title}</div>
                  <div className="list-author">{s.author}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: COLORS.gold }}>আনলক করুন</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* === BOTTOM NAV === */}
      {screen !== "splash" && screen !== "reading" && screen !== "editor" && screen !== "payment" && (
        <div className="bottom-nav">
          {[
            { id: "home", icon: "🏠", label: "হোম", scr: "home" },
            { id: "explore", icon: "🔍", label: "খুঁজুন", scr: "explore" },
            { id: "library", icon: "📚", label: "লাইব্রেরি", scr: "library" },
            { id: "dash", icon: "✍️", label: "ড্যাশবোর্ড", scr: "dashboard" },
          ].map(n => (
            <button key={n.id} className={`nav-item ${activeNav === n.id ? "active" : ""}`} onClick={() => navigate(n.scr, n.id)}>
              <span className="nav-icon" style={{ fontSize: activeNav === n.id ? 24 : 20, transition: "font-size 0.2s" }}>{n.icon}</span>
              <span className="nav-label" style={{ color: activeNav === n.id ? COLORS.gold : "rgba(237,232,220,0.35)" }}>{n.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
