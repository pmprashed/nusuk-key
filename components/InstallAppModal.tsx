"use client";

import { useEffect, useState } from "react";
import { X, Smartphone, Download, Share2, PlusSquare, Check, Sparkles } from "lucide-react";
import { Locale } from "@/lib/i18n";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface InstallAppModalProps {
  locale: Locale;
  isOpen: boolean;
  onClose: () => void;
  deferredPrompt: BeforeInstallPromptEvent | null;
}

export function InstallAppModal({ locale, isOpen, onClose, deferredPrompt }: InstallAppModalProps) {
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    }
  }, []);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
        setTimeout(() => onClose(), 1500);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white border border-emerald-100 shadow-2xl text-gray-900 animate-in zoom-in-95 duration-200">
        {/* Top Header Background */}
        <div className="relative p-6 bg-gradient-to-br from-[#062413] via-[#09351a] to-[#0f4422] text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg border border-emerald-300/40 text-2xl shrink-0">
              🔑
            </div>
            <div>
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/30 text-[10px] font-bold text-emerald-200 uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>NusukKey Mobile PWA</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                {locale === "ar"
                  ? "تثبيت تطبيق نسك كي على هاتفك"
                  : locale === "bn"
                  ? "নুসুক কি মোবাইল অ্যাপ ইনস্টল করুন"
                  : "Install NusukKey Mobile App"}
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            {locale === "ar"
              ? "استمتع بالوصول الفوري والسريع لمفاتيح مسابقة نسك من شاشتك الرئيسية، بدون متجر تطبيقات وبدون أي مساحة تخزين!"
              : locale === "bn"
              ? "মোবাইলের হোম স্ক্রিন থেকেই ১-ট্যাপে তাজা নুসুক কি কোড পান। কোনো স্টোরেজ খরচ নেই এবং অফলাইনেও কাজ করে!"
              : "Get 1-tap instant access to fresh Nusuk competition keys right from your phone's home screen. Fast, ultra-lightweight and works offline!"}
          </p>

          {/* If deferredPrompt exists (Chrome/Edge/Android), show big 1-click install button */}
          {deferredPrompt && !installed ? (
            <button
              onClick={handleDirectInstall}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {locale === "ar"
                  ? "تثبيت التطبيق الآن بنقرة واحدة"
                  : locale === "bn"
                  ? "এখনই ১-ক্লিকে ইনস্টল করুন"
                  : "Install Now (1-Click)"}
              </span>
            </button>
          ) : installed ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>
                {locale === "ar" ? "تم تثبيت التطبيق بنجاح!" : locale === "bn" ? "অ্যাপটি সফলভাবে ইনস্টল হয়েছে!" : "App successfully installed!"}
              </span>
            </div>
          ) : null}

          {/* Step by Step Guide for iOS / Android */}
          <div className="rounded-2xl bg-gray-50 border border-gray-200/80 p-4 space-y-3">
            <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-700" />
              <span>
                {isIOS
                  ? locale === "bn"
                    ? "আইফোনে ইনস্টল করার নিয়ম (Safari):"
                    : "Instructions for iPhone (Safari):"
                  : locale === "bn"
                  ? "ফোনে ইনস্টল করার সহজ নিয়ম (Chrome):"
                  : "How to add to Phone Home Screen:"}
              </span>
            </div>

            {isIOS ? (
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    {locale === "bn"
                      ? "সাফারি ব্রাউজারের নিচের Share আইকনে ( "
                      : "Tap the Share button in Safari ( "}
                    <Share2 className="w-3.5 h-3.5 inline text-emerald-700" />
                    {locale === "bn" ? " ) ট্যাপ করুন।" : " )."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    {locale === "bn"
                      ? "নিচে স্ক্রোল করে 'Add to Home Screen' ( "
                      : "Scroll down and select 'Add to Home Screen' ( "}
                    <PlusSquare className="w-3.5 h-3.5 inline text-emerald-700" />
                    {locale === "bn" ? " ) সিলেক্ট করুন।" : " )."}
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs text-gray-700 font-medium">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    {locale === "bn"
                      ? "ব্রাউজারের ৩ ডট মেনু ( ⋮ ) বা শেয়ার বাটনে চাপুন।"
                      : "Tap the browser menu ( ⋮ ) in Chrome or Samsung Internet."}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-900 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    {locale === "bn"
                      ? "'Install app' অথবা 'Add to Home screen' অপশনে ক্লিক করুন।"
                      : "Tap 'Install app' or 'Add to Home screen'."}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={onClose}
              className="text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              {locale === "ar" ? "إغلاق" : locale === "bn" ? "বুঝেছি, বন্ধ করুন" : "Got it, close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}