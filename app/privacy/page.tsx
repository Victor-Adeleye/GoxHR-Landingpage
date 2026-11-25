import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy policy · GoxHR",
  description:
    "How GoxHR collects, uses, shares, and protects personal information on this website and in the HR service.",
};

export default function PrivacyPage() {
  return (
    <LegalShell current="privacy">
      <PrivacyContent />
    </LegalShell>
  );
}
