"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Star, Quote, ArrowRight } from "lucide-react";

export default function HomeTestimonialPreview() {
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
      { threshold: 0.15 }
    );

    const children = sectionRef.current?.querySelectorAll(".reveal");
    children?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden texture-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div className="relative z-10 max-w-4xl mx-auto section-padding">
        <div className="text-center mb-12">
          <span className="reveal opacity-0 text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="reveal opacity-0 font-heading font-bold text-4xl sm:text-5xl text-white mb-6 tracking-tight">
            What Our Clients Say
          </h2>
        </div>

        <div className="reveal opacity-0 relative bg-dark-800/30 border border-dark-600/20 rounded-3xl p-8 sm:p-12">
          <div className="absolute top-6 left-6 sm:top-8 sm:left-10">
            <Quote size={40} className="text-forest-600/20" strokeWidth={1} />
          </div>

          <div className="flex items-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, j) => (
              <Star key={j} size={20} className="text-gold-400 fill-gold-400" />
            ))}
          </div>

          <blockquote className="text-dark-100 text-lg sm:text-xl leading-relaxed font-light mb-8">
            &ldquo;Michael built a beautiful patio in my front yard and another
            in the back as a platform to hold my raised planters. Both were
            affordable, well done and completed quickly and on schedule. I
            highly recommend Jack of All Blades for the care and maintenance of
            your property year round.&rdquo;
          </blockquote>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest-900/40 border border-forest-700/20 flex items-center justify-center">
                <span className="font-heading font-bold text-forest-400">B</span>
              </div>
              <div>
                <div className="font-heading font-semibold text-white text-lg">
                  Barb W.
                </div>
                <div className="text-dark-300 text-sm">Satisfied Customer</div>
              </div>
            </div>

            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-semibold transition-colors text-sm"
            >
              Read All Reviews
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
