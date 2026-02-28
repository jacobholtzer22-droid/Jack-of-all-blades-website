"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const galleryItems = [
  {
    id: 1,
    label: "Paver Patio",
    image: "/images/IMG_6756.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    label: "Lawn Mowing",
    image: "/images/IMG_5381.jpg",
    span: "",
  },
  {
    id: 3,
    label: "Tree Trimming",
    image: "/images/tree-trimming-chainsaw.png",
    span: "",
  },
  {
    id: 4,
    label: "Landscaping",
    image: "/images/IMG_5541.jpg",
    span: "",
  },
  {
    id: 5,
    label: "Sod Installation",
    image: "/images/sod-installation.png",
    span: "",
  },
  {
    id: 6,
    label: "Paver Walkway",
    image: "/images/walkway-front-house.png",
    span: "md:col-span-2",
  },
  {
    id: 7,
    label: "Snow Removal",
    image: "/images/snow-removal-truck.png",
    span: "",
  },
  {
    id: 8,
    label: "Fall Cleanup",
    image: "/images/IMG_7394-preview.jpg",
    span: "",
  },
  {
    id: 9,
    label: "Hardscaping",
    image: "/images/IMG_6448.jpg",
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes={
                  item.span.includes("col-span-2")
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 100vw, 25vw"
                }
              />

              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <p className="text-white text-sm sm:text-base font-heading font-semibold drop-shadow-lg">
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
