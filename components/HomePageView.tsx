"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { NextCodeCard } from "./NextCodeCard";
import { SubmitNusukKeyCard } from "./SubmitNusukKeyCard";
import { OpenInNusukGuideCard } from "./OpenInNusukGuideCard";
import { MoreCodesList } from "./MoreCodesList";
import { NusukAppMockupSection } from "./NusukAppMockupSection";
import { CopiedCodesSidebar } from "./CopiedCodesSidebar";
import { PwaCard } from "./PwaCard";
import { SeoBlock } from "./SeoBlock";
import { ShareModal } from "./ShareModal";
import { ToastContainer } from "./Toast";
import { Footer } from "./Footer";
import { CodeItem } from "@/lib/types";
import { AutoStructuredData } from "./JsonLd";

interface HomePageViewProps {
  locale: Locale;
}

export function HomePageView({ locale: propLocale }: HomePageViewProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCodeCopied = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCodeAdded = (newCode: CodeItem) => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header
        locale={locale}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {/* 1. Hero with 2-Row Stats Counter */}
        <Hero locale={locale} />

        {/* 2. Primary 2-Column Action Area (Matching Screenshot 1 & Screenshot 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          {/* Left Column: Next Code Card + Open In Nusuk Checklist */}
          <div className="lg:col-span-7 space-y-4">
            <NextCodeCard
              locale={locale}
              onCodeCopied={handleCodeCopied}
            />

            <OpenInNusukGuideCard locale={locale} />
          </div>

          {/* Right Column: Submit Nusuk Key Card + Copied Codes Activity */}
          <div className="lg:col-span-5 space-y-4">
            <SubmitNusukKeyCard
              locale={locale}
              onCodeAdded={handleCodeAdded}
            />

            <CopiedCodesSidebar
              locale={locale}
              refreshTrigger={refreshTrigger}
            />
          </div>
        </div>

        {/* 3. More Codes Directory (Matching Screenshot 3 "More codes" section) */}
        <MoreCodesList
          locale={locale}
          onCodeCopiedGlobal={handleCodeCopied}
        />

        {/* 4. Official Nusuk App Workflow with Phone Mockup & 3 Steps (Matching Screenshot 2) */}
        <NusukAppMockupSection locale={locale} />

        {/* 5. Mobile App PWA Card & FAQ SEO Block */}
        <PwaCard locale={locale} />
        <SeoBlock locale={locale} />
      </main>

      <Footer locale={locale} />

      <ShareModal
        locale={locale}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCodeAdded={handleCodeAdded}
      />

      <ToastContainer />
      <AutoStructuredData locale={locale} />
    </div>
  );
}
