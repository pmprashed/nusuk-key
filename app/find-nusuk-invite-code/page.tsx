import { Metadata } from "next";
import { FindCodeGuideView } from "@/components/FindCodeGuideView";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nusuk-keys.vercel.app";

export const metadata: Metadata = {
  title: "How to Find and Share Your Nusuk Invite Code (3 Steps)",
  description:
    "Follow 3 simple steps to find your unique NG- referral code inside the official Nusuk app and share it with the community for extra keys.",
  alternates: {
    canonical: `${siteUrl}/find-nusuk-invite-code`,
    languages: {
      en: `${siteUrl}/find-nusuk-invite-code`,
      ar: `${siteUrl}/ar/find-nusuk-invite-code`,
    },
  },
};

export default function FindInviteCodePage() {
  return <FindCodeGuideView locale="en" />;
}
