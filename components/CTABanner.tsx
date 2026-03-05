"use client";

import { useEffect, useRef } from "react";
import { Phone, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CTABanner() {
  const ref = useRef<HTMLElement>(null);

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

    const children = ref.current?.querySelectorAll(".reveal");
    children?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative py-20 sm:py-28 overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-center">
      <Image
        src="/images/IMG_5510.webp"
        alt=""
        fill
        className="object-cover object-center [image-orientation:from-image]"
        sizes="100vw"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-earthy-950/85" />
      <div className="absolute inset-0 bg-gradient-to-br from-earthy-900/70 via-earthy-950/80 to-earthy-950/90" />

      <div className="relative z-10 max-w-3xl mx-auto text-center section-padding">
        <h2 className="reveal opacity-0 font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-6 tracking-tight">
          Ready to Transform{" "}
          <span className="text-forest-400">Your Property?</span>
        </h2>
        <p className="reveal opacity-0 text-dark-200 text-lg sm:text-xl mb-10 leading-relaxed">
          Get a free estimate today. Serving East Grand Rapids, Grand Rapids,
          Kentwood, Cascade, Ada, and all surrounding communities.
        </p>
        <div className="reveal opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:6162508044"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-forest-600/30 hover:-translate-y-0.5"
          >
            <Phone size={20} />
            Call 616-250-8044
          </a>
          <Link
            href="/contact"
            className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-forest-600/30 hover:-translate-y-0.5"
          >
            <Calendar size={20} />
            Schedule a Free Quote
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
