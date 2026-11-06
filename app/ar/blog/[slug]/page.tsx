import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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
  if (!post) return { title: "المقال غير موجود | مفاتيح نسك" };

  return {
    title: `${post.titleAr} | مدونة مفاتيح نسك`,
    description: post.excerptAr,
    keywords: post.keywords,
    alternates: {
      canonical: `https://nusuk-keys.vercel.app/ar/blog/${post.slug}`,
      languages: {
        en: `https://nusuk-keys.vercel.app/blog/${post.slug}`,
        ar: `https://nusuk-keys.vercel.app/ar/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.titleAr,
      description: post.excerptAr,
      type: "article",
      url: `https://nusuk-keys.vercel.app/ar/blog/${post.slug}`,
    },
  };
}

export default function ArabicBlogPostPage({ params }: Props) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titleAr,
    description: post.excerptAr,
    datePublished: "2026-11-01",
    dateModified: "2026-11-06",
    author: {
      "@type": "Organization",
      name: "مجتمع مفاتيح نسك",
      url: "https://nusuk-keys.vercel.app/ar",
    },
    publisher: {
      "@type": "Organization",
      name: "مفاتيح نسك",
      url: "https://nusuk-keys.vercel.app/ar",
    },
    mainEntityOfPage: `https://nusuk-keys.vercel.app/ar/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFDFB]" dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header locale="ar" />
      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 w-full text-right">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/ar" className="hover:text-emerald-700">الرئيسية</Link>
          <span>/</span>
          <Link href="/ar/blog" className="hover:text-emerald-700">المدونة</Link>
          <span>/</span>
          <span className="text-gray-800 truncate max-w-xs">{post.titleAr}</span>
        </nav>

        <article className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200/80 shadow-sm">
          <header className="mb-8 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3 text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-3">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              {post.titleAr}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
              {post.excerptAr}
            </p>
          </header>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            {post.contentAr.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-emerald-950 text-base">هل أنت جاهز للحصول على رمزك الجديد؟</h3>
              <p className="text-xs text-emerald-800 mt-1">احصل على رمز إحالة نشط وفوري بنقرة واحدة.</p>
            </div>
            <Link
              href="/ar"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-emerald-700 text-white font-medium text-sm hover:bg-emerald-800 transition-colors shrink-0"
            >
              احصل على رمز مجاني الآن
            </Link>
          </div>
        </article>
      </main>
      <Footer locale="ar" />
    </div>
  );
}
