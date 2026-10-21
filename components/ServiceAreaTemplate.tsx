"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import type { ServiceArea } from "@/data/serviceAreas";
import { getNearbyAreas } from "@/data/serviceAreas";
import { SERVICES } from "@/data/services";
import { BLUR_DATA_URL } from "@/lib/constants";

interface ServiceAreaTemplateProps {
  area: ServiceArea;
}

export default function ServiceAreaTemplate({ area }: ServiceAreaTemplateProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const nearby = getNearbyAreas(area.slug);

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
    <section ref={sectionRef} className="relative pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-earthy-900" />

      <div className="relative z-10 max-w-5xl mx-auto section-padding">
        {/* Intro paragraph */}
        <div className="reveal opacity-0 mb-16">
          <p className="text-dark-200 text-lg leading-relaxed max-w-3xl">
            {area.description}
          </p>
        </div>

        {/* Services grid */}
        <div className="mb-16">
          <h2 className="reveal opacity-0 font-heading font-bold text-2xl sm:text-3xl text-white mb-8">
            Services We Offer in {area.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="reveal opacity-0 group flex gap-4 p-6 rounded-2xl bg-earthy-800/60 border border-forest-800/30 hover:border-forest-500/40 hover:bg-earthy-700/60 transition-all"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-900/60 border border-forest-700/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-forest-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2 group-hover:text-forest-300 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-dark-300 text-sm leading-relaxed">
                      {service.cardDescription}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Nearby areas */}
        {nearby.length > 0 && (
          <div className="reveal opacity-0 mb-16">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
              Nearby areas we serve
            </h2>
            <div className="flex flex-wrap gap-3">
              {nearby.map((a) => (
                <Link
                  key={a.slug}
                  href={`/service-areas/${a.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-earthy-800/80 border border-forest-700/30 text-dark-100 hover:text-white hover:border-forest-500/50 hover:bg-earthy-700/80 transition-all text-sm font-medium"
                >
                  <MapPin size={14} className="text-forest-400" />
                  {a.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Internal links */}
        <div className="reveal opacity-0 flex flex-wrap gap-4 mb-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            View All Services
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            View Our Portfolio
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            All Service Areas
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* CTA */}
        <div className="reveal opacity-0 relative rounded-2xl overflow-hidden border border-forest-700/30">
          <Image
            src="/images/IMG_5510.webp"
            alt=""
            fill
            className="object-cover object-center [image-orientation:from-image]"
            sizes="100vw"
            quality={75}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-earthy-950/90" />
          <div className="relative z-10 p-8 sm:p-12 text-center">
            <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-4">
              Get a Free Estimate in {area.name}
            </h3>
            <p className="text-dark-200 mb-6 max-w-xl mx-auto">
              Ready to transform your {area.name} property? Contact us today for a
              free, no-obligation estimate.
            </p>
            <Link
              href={`/contact?area=${encodeURIComponent(area.name)}`}
              className="inline-flex items-center gap-3 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-forest-600/30"
            >
              <MapPin size={20} />
              Request Your Free Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
