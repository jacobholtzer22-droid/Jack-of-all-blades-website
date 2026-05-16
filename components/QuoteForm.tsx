"use client";

import { useRef, useState, type FormEvent } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import SmsConsent from "./SmsConsent";

const serviceOptions = [
  "Lawn Care",
  "Landscape",
  "Hardscape",
  "Snow Removal",
  "Seasonal Cleanup",
  "Storm Clean Up",
  "Hedge and Bush Trimming",
  "Tree Trimming / Removal",
  "Other",
];

const inputClass =
  "w-full bg-white border border-white/10 rounded-full px-5 py-3.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-forest-500/60 focus:border-transparent transition-all";

const textareaClass =
  "w-full bg-white border border-white/10 rounded-2xl px-5 py-3.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:ring-2 focus:ring-forest-500/60 focus:border-transparent transition-all resize-none";

const labelClass = "block text-white text-sm font-medium mb-2";

export default function QuoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [smsConsent, setSmsConsent] = useState(false);
  const [smsTouched, setSmsTouched] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSmsTouched(true);

    if (!smsConsent) {
      setError("Please agree to the SMS consent to continue.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      address: String(fd.get("address") ?? "").trim(),
      service: String(fd.get("service") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? "").trim(),
      smsConsent,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        const fromFields = data.errors
          ? Object.values(data.errors).filter(Boolean)[0]
          : undefined;
        setError(
          data.error ??
            fromFields ??
            "Something went wrong. Please try again or call us."
        );
        return;
      }

      formRef.current?.reset();
      setSmsConsent(false);
      setSmsTouched(false);
      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again or call us.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="w-full rounded-3xl border border-dark-600/30 bg-dark-900/70 backdrop-blur-sm p-8 sm:p-10 text-center shadow-2xl shadow-black/40"
        role="status"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-forest-900/40 border border-forest-700/30 mb-5">
          <CheckCircle className="text-forest-400" size={32} aria-hidden />
        </div>
        <h3 className="font-heading font-bold text-2xl text-white mb-3">
          Request received
        </h3>
        <p className="text-dark-200 text-base leading-relaxed max-w-md mx-auto">
          Thank you for reaching out. We will get back to you shortly. You can
          also call{" "}
          <a
            href="tel:6162508044"
            className="text-forest-400 hover:text-forest-300 transition-colors"
          >
            616-250-8044
          </a>{" "}
          if you need to speak with someone right away.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full rounded-3xl border border-dark-600/30 bg-dark-900/70 backdrop-blur-sm p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/40"
      noValidate
    >
      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
        Get Your Free Quote
      </h2>

      {error && (
        <p
          className="text-red-300 text-sm mb-5 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3"
          role="alert"
        >
          {error}
        </p>
      )}

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />

      <div className="space-y-4 mb-4">
        <div>
          <label htmlFor="quote-name" className={labelClass}>
            Name <span className="text-forest-400">*</span>
          </label>
          <input
            type="text"
            id="quote-name"
            name="name"
            required
            autoComplete="name"
            placeholder="John Smith"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="quote-email" className={labelClass}>
            Email <span className="text-forest-400">*</span>
          </label>
          <input
            type="email"
            id="quote-email"
            name="email"
            required
            autoComplete="email"
            placeholder="john@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="quote-phone" className={labelClass}>
            Phone <span className="text-forest-400">*</span>
          </label>
          <input
            type="tel"
            id="quote-phone"
            name="phone"
            required
            autoComplete="tel"
            placeholder="(616) 555-0123"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="quote-address" className={labelClass}>
            Service Address <span className="text-forest-400">*</span>
          </label>
          <input
            type="text"
            id="quote-address"
            name="address"
            required
            autoComplete="street-address"
            placeholder="123 Main St, Grand Rapids, MI 49503"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="quote-service" className={labelClass}>
            Service Type
          </label>
          <select
            id="quote-service"
            name="service"
            defaultValue=""
            className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23404040%22 stroke-width=%222.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-no-repeat bg-[right_1.25rem_center] pr-12`}
          >
            <option value="">Select a service...</option>
            {serviceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="quote-message" className={labelClass}>
            Message
          </label>
          <textarea
            id="quote-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project..."
            className={textareaClass}
          />
        </div>
      </div>

      <SmsConsent
        id="quote-sms-consent"
        checked={smsConsent}
        onChange={(checked) => {
          setSmsConsent(checked);
          setSmsTouched(true);
        }}
        onBlur={() => setSmsTouched(true)}
        error="SMS consent is required to submit this form."
        touched={smsTouched && !smsConsent}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 disabled:bg-forest-700 disabled:cursor-not-allowed text-white py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/30"
      >
        {submitting ? (
          <>
            <Loader2 size={22} className="animate-spin shrink-0" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send size={20} className="shrink-0" aria-hidden />
            Get My Free Quote
          </>
        )}
      </button>

      <p className="text-dark-400 text-xs text-center mt-4">
        Prefer to talk? Call{" "}
        <a
          href="tel:6162508044"
          className="text-forest-400 hover:text-forest-300"
        >
          616-250-8044
        </a>
      </p>
    </form>
  );
}
