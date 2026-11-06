import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BlogListContent } from "@/components/BlogListContent";

export const metadata: Metadata = {
  title: "Nusuk Key Blog & Guides | Free Nusuk Referral Codes 2026",
  description: "Learn how to get free Nusuk competition keys, fix invalid referral code errors, and find your own Nusuk invite code to earn Umrah competition points.",
  keywords: ["nusuk blog", "nusuk referral code guide", "how to get free nusuk keys", "nusuk umrah competition 2026"],
  alternates: {
    canonical: "https://nusuk-keys.vercel.app/blog",
    languages: {
      en: "https://nusuk-keys.vercel.app/blog",
      ar: "https://nusuk-keys.vercel.app/ar/blog",
    },
  },
};

export default function BlogIndexPage() {
  return (
    <LanguageProvider initialLocale="en">
      <div className="min-h-screen flex flex-col bg-[#F7FAF8]">
        <Header locale="en" />
        <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-12 w-full">
          <BlogListContent />
        </main>
        <Footer locale="en" />
      </div>
    </LanguageProvider>
  );
}
