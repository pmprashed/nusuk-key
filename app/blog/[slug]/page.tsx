import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { LanguageProvider } from "@/components/LanguageProvider";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found | NusukKey" };

  return {
    title: `${post.titleEn} | NusukKey Blog`,
    description: post.excerptEn,
    keywords: post.keywords,
    alternates: {
      canonical: `https://nusuk-keys.vercel.app/blog/${post.slug}`,
      languages: {
        en: `https://nusuk-keys.vercel.app/blog/${post.slug}`,
        ar: `https://nusuk-keys.vercel.app/ar/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      type: "article",
      url: `https://nusuk-keys.vercel.app/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleEn,
    description: post.excerptEn,
    datePublished: "2026-11-01",
    dateModified: "2026-11-06",
    author: {
      "@type": "Organization",
      name: "NusukKey Community",
      url: "https://nusuk-keys.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "NusukKey",
      url: "https://nusuk-keys.vercel.app",
    },
    mainEntityOfPage: `https://nusuk-keys.vercel.app/blog/${post.slug}`,
  };

  return (
    <LanguageProvider initialLocale="en">
      <div className="min-h-screen flex flex-col bg-[#FBFDFB]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header locale="en" />
        <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-700">Blog</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{post.titleEn}</span>
        </nav>

        <article className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-sm">
          <header className="mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {post.titleEn}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {post.excerptEn}
            </p>
          </header>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            {post.contentEn.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-emerald-950 text-base">Ready to get your fresh Nusuk code?</h3>
              <p className="text-xs text-emerald-800 mt-1">Get an unused referral code right now with instant rotation.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-800 transition-colors shrink-0"
            >
              Get Free Code Now
            </Link>
          </div>
        </article>
      </main>
      <Footer locale="en" />
      </div>
    </LanguageProvider>
  );
}
