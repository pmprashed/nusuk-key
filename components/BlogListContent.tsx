"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-data";
import { useLanguage } from "./LanguageProvider";
import { getLocalizedBlogPost } from "@/lib/blog-i18n";

export function BlogListContent() {
  const { locale, t } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const p = (slug: string) => {
    if (locale === "ar") {
      return `/ar/blog/${slug}`;
    }
    return locale === "en" ? `/blog/${slug}` : `/blog/${slug}?lang=${locale}`;
  };

  const localizedPosts = useMemo(() => {
    return BLOG_POSTS.map((post) => getLocalizedBlogPost(post, locale));
  }, [locale]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    localizedPosts.forEach((p) => set.add(p.category));
    return ["All", ...Array.from(set)];
  }, [localizedPosts]);

  const filteredPosts = useMemo(() => {
    return localizedPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        search.trim() === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [localizedPosts, selectedCategory, search]);

  const pageTitle =
    locale === "ar"
      ? "دليل ورؤى مفاتيح نسك"
      : locale === "bn"
      ? "নুসুক কি গাইড ও আর্টিকেলসমূহ"
      : locale === "ur"
      ? "نسک کی گائیڈز اور مضامین"
      : locale === "id"
      ? "Panduan & Wawasan Kunci Nusuk"
      : locale === "tr"
      ? "Nusuk Anahtar Rehberleri ve İpuçları"
      : locale === "fr"
      ? "Guides et Actualités Nusuk Key"
      : locale === "es"
      ? "Guías e Información de Nusuk Key"
      : locale === "hi"
      ? "नुसुक की गाइड्स और उपयोगी लेख"
      : "Nusuk Key Guides & Insights";

  const pageSubtitle =
    locale === "ar"
      ? "كل ما تحتاجه حول رموز إحالة تطبيق نسك، حلول المشاكل الشائعة، وطرق مضاعفة فرصك في الفوز بمسابقة العمرة."
      : locale === "bn"
      ? "নুসুক রেফারেল কোড, এরর সমাধান এবং ওমরাহ প্রতিযোগিতায় জেতার সম্ভাবনা বাড়ানোর সকল প্রয়োজনীয় গাইড।"
      : locale === "ur"
      ? "نسک ریفرل کوڈز، تکنیکی مسائل کے حل اور عمرہ مقابلے میں جیت کے امکانات بڑھانے کے تمام طریقے حاصل کریں۔"
      : locale === "id"
      ? "Semua yang perlu Anda ketahui tentang kode referral Nusuk, mengatasi error, dan memaksimalkan entri Anda."
      : "Everything you need to know about Nusuk referral codes, fixing key errors, and maximizing your entries for the Umrah competition.";

  const badgeText =
    locale === "ar"
      ? "المقالات والشروحات"
      : locale === "bn"
      ? "আর্টিকেল ও গাইডলাইন"
      : locale === "ur"
      ? "مضامین اور گائیڈز"
      : locale === "id"
      ? "Artikel & Panduan"
      : "Articles & Walkthroughs";

  const searchPlaceholder =
    locale === "ar"
      ? "ابحث في أكثر من 500 مقال ودليل..."
      : locale === "bn"
      ? "৫০০+ গাইড ও আর্টিকেলে খুঁজুন..."
      : locale === "ur"
      ? "500 سے زائد مضامین میں تلاش کریں..."
      : locale === "id"
      ? "Cari dari 500+ artikel panduan..."
      : "Search 500+ guides and articles...";

  return (
    <div className="w-full">
      {/* Title & Introduction */}
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
          {badgeText}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 mb-3">
          {pageTitle}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
          {pageSubtitle}
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm transition-all outline-none bg-white shadow-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.slice(0, 5).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-emerald-800 text-white shadow-xs"
                  : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
              }`}
            >
              {cat === "All" ? (locale === "ar" ? "الكل" : locale === "bn" ? "সব" : "All") : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col justify-between bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs text-gray-500 mb-3 font-medium">
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug hover:text-emerald-700 transition-colors">
                <Link href={p(post.slug)}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 font-medium">NusukKey Community</span>
              <Link
                href={p(post.slug)}
                className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 group"
              >
                <span>{post.readGuideText}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
