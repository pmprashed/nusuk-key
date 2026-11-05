import { Metadata } from "next";
import { ContactView } from "@/components/ContactView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusukkey.com";

export const metadata: Metadata = {
  title: "Contact Us - NusukKey Community Support",
  description:
    "Contact NusukKey for website suggestions, bug reports, or find the official Nusuk helpline for app-specific support.",
  alternates: {
    canonical: `${siteUrl}/contact`,
    languages: {
      en: `${siteUrl}/contact`,
      ar: `${siteUrl}/ar/contact`,
    },
  },
};

export default function ContactPage() {
  return <ContactView locale="en" />;
}
