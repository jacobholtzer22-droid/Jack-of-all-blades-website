"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Leaf,
  Flower2,
  Layers,
  Snowflake,
  TreePine,
  Scissors,
} from "lucide-react";

const services = [
  {
    icon: Leaf,
    title: "Lawn Care",
    description:
      "Our lawn care services keep your yard healthy, green, and well-maintained throughout the season. We offer routine mowing, trimming, edging, and cleanup to ensure your property always looks neat and professional. Reliable service with attention to detail—every visit.",
    image: "/images/IMG_5387.jpg",
  },
  {
    icon: Flower2,
    title: "Landscape",
    description:
      "We provide custom landscaping solutions designed to enhance the beauty and value of your property. From planting and mulching to landscape cleanups and bed maintenance, we focus on creating outdoor spaces that are both attractive and functional.",
    image: "/images/IMG_4267.jpg",
  },
  {
    icon: Layers,
    title: "Hardscape",
    description:
      "Our hardscaping services add structure and durability to your outdoor space. We install patios, walkways, retaining walls, and other stone or paver features built to last. Quality craftsmanship and proper installation ensure long-term performance and visual appeal.",
    image: "/images/IMG_5386.jpg",
  },
  {
    icon: Snowflake,
    title: "Snow Removal",
    description:
      "We provide the services of salting, ice removal, snow cleared on driveways and pathways, along with city sidewalks. All details are listed in the contract.",
    image: "/images/snow-removal-truck.png",
  },
  {
    icon: Scissors,
    title: "Seasonal Cleanup",
    description:
      "Seasonal Cleanup offers many services such as leaf removal, cutting back perennials, yard cleanup and garden bed cleaning.",
    image: "/images/IMG_7394-preview.jpg",
  },
  {
    icon: TreePine,
    title: "Tree Trimming / Removal",
    description:
      "We have tree trimming, tree removal, and we also include stump removal if included. These services are very trusted with us and show a brand new look!",
    image: "/images/tree-removal-truck.png",
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
      className="relative py-24 sm:py-32 texture-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            What We Do
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Our Services
          </h2>
          <p className="text-dark-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Comprehensive landscaping solutions to keep your property looking its
            best — every season, every detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="group relative rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest-900/20 opacity-0 transition-all duration-500 min-h-[320px]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/85 to-dark-950/40 group-hover:via-dark-950/80 group-hover:to-dark-950/30 transition-all duration-500" />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <div className="w-14 h-14 rounded-xl bg-forest-900/60 backdrop-blur-sm border border-forest-700/30 flex items-center justify-center mb-6 group-hover:bg-forest-800/70 group-hover:border-forest-600/40 transition-all duration-500">
                    <Icon
                      size={28}
                      className="text-forest-400 group-hover:text-forest-300 transition-colors"
                    />
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-forest-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-dark-200 leading-relaxed text-[15px]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
