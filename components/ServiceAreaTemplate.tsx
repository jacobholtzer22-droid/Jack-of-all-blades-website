"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Flower2,
  Layers,
  Snowflake,
  Scissors,
  TreePine,
  ArrowRight,
  MapPin,
} from "lucide-react";
import type { ServiceArea } from "@/data/serviceAreas";
import { BLUR_DATA_URL } from "@/lib/constants";

const SERVICES = [
  {
    icon: Leaf,
    title: "Lawn Care",
    description:
      "Weekly mowing, precision edging, trimming, and thorough cleanup. We maintain consistent schedules so your yard always makes a great impression.",
  },
  {
    icon: Flower2,
    title: "Landscaping",
    description:
      "Custom landscape design and installation. From fresh mulch and seasonal plantings to complete landscape renovations that boost curb appeal.",
  },
  {
    icon: Layers,
    title: "Hardscaping",
    description:
      "Custom patios, walkways, retaining walls, and stone features. Quality materials and expert craftsmanship built to withstand Michigan's seasons.",
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    description:
      "Plowing, salting, ice management, and sidewalk clearing for residential and commercial properties. Contract-based with guaranteed response times.",
  },
  {
    icon: Scissors,
    title: "Seasonal Cleanup",
    description:
      "Spring and fall cleanups including leaf removal, garden bed clearing, perennial cutbacks, and complete yard detailing for year-round health.",
  },
  {
    icon: TreePine,
    title: "Tree Trimming & Removal",
    description:
      "Professional trimming, shaping, full tree removal, and stump grinding. Licensed and insured for safe, efficient work.",
  },
];

interface ServiceAreaTemplateProps {
  area: ServiceArea;
}

export default function ServiceAreaTemplate({ area }: ServiceAreaTemplateProps) {
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
                <div
                  key={service.title}
                  className="reveal opacity-0 flex gap-4 p-6 rounded-2xl bg-earthy-800/60 border border-forest-800/30"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-forest-900/60 border border-forest-700/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={24} className="text-forest-400" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white text-lg mb-2">
                      {service.title}
                    </h3>
                    <p className="text-dark-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Internal links */}
        <div className="reveal opacity-0 flex flex-wrap gap-4 mb-16">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            View All Services
            <ArrowRight size={16} className="group-hover:translate-x-1" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            View Our Portfolio
            <ArrowRight size={16} className="group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-medium transition-colors text-sm"
          >
            Back to Home
            <ArrowRight size={16} className="group-hover:translate-x-1" />
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
