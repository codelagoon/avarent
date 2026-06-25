"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const FORMSUBMIT_EMAIL = "george@avarent.app";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

const emptyForm: ContactForm = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export function ContactSalesModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStatus("idle");
      setForm(emptyForm);
      setErrorMsg("");
    };
    window.addEventListener("open-contact-sales", handler);
    return () => window.removeEventListener("open-contact-sales", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => nameRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          _subject: "Avarent — Contact Sales Inquiry",
          _template: "table",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950 p-8 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/40 transition-colors hover:text-white/80"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {status === "success" ? (
          <div className="space-y-3 py-4 text-center">
            <div className="text-2xl">✓</div>
            <h2 className="text-lg font-semibold text-white">Message sent.</h2>
            <p className="text-sm leading-relaxed text-white/50">
              Our team will get back to you shortly. Check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1.5">
              <h2 className="text-xl font-semibold text-white">Contact Sales</h2>
              <p className="text-sm leading-relaxed text-white/50">
                Tell us about your institution and we&apos;ll follow up to discuss Avarent.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-medium uppercase tracking-wider text-white/60"
                >
                  Full name
                </label>
                <input
                  ref={nameRef}
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-medium uppercase tracking-wider text-white/60"
                >
                  Work email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@institution.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-company"
                  className="text-xs font-medium uppercase tracking-wider text-white/60"
                >
                  Institution
                </label>
                <input
                  id="contact-company"
                  type="text"
                  required
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  placeholder="Your bank or fintech"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-medium uppercase tracking-wider text-white/60"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="What would you like to discuss?"
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
                />
              </div>

              {status === "error" && <p className="text-xs text-red-400">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>

              <p className="text-center text-xs text-white/30">
                We typically respond within one business day.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function openContactSalesModal() {
  window.dispatchEvent(new CustomEvent("open-contact-sales"));
}
