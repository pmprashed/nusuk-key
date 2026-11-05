"use client";

import { useState } from "react";
import { Locale } from "@/lib/i18n";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { UserCodeBanner } from "./UserCodeBanner";
import { NextCodeCard } from "./NextCodeCard";
import { HowToUseBox } from "./HowToUseBox";
import { MoreCodesList } from "./MoreCodesList";
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

export function HomePageView({ locale }: HomePageViewProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [latestSubmittedCode, setLatestSubmittedCode] = useState<string | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCodeCopied = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCodeAdded = (newCode: CodeItem) => {
    setLatestSubmittedCode(newCode.code);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header
        locale={locale}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <Hero locale={locale} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-2">
            <UserCodeBanner
              locale={locale}
              onAddAnother={() => setIsShareModalOpen(true)}
              latestSubmittedCode={latestSubmittedCode}
            />

            <NextCodeCard
              locale={locale}
              onCodeCopied={handleCodeCopied}
            />

            <HowToUseBox locale={locale} />

            <MoreCodesList
              locale={locale}
              onCodeCopiedGlobal={handleCodeCopied}
            />

            <PwaCard locale={locale} />

            <SeoBlock locale={locale} />
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
            <CopiedCodesSidebar
              locale={locale}
              refreshTrigger={refreshTrigger}
            />
          </aside>
        </div>
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
