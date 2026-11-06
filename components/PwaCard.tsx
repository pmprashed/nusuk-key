"use client";

import { useEffect, useState } from "react";
import { Smartphone, PlusSquare, Check } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { showToast } from "./Toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaCard({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;

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
      showToast(
        locale === "ar"
          ? "أضف الموقع للشاشة الرئيسية من قائمة متصفحك (مشاركة > إضافة إلى الصفحة الرئيسية)"
          : locale === "bn"
          ? "আপনার ব্রাউজার মেনু থেকে 'Add to Home screen' চাপুন"
          : "Add to home screen from your browser menu (Share > Add to Home Screen)",
        "info"
      );
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-gray-200/90 p-5 sm:p-6 mb-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">
            {t.pwa.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {t.pwa.desc}
          </p>
        </div>
      </div>

      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs shrink-0 self-end sm:self-auto"
      >
        {installed ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Installed</span>
          </>
        ) : (
          <>
            <PlusSquare className="w-3.5 h-3.5" />
            <span>{t.pwa.installBtn}</span>
          </>
        )}
      </button>
    </div>
  );
}
