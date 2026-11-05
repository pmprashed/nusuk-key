"use client";

import { useEffect, useState } from "react";
import { Smartphone, PlusSquare, Check } from "lucide-react";
import { Locale, getDictionary } from "@/lib/i18n";
import { showToast } from "./Toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaCard({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

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

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instructions for iOS or desktop
      showToast(
        locale === "ar"
          ? "أضف الموقع للشاشة الرئيسية من قائمة متصفحك (مشاركة > إضافة إلى الصفحة الرئيسية)"
          : "Add to home screen from your browser menu (Share > Add to Home Screen)",
        "info"
      );
    }
  };

  if (installed) return null;

  return (
    <div className="mb-10 rounded-2xl bg-white border border-gray-200/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">
            {t.pwa.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {t.pwa.subtitle}
          </p>
        </div>
      </div>

      <button
        onClick={handleInstallClick}
        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors shrink-0 shadow-2xs"
      >
        <PlusSquare className="w-4 h-4 text-emerald-700" />
        <span>{t.pwa.installBtn}</span>
      </button>
    </div>
  );
}
