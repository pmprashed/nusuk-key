import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";
  const now = new Date();

  const routes = [
    "",
    "/codes",
    "/nusuk-competition",
    "/guide",
    "/nusuk-key-not-working",
    "/find-nusuk-invite-code",
    "/privacy",
    "/contact",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    // English
    sitemapEntries.push({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/codes" ? "hourly" : "daily",
      priority: route === "" ? 1.0 : route === "/codes" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}${route}`,
          ar: `${siteUrl}/ar${route}`,
        },
      },
    });

    // Arabic
    sitemapEntries.push({
      url: `${siteUrl}/ar${route}`,
      lastModified: now,
      changeFrequency: route === "" || route === "/codes" ? "hourly" : "daily",
      priority: route === "" ? 1.0 : route === "/codes" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${siteUrl}${route}`,
          ar: `${siteUrl}/ar${route}`,
        },
      },
    });
  }

  return sitemapEntries;
}
