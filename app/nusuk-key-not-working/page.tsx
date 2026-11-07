import { Metadata } from "next";
import { NotWorkingGuideView } from "@/components/NotWorkingGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "Nusuk Key or Invite Code Not Working? Fixes for Common Errors",
  description:
    "Troubleshoot Nusuk competition code errors: 'code already used', 'entered code not correct', missing OTP, app sign-in issues, and daily limits.",
  alternates: {
    canonical: `${siteUrl}/nusuk-key-not-working`,
    languages: {
      en: `${siteUrl}/nusuk-key-not-working`,
      ar: `${siteUrl}/ar/nusuk-key-not-working`,
    },
  },
};

export default function NotWorkingPage() {
  return <NotWorkingGuideView locale="en" />;
}
