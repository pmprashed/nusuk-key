"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Search, HelpCircle, ArrowLeft, Key, Sparkles, AlertCircle, ShieldCheck } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Locale } from "@/lib/i18n";
import { COMPREHENSIVE_FAQS, FaqItem } from "@/lib/faq-data";

interface FaqPageViewProps {
  locale?: Locale;
}

const CATEGORY_TABS: { key: string; labelEn: string; labelBn: string; labelAr: string }[] = [
  { key: "all", labelEn: "All Questions", labelBn: "সকল প্রশ্ন", labelAr: "جميع الأسئلة" },
  { key: "basics", labelEn: "Keys & Basics", labelBn: "কি ও মূল নিয়ম", labelAr: "المفاتيح والأساسيات" },
  { key: "codes", labelEn: "Codes & Exchange", labelBn: "কোড ও এক্সচেঞ্জ", labelAr: "الرموز والتبادل" },
  { key: "competition", labelEn: "Umrah Prizes", labelBn: "পুরস্কার ও ড্র", labelAr: "الجوائز والسحب" },
  { key: "troubleshooting", labelEn: "Errors & Fixes", labelBn: "সমস্যা ও সমাধান", labelAr: "الأخطاء والحلول" },
  { key: "rules", labelEn: "App Rules & Resets", labelBn: "রিসেট ও সময়", labelAr: "القواعد والتجديد" },
  { key: "security", labelEn: "Safety & Privacy", labelBn: "নিরাপত্তা ও গোপনীয়তা", labelAr: "الأمان والخصوصية" },
];

export function FaqPageView({ locale = "en" }: FaqPageViewProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true, "faq-6": true });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaqs = useMemo(() => {
    return COMPREHENSIVE_FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q || faq.q.toLowerCase().includes(q) || faq.a.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header locale={locale} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-16">
        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-xs font-semibold text-gray-500">
          <Link href={locale === "ar" ? "/ar" : "/"} className="hover:text-emerald-800 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "الرئيسية" : locale === "bn" ? "হোম" : "Home"}</span>
          </Link>
          <span>/</span>
          <span className="text-emerald-900">FAQ Directory</span>
        </div>

        {/* Hero Section */}
        <div className="rounded-3xl bg-gradient-to-br from-[#062413] via-[#0b381e] to-[#124d27] text-white p-6 sm:p-10 mb-8 shadow-xl border border-emerald-500/30">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-400/40 text-xs font-bold text-emerald-200 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>32+ Verified Guides & Answers</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            {locale === "ar"
              ? "الأسئلة الشائعة حول مفاتيح مسابقة نسك"
              : locale === "bn"
              ? "নুসুক কি ও ওমরাহ প্রতিযোগিতা FAQ ডিরেক্টরি"
              : "Nusuk Key & Umrah Competition FAQ"}
          </h1>

          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed mb-6 font-medium">
            Everything you need to know about Nusuk referral codes, daily key resets, fixing invalid codes, winning the 2026 Umrah draw, and exchanging keys safely.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                locale === "ar"
                  ? "ابحث في جميع الأسئلة والرموز..."
                  : locale === "bn"
                  ? "যেকোনো প্রশ্ন বা এরর লিখে খুঁজুন..."
                  : "Search questions (e.g. invalid code, daily reset, prize draw)..."
              }
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.key;
            const label =
              locale === "ar" ? tab.labelAr : locale === "bn" ? tab.labelBn : tab.labelEn;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedCategory(tab.key)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-emerald-800 text-white border-emerald-900 shadow-xs"
                    : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* FAQ Count Summary */}
        <div className="text-xs font-bold text-gray-500 mb-4 flex items-center justify-between">
          <span>Showing {filteredFaqs.length} questions</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-emerald-700 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* FAQ List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = Boolean(openIds[faq.id]);
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-xs hover:border-emerald-300 transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-emerald-50/30 transition-colors"
                >
                  <span className="font-extrabold text-sm sm:text-base text-gray-900 leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-gray-50/40">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 rounded-3xl bg-white border border-gray-200 p-8">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <div className="font-bold text-gray-800 text-sm">No matching questions found</div>
              <div className="text-xs text-gray-500 mt-1">Try another keyword or clear your search query.</div>
            </div>
          )}
        </div>

        {/* Bottom Helper Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-start gap-3">
            <Key className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-gray-900">Need a fresh Nusuk code right now?</div>
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                Head to our homepage to copy an active referral key with fair rotation and instant 1-click open in the Nusuk app.
              </div>
              <Link href={locale === "ar" ? "/ar" : "/"} className="text-xs font-bold text-emerald-700 hover:underline mt-2 inline-block">
                Get Fresh Key →
              </Link>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-100 shadow-xs flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-sm text-gray-900">Have a Nusuk referral code to share?</div>
              <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                Submit your code to our community queue. Thousands of daily visitors will redeem it, earning both of you bonus keys.
              </div>
              <Link href={locale === "ar" ? "/ar#submit" : "/#submit"} className="text-xs font-bold text-emerald-700 hover:underline mt-2 inline-block">
                Submit Your Key →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
