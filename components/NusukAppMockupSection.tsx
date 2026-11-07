"use client";

import { Key, Share2, Sparkles, ChevronLeft, Gift, Trophy, HelpCircle, Gamepad2 } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { useLanguage } from "./LanguageProvider";

interface NusukAppMockupSectionProps {
  locale?: Locale;
}

export function NusukAppMockupSection({ locale: propLocale }: NusukAppMockupSectionProps) {
  const { locale: contextLocale } = useLanguage();
  const locale = propLocale || contextLocale;

  return (
    <section className="my-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-xs font-bold text-emerald-900 mb-3 shadow-2xs">
          <span>📱</span>
          <span>
            {locale === "ar"
              ? "آلية العمل في تطبيق نسك"
              : locale === "bn"
              ? "নুসুক অ্যাপে যেভাবে কাজ করে"
              : "How the Code Works inside the Nusuk App"}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">
          {locale === "ar"
            ? "كيفية استبدال المفاتيح في تطبيق نسك"
            : locale === "bn"
            ? "নুসুক অ্যাপের ভেতরে যেভাবে কি পয়েন্ট যোগ করবেন"
            : "How the Code Works inside the Nusuk App"}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
          {locale === "ar"
            ? "دليل سريع لمدة 30 ثانية لإدخال رمز الإحالة وربح مفاتيح السحب اليومي"
            : locale === "bn"
            ? "রেফারেল কোড ব্যবহার করে প্রতিদিন অতিরিক্ত ড্র কি পাওয়ার সহজ নিয়ম"
            : "Quick 30-second guide to adding your referral code & earning daily draw keys"}
        </p>
      </div>

      {/* Grid: Phone Mockup on Left + 3 Step Cards on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Left Column: Phone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[290px] sm:w-[320px] rounded-[44px] p-3.5 bg-[#0f172a] shadow-2xl border-[5px] border-[#1e293b] relative ring-1 ring-black/40">
            {/* Dynamic Island Speaker Pill */}
            <div className="w-24 h-4 bg-black rounded-full mx-auto mb-2.5 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
            </div>

            {/* Inner Phone Screen */}
            <div className="bg-[#FAF9F6] rounded-[34px] p-4 text-gray-900 overflow-hidden shadow-inner select-none font-sans">
              {/* Screen Top Bar */}
              <div className="flex items-center justify-between mb-3 text-gray-800">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs cursor-default">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-black text-amber-900">
                  <span>🔑</span>
                  <span>168</span>
                </div>
              </div>

              {/* Title & Key Badge */}
              <div className="mb-3">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Challeng keys</div>
                <div className="text-xl font-black text-gray-900">Your keys</div>
              </div>

              {/* Big Golden Key Badge Box */}
              <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 p-2.5 text-center mb-3 shadow-2xs">
                <div className="inline-flex items-center gap-1.5 text-2xl font-black text-amber-950 font-mono">
                  <span>🔑</span>
                  <span>168</span>
                </div>
              </div>

              {/* Card 1: Key every day */}
              <div className="rounded-xl bg-white border border-gray-100 p-2.5 flex items-start gap-2.5 shadow-2xs mb-2">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Key className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">A key for every day</div>
                  <div className="text-[10px] text-gray-500 leading-tight">You get one key at the start of each day.</div>
                </div>
              </div>

              {/* Card 2: Share the app */}
              <div className="rounded-xl bg-white border border-gray-100 p-2.5 flex items-start gap-2.5 shadow-2xs mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Share the app and collect keys</div>
                  <div className="text-[10px] text-gray-500 leading-tight">
                    Share your link with friends, and everyone who downloads earns you another key.
                  </div>
                </div>
              </div>

              {/* Input Box & Check the code button */}
              <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-xs mb-4">
                <div className="text-[10px] font-bold text-gray-600 mb-1">Add code to get new key</div>
                <div className="px-2.5 py-1.5 bg-gray-50 rounded-lg text-xs font-mono font-black text-gray-900 border border-gray-200 mb-2">
                  NG-kJd1E6n0
                </div>
                <div className="w-full py-2 bg-black text-white text-xs font-black text-center rounded-xl shadow-xs">
                  Check the code
                </div>
              </div>

              {/* Bottom App Navigation Bar */}
              <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between text-[9px] font-bold text-gray-400 px-1">
                <div className="flex flex-col items-center gap-0.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Play</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>Winners</span>
                </div>
                <div className="flex flex-col items-center gap-0.5 text-amber-600">
                  <Key className="w-3.5 h-3.5" />
                  <span>Keys</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3 Step Cards */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step 1 */}
          <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
              1
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 mb-1">
                {locale === "ar"
                  ? "انسخ الكود أو اضغط «فتح في نسك»"
                  : locale === "bn"
                  ? "কোডটি কপি করুন অথবা 'Open in Nusuk' এ চাপুন"
                  : "Copy a code or tap 'Open in Nusuk'"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {locale === "ar"
                  ? "اختر كوداً نشطاً من الموقع. الضغط على «فتح في نسك» سيفتح تطبيق نسك مباشرة والرمز معبأ تلقائياً."
                  : locale === "bn"
                  ? "আমাদের সাইট থেকে একটি অ্যাক্টিভ কোড বেছে নিন। 'Open in Nusuk' চাপলে সরাসরি কোডসহ অ্যাপ ওপেন হবে।"
                  : "Pick an active code from NusukKey. Tapping 'Open in Nusuk' will deep-link directly into the Nusuk app with the code pre-filled."}
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
              2
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 mb-1">
                {locale === "ar"
                  ? "ألصق الكود في خانة «Add code»"
                  : locale === "bn"
                  ? "'Add code' বক্সে কোডটি পেস্ট করুন"
                  : "Paste into the 'Add code' field"}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {locale === "ar"
                  ? "في شاشة المسابقة داخل تطبيق نسك، ألصق رمز NG- في خانة «Add code to get new key» ثم اضغط «Check the code»."
                  : locale === "bn"
                  ? "নুসুক অ্যাপের কম্পিটিশন স্ক্রিনে 'Add code to get new key' বক্সে NG- কোডটি পেস্ট করে 'Check the code' এ চাপুন।"
                  : "In the Nusuk app competition screen, paste the NG- code into the 'Add code to get new key' box and tap 'Check the code'."}
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="rounded-3xl bg-white border border-emerald-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
            <div className="w-9 h-9 rounded-2xl bg-[#062413] text-emerald-400 font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
              3
            </div>
            <div>
              <h3 className="text-base font-black text-gray-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>
                  {locale === "ar"
                    ? "يحصل كلاكما على +1 مفتاح فوراً!"
                    : locale === "bn"
                    ? "আপনারা দুজনেই সাথে সাথে +১ কি পাবেন!"
                    : "Both of you receive +1 Key immediately!"}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                {locale === "ar"
                  ? "يكافئ نظام نسك الرسمي كلاً من المشارك الذي أدخل الرمز وصاحب الرمز بمفتاح سحب إضافي لكل منهما."
                  : locale === "bn"
                  ? "অফিশিয়াল নুসুক সিস্টেম যিনি কোড এন্টার করলেন এবং যার কোড ব্যবহার করা হলো উভয়কেই ১টি করে ড্র কি দিয়ে পুরস্কৃত করে।"
                  : "The official Nusuk system rewards both the participant who entered the code and the code owner with 1 draw key each."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
