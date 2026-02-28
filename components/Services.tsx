"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BLUR_DATA_URL } from "@/lib/constants";
import {
  Leaf,
  Flower2,
  Layers,
  Snowflake,
  TreePine,
  Scissors,
  ArrowRight,
} from "lucide-react";
const services = [
  {
    icon: Leaf,
    title: "Lawn Care",
    alt: "Weekly lawn mowing and maintenance service East Grand Rapids MI",
    description:
      "Keep your property looking pristine all season long. Our comprehensive lawn care includes weekly mowing, precision edging, trimming, and thorough cleanup. We maintain consistent schedules and pay attention to every detail so your yard always makes a great impression.",
    image: "/images/IMG_5510.jpg",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Cascade"],
  },
  {
    icon: Flower2,
    title: "Landscaping",
    alt: "Custom landscape design and garden bed installation East Grand Rapids Michigan",
    description:
      "Transform your outdoor space with custom landscape design and installation. From fresh mulch and seasonal plantings to complete landscape renovations, we create beautiful, functional spaces that boost your property's curb appeal and value.",
    image: "/images/IMG_5541.jpg",
    areas: ["East Grand Rapids", "Ada", "Forest Hills", "Cascade"],
  },
  {
    icon: Layers,
    title: "Hardscaping",
    alt: "Custom patio and walkway installation East Grand Rapids Michigan",
    description:
      "Add lasting beauty and structure with professional hardscape installation. We build custom patios, walkways, retaining walls, and stone features using quality materials and expert craftsmanship. Every project is built to withstand Michigan's seasons.",
    image: "/images/IMG_6756.jpg",
    areas: ["East Grand Rapids", "Grand Rapids", "Wyoming", "Ada"],
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    alt: "Commercial and residential snow removal service East Grand Rapids MI",
    description:
      "Don't let Michigan winters slow you down. Our reliable snow removal services include plowing, salting, ice management, and sidewalk clearing for both residential and commercial properties. Contract-based service with guaranteed response times.",
    image: "/images/snow-removal-truck.jpg",
    areas: ["East Grand Rapids", "Grand Rapids", "Kentwood", "Grandville"],
  },
  {
    icon: Scissors,
    title: "Seasonal Cleanup",
    alt: "Fall and spring yard cleanup service East Grand Rapids Michigan",
    description:
      "Prepare your property for every season with our thorough cleanup services. Spring and fall cleanups include leaf removal, garden bed clearing, perennial cutbacks, debris removal, and complete yard detailing to keep your landscape healthy year-round.",
    image: "/images/IMG_7394-preview.jpg",
    areas: ["East Grand Rapids", "Kentwood", "Walker", "Cascade"],
  },
  {
    icon: TreePine,
    title: "Tree Trimming / Removal",
    alt: "Professional tree trimming and removal service East Grand Rapids MI",
    description:
      "Protect your property and improve its appearance with professional tree services. We handle trimming, shaping, full tree removal, and stump grinding. Licensed and insured for safe, efficient work that transforms your yard.",
    image: "/images/tree-removal-truck.jpg",
    areas: ["East Grand Rapids", "Grand Rapids", "Ada", "Rockford"],
  },
];

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
            East Grand Rapids and the greater Grand Rapids area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest-900/20 opacity-0 transition-all duration-500 min-h-[280px] sm:min-h-[320px]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 [image-orientation:from-image]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="w-14 h-14 rounded-xl bg-forest-900/60 backdrop-blur-sm border border-forest-700/30 flex items-center justify-center mb-6 group-hover:bg-forest-800/70 group-hover:border-forest-600/40 transition-all duration-500">
                    <Icon
                      size={28}
                      className="text-forest-400 group-hover:text-forest-300 transition-colors"
                    />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-forest-300 transition-colors" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                    {service.title}
                  </h3>

                  <p className="text-white/95 leading-relaxed text-[15px] mb-5 font-medium" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                    {service.description}
                  </p>

                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-forest-300 hover:text-forest-200 transition-colors group/link"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                    >
                      Get Free Estimate
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
