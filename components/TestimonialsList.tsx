"use client";

import { useEffect, useRef } from "react";
import { Star, Quote, ExternalLink } from "lucide-react";
import { testimonials, GOOGLE_REVIEW_URL } from "@/data/testimonials";

export default function TestimonialsList() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className="relative pb-24 sm:pb-32 overflow-hidden border-t border-forest-900/30">
      <div className="absolute inset-0 bg-earthy-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-950/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        {/* Leave a Review CTA */}
        <div className="reveal opacity-0 flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-6 sm:p-8 bg-dark-800/30 border border-dark-600/20 rounded-2xl">
          <div>
            <h3 className="font-heading font-semibold text-white text-xl mb-1">
              Had a great experience?
            </h3>
            <p className="text-dark-300 text-sm">
              We&apos;d love to hear from you. Leave us a review on Google!
            </p>
          </div>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-dark-900 font-semibold px-6 py-3 rounded-full transition-colors shadow-lg shadow-black/10 shrink-0"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Leave Us a Review
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="reveal opacity-0 relative bg-dark-800/30 border border-dark-600/20 rounded-2xl p-6 sm:p-8 flex flex-col"
            >
              <div className="absolute top-4 right-4">
                <Quote
                  size={32}
                  className="text-forest-600/15"
                  strokeWidth={1}
                />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    size={18}
                    className="text-gold-400 fill-gold-400"
                  />
                ))}
              </div>

              {/* Review text */}
              <blockquote className="text-dark-50 text-base leading-relaxed font-medium mb-6 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Reviewer info */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-dark-600/15">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-forest-900/40 border border-forest-700/20 flex items-center justify-center shrink-0">
                    <span className="font-heading font-bold text-forest-400 text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-dark-400 text-xs">Verified Customer</div>
                  </div>
                </div>
                <span className="text-dark-400 text-xs bg-dark-800/40 border border-dark-600/20 rounded-full px-3 py-1">
                  {testimonial.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Google Reviews link */}
        <div className="reveal opacity-0 flex justify-center mt-12">
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-semibold transition-colors"
          >
            See All Google Reviews
            <ExternalLink
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
