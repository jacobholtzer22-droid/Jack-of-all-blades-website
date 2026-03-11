"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle,
  Calendar,
} from "lucide-react";
import Link from "next/link";
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

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!smsConsent) return;
    // For now, just show success state. Wire up to a form service later.
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSmsConsent(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 texture-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        {/* CTA Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="reveal opacity-0 text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Get In Touch
          </span>
          <h2 className="reveal opacity-0 font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Ready to Transform{" "}
            <span className="text-forest-400">Your Property?</span>
          </h2>
          <p className="reveal opacity-0 text-dark-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Get a free estimate today. We serve Grand Rapids, MI and all
            surrounding areas.
          </p>
          <Link
            href="/contact"
            className="reveal opacity-0 inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-6 py-3 rounded-xl font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
          >
            <Calendar size={18} />
            Schedule a Free Quote
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 reveal opacity-0">
            <div className="space-y-6">
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
                    Grand Rapids, MI
                  </div>
                  <div className="text-dark-300 text-sm">
                    & surrounding areas
                  </div>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-8">
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

          {/* Contact Form */}
          <div className="lg:col-span-3 reveal opacity-0">
            <form
              onSubmit={handleSubmit}
              className="bg-dark-800/30 border border-dark-600/20 rounded-2xl p-6 sm:p-8 lg:p-10"
            >
              <h3 className="font-heading font-bold text-2xl text-white mb-6">
                Request a Free Estimate
              </h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-dark-200 text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="John Smith"
                    className="w-full bg-dark-900/60 border border-dark-600/30 rounded-xl px-4 py-3 text-white placeholder:text-dark-500 focus:outline-none focus:border-forest-600/50 focus:ring-1 focus:ring-forest-600/25 transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-dark-200 text-sm font-medium mb-2"
                  >
                    Phone or Email
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    placeholder="(616) 555-0000"
                    className="w-full bg-dark-900/60 border border-dark-600/30 rounded-xl px-4 py-3 text-white placeholder:text-dark-500 focus:outline-none focus:border-forest-600/50 focus:ring-1 focus:ring-forest-600/25 transition-all"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="service"
                  className="block text-dark-200 text-sm font-medium mb-2"
                >
                  Service Interested In
                </label>
                <select
                  id="service"
                  name="service"
                  className="w-full bg-dark-900/60 border border-dark-600/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-forest-600/50 focus:ring-1 focus:ring-forest-600/25 transition-all appearance-none"
                >
                  <option value="">Select a service...</option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-dark-200 text-sm font-medium mb-2"
                >
                  Tell Us About Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Describe what you're looking for..."
                  className="w-full bg-dark-900/60 border border-dark-600/30 rounded-xl px-4 py-3 text-white placeholder:text-dark-500 focus:outline-none focus:border-forest-600/50 focus:ring-1 focus:ring-forest-600/25 transition-all resize-none"
                />
              </div>

              <SmsConsent
                id="contact-home-sms-consent"
                checked={smsConsent}
                onChange={setSmsConsent}
              />

              <button
                type="submit"
                disabled={submitted || !smsConsent}
                className="w-full flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 disabled:bg-forest-700 text-white py-4 rounded-xl font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25 disabled:cursor-not-allowed"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
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
          </div>
        </div>
      </div>
    </section>
  );
}
