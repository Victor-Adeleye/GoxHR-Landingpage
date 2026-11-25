import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { TermsContent } from "@/components/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms of service · GoxHR",
  description:
    "The terms that govern use of the GoxHR website and the GoxHR HR service.",
};

export default function TermsPage() {
  return (
    <LegalShell current="terms">
      <TermsContent />
    </LegalShell>
  );
}
