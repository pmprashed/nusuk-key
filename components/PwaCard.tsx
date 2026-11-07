"use client";

import { useEffect, useState } from "react";
import { Smartphone, Download, Check, Sparkles, Star } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaCard({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
      setDeferredPrompt(null);
    });

    const openModalHandler = () => {
      setIsModalOpen(true);
    };
    window.addEventListener("nusuk:open_install_modal", openModalHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("nusuk:open_install_modal", openModalHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    window.dispatchEvent(new CustomEvent("nusuk:open_install_modal"));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#062413] via-[#09351a] to-[#0f4422] border-2 border-emerald-500/50 text-white p-5 sm:p-7 mb-8 shadow-2xl transition-all duration-300 group">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            <circle cx="50" cy="50" r="46" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points="50,4 96,50 50,96 4,50" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          {/* Left Side: App Icon + Titles */}
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-300 to-amber-300 p-0.5 shadow-xl shrink-0 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-[14px] bg-[#062413] flex flex-col items-center justify-center text-2xl sm:text-3xl">
                🔑
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#062413] animate-ping" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#062413]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-[10px] sm:text-xs font-bold text-emerald-200 shadow-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>{locale === "ar" ? "تطبيق الهاتف المجاني" : locale === "bn" ? "ফ্রি মোবাইল অ্যাপ" : "Official PWA App"}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-500/30">
                  <Star className="w-2.5 h-2.5 fill-amber-300" />
                  <span>4.9 · 100% Free</span>
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-black text-white tracking-tight">
                {locale === "ar"
                  ? "احتفظ بنسك كي على شاشة هاتفك الرئيسية"
                  : locale === "bn"
                  ? "নুসুক কি অ্যাপ রাখুন আপনার মোবাইলের হোম স্ক্রিনে"
                  : "Keep NusukKey on your phone"}
              </h3>

              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl font-medium leading-relaxed">
                {locale === "ar"
                  ? "وصول فوري بنقرة واحدة لرموز نسك النشطة مباشرة من هاتفك، خفيف جداً ويعمل بدون إنترنت."
                  : locale === "bn"
                  ? "মোবাইল থেকে ১-ট্যাপে সরাসরি তাজা কি কোড কপি করুন। কোনো স্টোরেজ নষ্ট হয় না এবং অফলাইনেও চলে।"
                  : "Instant 1-tap access to fresh Nusuk competition keys right from your home screen. Fast, ultra-lightweight & offline ready."}
              </p>
            </div>
          </div>

          {/* Right Side: Action Button */}
          <button
            onClick={handleInstallClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-300 hover:from-white hover:to-emerald-100 active:scale-95 text-[#062413] font-black text-xs sm:text-sm shadow-xl hover:shadow-emerald-400/20 transition-all cursor-pointer shrink-0 border border-emerald-200"
          >
            {installed ? (
              <>
                <Check className="w-4 h-4 text-[#062413]" />
                <span>Installed</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-[#062413]" />
                <span>
                  {locale === "ar"
                    ? "تثبيت على الهاتف"
                    : locale === "bn"
                    ? "মোবাইলে ইনস্টল করুন"
                    : "Install Mobile App"}
                </span>
                <Download className="w-3.5 h-3.5 opacity-70" />
              </>
            )}
          </button>
        </div>
    </div>
  );
}