import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BlogPostContent } from "@/components/BlogPostContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

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
      canonical: `${siteUrl}/ar/blog/${post.slug}`,
      languages: {
        en: `${siteUrl}/blog/${post.slug}`,
        ar: `${siteUrl}/ar/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.titleAr,
      description: post.excerptAr,
      type: "article",
      url: `${siteUrl}/ar/blog/${post.slug}`,
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
      name: "NusukKey Community",
      url: `${siteUrl}/ar`,
    },
    publisher: {
      "@type": "Organization",
      name: "مفاتيح نسك",
      url: `${siteUrl}/ar`,
    },
    mainEntityOfPage: `${siteUrl}/ar/blog/${post.slug}`,
  };

  return (
    <LanguageProvider initialLocale="ar">
      <div className="min-h-screen flex flex-col bg-[#F7FAF8]" dir="rtl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header locale="ar" />
        <BlogPostContent post={post} />
        <Footer locale="ar" />
      </div>
    </LanguageProvider>
  );
}
