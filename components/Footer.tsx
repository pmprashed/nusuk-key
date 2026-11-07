"use client";

import Link from "next/link";
import { KeyIcon } from "./Header";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";
import { ShieldCheck, HelpCircle, Heart, ArrowUpRight } from "lucide-react";

export function Footer({ locale: propLocale }: { locale?: Locale }) {
  const { locale: contextLocale, t } = useLanguage();
  const locale = propLocale || contextLocale;
  const p = (path: string) => {
    if (locale === "ar") {
      return `/ar${path === "/" ? "" : path}`;
    }
    return locale === "en" ? path : `${path === "/" ? "" : path}?lang=${locale}`;
  };

  return (
    <footer className="mt-20 border-t border-emerald-900/10 bg-gradient-to-b from-[#F7FAF8] via-[#eef6f1] to-[#e4f0e8] text-gray-700 pt-14 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-emerald-900/10">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link
              href={p("/")}
              className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight text-gray-900"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-xs">
                <KeyIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-gray-900 tracking-tight text-xl">
                {t.common.brand}
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm font-medium">
              {locale === "ar"
                ? "المنصة المجتمعية المفتوحة لتبادل رموز إحالة نسك ومساعدة الحجاج والمعتمرين على كسب مفاتيح إضافية لمسابقة العمرة المجانية 2026."
                : locale === "bn"
                ? "নুসুক রেফারেল কোড শেয়ার এবং সংগ্রহ করার উন্মুক্ত প্ল্যাটফর্ম। ওমরাহ প্রতিযোগিতার অতিরিক্ত কি জিততে হাজী ভাইদের সহায়তা করাই আমাদের লক্ষ্য।"
                : "The open community exchange helping pilgrims worldwide share Nusuk referral keys and maximize their chances in the Free Umrah Challenge."}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-300 text-[11px] font-bold text-emerald-900">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Free · Community-Powered</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
              {locale === "ar" ? "الروابط السريعة" : locale === "bn" ? "জরুরি লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href={p("/")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.freeCodes}
                </Link>
              </li>
              <li>
                <Link href={p("/codes")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {locale === "ar" ? "دليل الرموز" : locale === "bn" ? "কোড ডিরেক্টরি" : "All Codes Directory"}
                </Link>
              </li>
              <li>
                <Link href={p("/guide")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.howToGetKeys}
                </Link>
              </li>
              <li>
                <Link href={p("/nusuk-competition")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.competition2026}
                </Link>
              </li>
              <li>
                <Link href={p("/blog")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {(t.nav as any).blog || "Blog Articles"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Solutions */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
              {locale === "ar" ? "المساعدة والحلول" : locale === "bn" ? "সহায়তা ও সমাধান" : "Help & Guides"}
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link
                  href={p("/faq")}
                  className="inline-flex items-center gap-1 font-bold text-emerald-900 hover:text-emerald-700 hover:underline transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{locale === "ar" ? "صفحة الأسئلة الشائعة (30+)" : locale === "bn" ? "প্রশ্নোত্তর ও FAQ (৩০+)" : "FAQ Knowledge Base (30+)"}</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                </Link>
              </li>
              <li>
                <Link href={p("/nusuk-key-not-working")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.keyNotWorking}
                </Link>
              </li>
              <li>
                <Link href={p("/find-nusuk-invite-code")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.findCode}
                </Link>
              </li>
              <li>
                <Link href={p("/privacy")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href={p("/contact")} className="hover:text-emerald-800 hover:underline transition-colors">
                  {t.footer.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official App Deep Link Notice */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-950">
              {locale === "ar" ? "تطبيق نسك" : locale === "bn" ? "নুসুক অ্যাপ" : "Official Nusuk"}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {locale === "ar"
                ? "تأكد من تنزيل تطبيق نسك الرسمي من متجر Google Play أو Apple App Store للمشاركة في السحب."
                : locale === "bn"
                ? "অফিসিয়াল নুসুক অ্যাপ ডাউনলোড করে ওমরাহ চ্যালেঞ্জে অংশগ্রহণ করুন।"
                : "Install the official Nusuk app on Google Play or App Store to join the competition."}
            </p>
            <div className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>Pray for Umrah pilgrims</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-4 text-center text-xs leading-relaxed text-gray-500 max-w-4xl mx-auto space-y-2">
          <p className="text-gray-600">
            {t.common.disclaimer}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-gray-400 text-[11px] pt-2">
            <span>{t.common.allRightsReserved}</span>
            <span>•</span>
            <span>{t.footer.credits}</span>
            <span>•</span>
            <span>Built for the global Umrah community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
