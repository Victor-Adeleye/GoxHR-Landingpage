"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";
import { IconSprite } from "@/components/IconSprite";

type LegalShellProps = {
  children: ReactNode;
  current: "privacy" | "terms";
};

export function LegalShell({ children, current }: LegalShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stub, setStub] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    const nav = document.getElementById("nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const root = document.documentElement;
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : darkMq.matches);
    const syncTheme = () => {
      const dark = isDark();
      document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((button) => {
        button.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
        const label = button.querySelector("span");
        if (label) label.textContent = dark ? "Light mode" : "Dark mode";
      });
    };
    const onToggle = () => {
      const next = isDark() ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("goxhr-theme", next);
      } catch {
        /* the theme still applies for this visit */
      }
      syncTheme();
    };
    const toggles = [...document.querySelectorAll<HTMLElement>("[data-theme-toggle]")];
    toggles.forEach((button) => button.addEventListener("click", onToggle));
    if (darkMq.addEventListener) darkMq.addEventListener("change", syncTheme);
    syncTheme();

    return () => {
      window.removeEventListener("scroll", onScroll);
      toggles.forEach((button) => button.removeEventListener("click", onToggle));
      if (darkMq.removeEventListener) darkMq.removeEventListener("change", syncTheme);
    };
  }, []);

  useEffect(() => {
    if (!stub) return;
    const timer = window.setTimeout(() => setStub(null), 4000);
    return () => window.clearTimeout(timer);
  }, [stub]);

  function closeMenu() {
    setMenuOpen(false);
  }

  function onStub(event: MouseEvent<HTMLAnchorElement>, text: string) {
    event.preventDefault();
    setStub({ id: Date.now(), text });
  }

  return (
    <>
      <IconSprite />
      <header className="nav" id="nav">
        <div className="wrap">
          <Link className="logo" href="/" aria-label="GoxHR home">
            <svg className="brand" viewBox="0 0 930.76 210.59" aria-hidden="true">
              <use href="#goxhr-logo" />
            </svg>
          </Link>
          <nav className="nav-links" aria-label="Main">
            <Link href="/#product">Product</Link>
            <Link href="/#hr">For HR teams</Link>
            <Link href="/#employees">For employees</Link>
            <Link href="/#sales">Pricing</Link>
            <Link href="/#faq">FAQ</Link>
          </nav>
          <div className="nav-end">
            <button className="theme-btn" type="button" data-theme-toggle="" aria-label="Switch to dark theme">
              <svg className="icon i-moon"><use href="#i-moon" /></svg>
              <svg className="icon i-sun"><use href="#i-sun" /></svg>
            </button>
            <a className="login" href="https://portal.goxsuite.com/login" target="_blank" rel="noopener noreferrer">Log in</a>
            <a className="btn btn-primary btn-sm" href="https://calendly.com/goxsuite-info/30min" target="_blank" rel="noopener noreferrer">Book a demo</a>
            <button
              className="menu-btn"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="icon"><use href="#i-more" /></svg>
            </button>
          </div>
        </div>
        <div className={menuOpen ? "mobile-menu open" : "mobile-menu"} id="mobileMenu">
          <Link href="/#product" onClick={closeMenu}>Product</Link>
          <Link href="/#hr" onClick={closeMenu}>For HR teams</Link>
          <Link href="/#employees" onClick={closeMenu}>For employees</Link>
          <Link href="/#sales" onClick={closeMenu}>Pricing</Link>
          <Link href="/#faq" onClick={closeMenu}>FAQ</Link>
          <a href="https://portal.goxsuite.com/login" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>Log in</a>
          <button className="mobile-theme" type="button" data-theme-toggle="" aria-label="Switch to dark theme">
            <svg className="icon i-moon"><use href="#i-moon" /></svg>
            <svg className="icon i-sun"><use href="#i-sun" /></svg>
            <span>Dark mode</span>
          </button>
        </div>
      </header>

      <main>{children}</main>

      <footer className="in">
        <div className="wrap">
          <div className="foot">
            <div>
              <Link className="logo" href="/" aria-label="GoxHR home" style={{ padding: 0 }}>
                <svg className="brand" viewBox="0 0 930.76 210.59" aria-hidden="true">
                  <use href="#goxhr-logo" />
                </svg>
              </Link>
              <p style={{ marginTop: 12, maxWidth: 300 }}>
                HR software for companies that want their people, attendance, leave and payroll in one place.
              </p>
            </div>
            <div>
              <h4>Product</h4>
              <Link href="/#hr">Dashboard</Link>
              <Link href="/#hr">Attendance</Link>
              <Link href="/#hr">Leave</Link>
              <Link href="/#hr">Payroll</Link>
              <Link href="/#employees">Employee app</Link>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#" onClick={(event) => onStub(event, "About page to come.")}>About</a>
              <a href="#" onClick={(event) => onStub(event, "Careers page to come.")}>Careers</a>
              <Link href="/#demo">Contact sales</Link>
            </div>
            <div>
              <h4>Legal</h4>
              <Link href="/privacy" aria-current={current === "privacy" ? "page" : undefined}>Privacy policy</Link>
              <Link href="/terms" aria-current={current === "terms" ? "page" : undefined}>Terms of service</Link>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 GoxHR. All rights reserved.</span>
            <span>Made for teams in Nigeria and beyond.</span>
          </div>
        </div>
      </footer>

      <div className="stub-note" role="status" hidden={stub === null}>
        {stub ? `Prototype note: ${stub.text}` : ""}
      </div>
    </>
  );
}
