import { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/lib/blog-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";
  const now = new Date();

  const coreRoutes = [
    "",
    "/codes",
    "/guide",
    "/faq",
    "/nusuk-competition",
    "/nusuk-key-not-working",
    "/find-nusuk-invite-code",
    "/blog",
    "/privacy",
    "/contact",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Core pages (English & Arabic)
  for (const route of coreRoutes) {
    sitemapEntries.push({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/codes" ? "hourly" : "daily",
      priority: route === "" ? 1.0 : route === "/codes" ? 0.95 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}${route}`,
          ar: `${siteUrl}/ar${route}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${siteUrl}/ar${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/codes" ? "hourly" : "daily",
      priority: route === "" ? 1.0 : route === "/codes" ? 0.95 : 0.8,
      alternates: {
        languages: {
          en: `${siteUrl}${route}`,
          ar: `${siteUrl}/ar${route}`,
        },
      },
    });
  }

  // 500 Blog articles (English & Arabic)
  for (const post of BLOG_POSTS) {
    sitemapEntries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/blog/${post.slug}`,
          ar: `${siteUrl}/ar/blog/${post.slug}`,
        },
      },
    });

    sitemapEntries.push({
      url: `${siteUrl}/ar/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: {
        languages: {
          en: `${siteUrl}/blog/${post.slug}`,
          ar: `${siteUrl}/ar/blog/${post.slug}`,
        },
      },
    });
  }

  return sitemapEntries;
}
