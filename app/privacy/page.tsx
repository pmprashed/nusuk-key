import { Metadata } from "next";
import { PrivacyView } from "@/components/PrivacyView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Privacy Policy - NusukKey Independent Community",
  description:
    "NusukKey privacy policy: we never request or store Nusuk passwords, OTPs, or personal data. Only salted hashed identifiers are used for rate limiting.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
    languages: {
      en: `${siteUrl}/privacy`,
      ar: `${siteUrl}/ar/privacy`,
    },
  },
};

export default function PrivacyPage() {
  return <PrivacyView locale="en" />;
}
