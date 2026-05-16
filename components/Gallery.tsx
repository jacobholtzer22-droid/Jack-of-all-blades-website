"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/constants";

const galleryItems = [
  {
    id: 1,
    label: "Paver Patio",
    alt: "Custom paver patio installation Grand Rapids Michigan",
    image: "/images/IMG_6448.webp",
    span: "md:col-span-2 md:row-span-2",
    imageRotate: 90,
  },
  {
    id: 2,
    label: "Lawn Mowing",
    alt: "Professional lawn mowing service Grand Rapids MI",
    image: "/images/IMG_5381.webp",
    span: "",
  },
  {
    id: 3,
    label: "Tree Trimming",
    alt: "Tree trimming and pruning service Grand Rapids Michigan",
    image: "/images/tree-trimming-chainsaw.webp",
    span: "md:row-span-2",
  },
  {
    id: 4,
    label: "Landscaping",
    alt: "Residential landscaping project Grand Rapids MI",
    image: "/images/IMG_5541.webp",
    span: "",
  },
  {
    id: 5,
    label: "Sod Installation",
    alt: "New sod installation and lawn setup Grand Rapids Michigan",
    image: "/images/sod-installation.webp",
    span: "",
  },
  {
    id: 6,
    label: "Paver Walkway",
    alt: "Paver walkway installation at residential property Grand Rapids MI",
    image: "/images/IMG_6706.webp",
    span: "md:col-span-2",
    imageRotate: 90,
  },
  {
    id: 7,
    label: "Snow Removal",
    alt: "Snow removal and plowing service Grand Rapids Michigan",
    image: "/images/snow-removal-truck.webp",
    span: "",
  },
  {
    id: 8,
    label: "Fall Cleanup",
    alt: "Seasonal fall yard cleanup Grand Rapids MI",
    image: "/images/IMG_7394-preview.webp",
    span: "",
  },
  {
    id: 9,
    label: "Hardscaping",
    alt: "Retaining wall and hardscape construction Grand Rapids Michigan",
    image: "/images/IMG_6448.webp",
    span: "md:col-span-2",
    imageRotate: 90,
  },
  {
    id: 10,
    label: "Striped Lawn Care",
    alt: "Zero-turn mowers on professionally striped residential lawn Grand Rapids Michigan",
    image: "/images/IMG_0545.png",
    span: "md:col-span-2",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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
      { threshold: 0.05, rootMargin: "50px" }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 sm:py-32 texture-overlay"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Work
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Project Portfolio
          </h2>
          <p className="text-dark-200 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A showcase of our landscaping, hardscaping, and lawn care
            transformations across Grand Rapids.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:auto-rows-[minmax(200px,auto)]">
          {galleryItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className={`group relative rounded-2xl overflow-hidden border border-dark-600/20 hover:border-forest-600/30 transition-all duration-500 opacity-0 ${
                item.span
              } ${item.span.includes("row-span-2") ? "min-h-[400px]" : "min-h-[200px]"}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${(item as { imageRotate?: number }).imageRotate ? "rotate-90" : ""}`}
                sizes={
                  item.span.includes("col-span-2")
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 25vw"
                }
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                decoding="async"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white text-sm sm:text-base font-heading font-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
