import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoxHR Landing Page",
  description:
    "GoxHR gives HR teams one place for employee records, attendance, leave and payroll, while employees handle their own requests on web and mobile.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try { const t = localStorage.getItem('goxhr-theme'); if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t; } catch (_) {}",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('fx');",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
