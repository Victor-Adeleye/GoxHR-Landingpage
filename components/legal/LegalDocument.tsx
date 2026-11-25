import type { ReactNode } from "react";
import Link from "next/link";

export type LegalSection = {
  id: string;
  title: string;
  body: ReactNode;
};

type LegalDocumentProps = {
  title: string;
  lede: string;
  summary: { icon: string; title: string; text: string }[];
  sections: LegalSection[];
  related: { href: string; label: string };
};

function numberFor(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function LegalDocument({ title, lede, summary, sections, related }: LegalDocumentProps) {
  return (
    <section className="legal-doc in">
      <div className="wrap">
        <header className="legal-head">
          <div className="legal-kicker-row">
            <span className="kicker">Legal</span>
            <p className="legal-pill">Effective 12 October 2026</p>
          </div>
          <h1>{title}</h1>
          <p className="legal-lede">{lede}</p>
          <div className="legal-summary">
            {summary.map((item) => (
              <div className="legal-sum" key={item.title}>
                <span className="legal-sum-ic" aria-hidden="true">
                  <svg className="icon"><use href={item.icon} /></svg>
                </span>
                <div>
                  <b>{item.title}</b>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="legal-grid">
          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc-label">On this page</p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span className="legal-n">{numberFor(index)}.</span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal-body">
            {sections.map((section, index) => {
              const heading = (
                <h2>
                  <span className="legal-n">{numberFor(index)}.</span>
                  <span>{section.title}</span>
                </h2>
              );
              if (section.id === "contact") {
                return (
                  <div className="legal-contact" id="contact" key={section.id}>
                    {heading}
                    {section.body}
                    <p className="legal-related">
                      <Link href={related.href}>{related.label}</Link>
                    </p>
                  </div>
                );
              }
              return (
                <div className="legal-block" id={section.id} key={section.id}>
                  {heading}
                  {section.body}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
