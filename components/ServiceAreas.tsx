"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { ALL_SERVICE_AREAS, getServiceAreaLink } from "@/data/serviceAreas";

export default function ServiceAreas() {
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
    <section
      ref={sectionRef}
      id="service-areas"
      className="relative py-24 sm:py-32 overflow-hidden border-t border-forest-900/30"
    >
      <div className="absolute inset-0 bg-earthy-950" />
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-forest-950/10 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto section-padding">
        <div className="text-center mb-12">
          <span className="reveal opacity-0 text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Areas We Serve
          </span>
          <h2 className="reveal opacity-0 section-heading-accent font-heading font-bold text-4xl sm:text-5xl text-white mb-6 tracking-tight pt-2">
            Proud to Serve West Michigan
          </h2>
          <p className="reveal opacity-0 text-dark-200 text-lg max-w-3xl mx-auto leading-relaxed">
            Proudly serving East Grand Rapids, Grand Rapids, and communities across
            West Michigan with professional landscaping, lawn care, hardscaping, and
            tree services.
          </p>
        </div>

        <div className="reveal opacity-0 flex flex-wrap justify-center gap-3">
          {ALL_SERVICE_AREAS.map((area) => {
            const href = getServiceAreaLink(area);
            return (
              <Link
                key={area}
                href={href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-earthy-800/80 border border-forest-700/30 text-dark-100 hover:text-white hover:border-forest-500/50 hover:bg-earthy-700/80 transition-all duration-300 text-sm font-medium"
              >
                <MapPin size={14} className="text-forest-500 flex-shrink-0" />
                {area}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
