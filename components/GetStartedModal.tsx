"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

const ENDPOINT = "/api/get-started.php";
const SUPPORT_EMAIL = "support@lulisuite.com";

const TEAM_SIZES = [
  "1 to 10",
  "11 to 50",
  "51 to 200",
  "201 to 500",
  "501 to 1,000",
  "More than 1,000",
];

type Fields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  size: string;
  message: string;
  hp_url: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: Fields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  size: "",
  message: "",
  hp_url: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-\s]{7,20}$/;

// Keys are added in on-screen order so the first error is the first field to fix.
function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your full name.";
  if (!EMAIL_RE.test(f.email.trim())) e.email = "Enter a valid work email.";
  if (f.phone.trim() && !PHONE_RE.test(f.phone.trim())) e.phone = "Enter a valid phone number.";
  if (f.company.trim().length < 2) e.company = "Enter your company name.";
  if (!TEAM_SIZES.includes(f.size)) e.size = "Choose your team size.";
  return e;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), textarea:not([disabled])';

export default function GetStartedModal({ onClose }: { onClose: () => void }) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  });

  // Open: lock page scroll, focus the first field, trap Tab, close on Escape.
  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.getElementById("gs-name")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !root.contains(active);
      if (e.shiftKey && (active === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo?.focus?.();
    };
  }, []);

  // After a successful send, move focus to the confirmation so screen readers announce it.
  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  // Close the dialog automatically a few seconds after a successful submission.
  useEffect(() => {
    if (status !== "sent") return;
    const timer = window.setTimeout(() => closeRef.current(), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const set = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((er) => {
        const next = { ...er };
        delete next[key];
        return next;
      });
    }
  };

  const common = (key: keyof Fields) => ({
    id: `gs-${key}`,
    name: key,
    value: fields[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `gs-${key}-err` : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(fields);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      document.getElementById(`gs-${firstBad}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          company: fields.company.trim(),
          size: fields.size,
          message: fields.message.trim(),
          hp_url: fields.hp_url,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok) {
        setStatus("sent");
      } else if ((res.status === 422 || res.status === 409) && data && data.errors) {
        setErrors(data.errors as Errors);
        setStatus("idle");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className="gs-overlay">
      <div
        className="gs-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gs-title"
        ref={dialogRef}
      >
        <button className="gs-close" type="button" aria-label="Close" onClick={onClose}>
          <svg className="icon" aria-hidden="true"><use href="#i-x" /></svg>
        </button>

        {status === "sent" ? (
          <div className="gs-done" role="status">
            <span className="gs-done-ic"><svg className="icon" aria-hidden="true"><use href="#i-check" /></svg></span>
            <h2 id="gs-title" tabIndex={-1} ref={doneRef}>Thanks, we have your details.</h2>
            <p>Your request has been sent to our team. We will reach out to you at <b>{fields.email.trim()}</b>.</p>
            <p className="gs-sub">This window will close automatically in a few seconds.</p>
            <button className="btn btn-primary" type="button" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <h2 id="gs-title">Get started with GoxHR</h2>
            <p className="gs-sub">Tell us a little about your company and our team will get in touch to set you up.</p>

            <div className="gs-field">
              <label htmlFor="gs-name">Full name</label>
              <input {...common("name")} type="text" autoComplete="name" maxLength={100} />
              {errors.name && <p className="gs-err" id="gs-name-err">{errors.name}</p>}
            </div>

            <div className="gs-row">
              <div className="gs-field">
                <label htmlFor="gs-email">Work email</label>
                <input {...common("email")} type="email" autoComplete="email" maxLength={150} />
                {errors.email && <p className="gs-err" id="gs-email-err">{errors.email}</p>}
              </div>
              <div className="gs-field">
                <label htmlFor="gs-phone">Phone <span className="gs-opt">(optional)</span></label>
                <input {...common("phone")} type="tel" autoComplete="tel" maxLength={30} />
                {errors.phone && <p className="gs-err" id="gs-phone-err">{errors.phone}</p>}
              </div>
            </div>

            <div className="gs-row">
              <div className="gs-field">
                <label htmlFor="gs-company">Company name</label>
                <input {...common("company")} type="text" autoComplete="organization" maxLength={120} />
                {errors.company && <p className="gs-err" id="gs-company-err">{errors.company}</p>}
              </div>
              <div className="gs-field">
                <label htmlFor="gs-size">Team size</label>
                <select {...common("size")}>
                  <option value="">Choose one</option>
                  {TEAM_SIZES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.size && <p className="gs-err" id="gs-size-err">{errors.size}</p>}
              </div>
            </div>

            <div className="gs-field">
              <label htmlFor="gs-message">What do you want to sort out first? <span className="gs-opt">(optional)</span></label>
              <textarea {...common("message")} rows={3} maxLength={1000} />
            </div>

            <div className="gs-hp" aria-hidden="true">
              <label htmlFor="gs-hp_url">Leave this field empty</label>
              <input
                id="gs-hp_url"
                name="hp_url"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={fields.hp_url}
                onChange={set("hp_url")}
              />
            </div>

            {status === "error" && (
              <p className="gs-fail" role="alert">
                We could not send your details. Try again, or email us at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
              </p>
            )}

            <button className="btn btn-primary gs-submit" type="submit" aria-busy={sending} disabled={sending}>
              {sending ? "Sending…" : "Get started"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
