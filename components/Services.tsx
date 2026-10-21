"use client";

import { useEffect, useRef } from "react";
import { SERVICES } from "@/data/services";
import ServiceCard from "./ServiceCard";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 texture-overlay border-t border-forest-900/30"
    >
      <div className="absolute inset-0 bg-earthy-900" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            What We Do
          </span>
          <h2 className="section-heading-accent font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight pt-2">
            Our Services
          </h2>
          <p className="text-dark-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive landscaping solutions for homes and businesses across
            Grand Rapids, East Grand Rapids, and all of West Michigan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.slug}
              service={service}
              className="reveal opacity-0"
              style={{ animationDelay: `${i * 0.1}s` }}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
