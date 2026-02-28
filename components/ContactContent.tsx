"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";

const serviceOptions = [
  "Lawn Care",
  "Landscaping",
  "Hardscaping",
  "Snow Removal",
  "Seasonal Cleanup",
  "Tree Trimming / Removal",
  "Other",
];

type FormErrors = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
};

export default function ContactContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
    website: "", // honeypot
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const children = sectionRef.current?.querySelectorAll(".reveal");
    children?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  function validate(fields = form): FormErrors {
    const errs: FormErrors = {};
    if (!fields.name.trim()) errs.name = "Full name is required.";
    if (!fields.phone.trim()) {
      errs.phone = "Phone number is required.";
    } else if (fields.phone.replace(/\D/g, "").length < 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }
    if (
      fields.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
    ) {
      errs.email = "Please enter a valid email address.";
    }
    if (!fields.service) errs.service = "Please select a service.";
    if (!fields.message.trim()) errs.message = "Message is required.";
    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        const fieldErrors = validate(updated);
        if (fieldErrors[name as keyof FormErrors]) {
          next[name as keyof FormErrors] = fieldErrors[name as keyof FormErrors];
        } else {
          delete next[name as keyof FormErrors];
        }
        return next;
      });
    }
  }

  function handleBlur(e: React.FocusEvent) {
    const { name } = e.target as HTMLInputElement;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldErrors = validate(form);
    if (fieldErrors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name as keyof FormErrors]: fieldErrors[name as keyof FormErrors],
      }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setServerError("");

    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ name: true, phone: true, service: true, message: true });

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(
            data.error || "Something went wrong. Please try again."
          );
        }
        return;
      }

      setSubmitted(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
        website: "",
      });
      setTouched({});
    } catch {
      setServerError(
        "Unable to send your message. Please call us at 616-250-8044."
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-dark-900/60 border rounded-xl px-4 py-3 text-white placeholder:text-dark-500 focus:outline-none transition-all ${
      errors[field] && touched[field]
        ? "border-red-500/60 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/25"
        : "border-dark-600/30 focus:border-forest-600/50 focus:ring-1 focus:ring-forest-600/25"
    }`;

  return (
    <section ref={sectionRef} className="relative pb-24 sm:pb-32 overflow-hidden border-t border-forest-900/30">
      <div className="absolute inset-0 bg-earthy-900" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form - shown first */}
          <div className="lg:col-span-3 lg:order-1 reveal opacity-0">
            {submitted ? (
              <div className="bg-dark-800/30 border border-forest-600/30 rounded-2xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-forest-900/40 border border-forest-700/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={32} className="text-forest-400" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3">
                  Thank You!
                </h3>
                <p className="text-dark-300 text-lg mb-6 max-w-md mx-auto">
                  We&apos;ll get back to you within 24 hours. If your request is
                  urgent, feel free to call us directly.
                </p>
                <a
                  href="tel:6162508044"
                  className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-heading font-semibold transition-colors"
                >
                  <Phone size={18} />
                  616-250-8044
                </a>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-dark-400 hover:text-dark-200 text-sm transition-colors min-h-[44px] px-4"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-dark-800/30 border border-dark-600/20 rounded-2xl p-6 sm:p-8 lg:p-10"
                noValidate
              >
                <h3 className="font-heading font-bold text-2xl text-white mb-2">
                  Request a Free Estimate
                </h3>
                <p className="text-dark-300 text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>

                {serverError && (
                  <div className="flex items-start gap-3 bg-red-950/40 border border-red-800/30 rounded-xl p-4 mb-6">
                    <AlertCircle
                      size={20}
                      className="text-red-400 flex-shrink-0 mt-0.5"
                    />
                    <p className="text-red-300 text-sm">{serverError}</p>
                  </div>
                )}

                {/* Honeypot — hidden from real users */}
                <div className="absolute opacity-0 -z-10" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-dark-200 text-sm font-medium mb-2"
                    >
                      Full Name <span className="text-forest-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("name")}
                    />
                    {errors.name && touched.name && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-dark-200 text-sm font-medium mb-2"
                    >
                      Phone Number <span className="text-forest-400">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="(616) 555-0000"
                      value={form.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("phone")}
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-dark-200 text-sm font-medium mb-2"
                    >
                      Email Address{" "}
                      <span className="text-dark-500 text-xs">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={inputClass("email")}
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="block text-dark-200 text-sm font-medium mb-2"
                    >
                      Service Interested In{" "}
                      <span className="text-forest-400">*</span>
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={form.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClass("service")} appearance-none`}
                    >
                      <option value="">Select a service...</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.service && touched.service && (
                      <p className="text-red-400 text-xs mt-1.5">
                        {errors.service}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-dark-200 text-sm font-medium mb-2"
                  >
                    Tell Us About Your Project{" "}
                    <span className="text-forest-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Describe what you're looking for, your timeline, property size, etc."
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && touched.message && (
                    <p className="text-red-400 text-xs mt-1.5">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 disabled:bg-forest-700 text-white py-4 rounded-xl font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-dark-400 text-xs text-center mt-4">
                  Or call us directly at{" "}
                  <a
                    href="tel:6162508044"
                    className="text-forest-400 hover:text-forest-300"
                  >
                    616-250-8044
                  </a>
                </p>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 lg:order-2 reveal opacity-0">
            <h2 className="font-heading font-bold text-2xl text-white mb-6">
              Get in Touch
            </h2>

            <div className="space-y-5 mb-10">
              <a
                href="tel:6162508044"
                className="group flex items-start gap-4 bg-dark-800/40 border border-dark-600/20 rounded-xl p-5 hover:border-forest-600/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-900/40 border border-forest-700/20 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-800/50 transition-colors">
                  <Phone size={22} className="text-forest-400" />
                </div>
                <div>
                  <div className="text-dark-300 text-sm mb-1">Call or Text</div>
                  <div className="text-white font-heading font-semibold text-lg group-hover:text-forest-300 transition-colors">
                    616-250-8044
                  </div>
                </div>
              </a>

              <a
                href="mailto:jackofallbladeslandscaping@gmail.com"
                className="group flex items-start gap-4 bg-dark-800/40 border border-dark-600/20 rounded-xl p-5 hover:border-forest-600/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-forest-900/40 border border-forest-700/20 flex items-center justify-center flex-shrink-0 group-hover:bg-forest-800/50 transition-colors">
                  <Mail size={22} className="text-forest-400" />
                </div>
                <div>
                  <div className="text-dark-300 text-sm mb-1">Email Us</div>
                  <div className="text-white font-heading font-semibold text-base sm:text-lg group-hover:text-forest-300 transition-colors break-all">
                    jackofallbladeslandscaping
                    <wbr />
                    @gmail.com
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-4 bg-dark-800/40 border border-dark-600/20 rounded-xl p-5">
                <div className="w-12 h-12 rounded-xl bg-forest-900/40 border border-forest-700/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-forest-400" />
                </div>
                <div>
                  <div className="text-dark-300 text-sm mb-1">Service Area</div>
                  <div className="text-white font-heading font-semibold text-lg">
                    Grand Rapids, MI 49506
                  </div>
                  <div className="text-dark-300 text-sm">
                    & surrounding areas
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-dark-800/40 border border-dark-600/20 rounded-xl p-5">
                <div className="w-12 h-12 rounded-xl bg-forest-900/40 border border-forest-700/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-forest-400" />
                </div>
                <div>
                  <div className="text-dark-300 text-sm mb-1">Response Time</div>
                  <div className="text-white font-heading font-semibold text-lg">
                    Within 24 Hours
                  </div>
                  <div className="text-dark-300 text-sm">
                    We respond to all inquiries quickly
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-dark-300 text-sm font-medium mb-4 uppercase tracking-wider">
                Follow Us
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/jackofallbladeslandscape"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-dark-800/40 border border-dark-600/20 flex items-center justify-center hover:border-forest-600/30 hover:bg-dark-700/40 transition-all"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-5 h-5 text-dark-200 group-hover:text-forest-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@jackofallbladeslscp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 rounded-xl bg-dark-800/40 border border-dark-600/20 flex items-center justify-center hover:border-forest-600/30 hover:bg-dark-700/40 transition-all"
                  aria-label="TikTok"
                >
                  <svg
                    className="w-5 h-5 text-dark-200 group-hover:text-forest-400 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
