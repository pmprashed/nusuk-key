import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { BlogPostContent } from "@/components/BlogPostContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

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
    title: `${post.titleEn} | NusukKey Guides`,
    description: post.excerptEn,
    keywords: post.keywords,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
      languages: {
        en: `${siteUrl}/blog/${post.slug}`,
        ar: `${siteUrl}/ar/blog/${post.slug}`,
      },
    },
    openGraph: {
      title: post.titleEn,
      description: post.excerptEn,
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
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
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "NusukKey",
      url: siteUrl,
    },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  };

  return (
    <LanguageProvider initialLocale="en">
      <div className="min-h-screen flex flex-col bg-[#F7FAF8]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header locale="en" />
        <BlogPostContent post={post} />
        <Footer locale="en" />
      </div>
    </LanguageProvider>
  );
}
