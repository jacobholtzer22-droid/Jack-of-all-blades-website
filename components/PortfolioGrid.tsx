"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const categories = [
  "All",
  "Landscaping",
  "Hardscaping",
  "Lawn Care",
  "Snow Removal",
];

const galleryItems = [
  {
    id: 1,
    label: "Landscaping Project",
    category: "Landscaping",
    image: "/images/IMG_5541.jpg",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    label: "Patio Installation",
    category: "Hardscaping",
    image: "/images/IMG_6756.jpg",
    span: "",
  },
  {
    id: 3,
    label: "Lawn Maintenance",
    category: "Lawn Care",
    image: "/images/IMG_5510.jpg",
    span: "",
  },
  {
    id: 4,
    label: "Retaining Wall & Patio",
    category: "Hardscaping",
    image: "/images/IMG_6448.jpg",
    span: "",
  },
  {
    id: 5,
    label: "Garden Bed Design",
    category: "Landscaping",
    image: "/images/IMG_4267.jpg",
    span: "",
  },
  {
    id: 6,
    label: "Walkway Installation",
    category: "Hardscaping",
    image: "/images/walkway-front-house.png",
    span: "md:col-span-2",
  },
  {
    id: 7,
    label: "Fall Cleanup",
    category: "Lawn Care",
    image: "/images/IMG_7394-preview.jpg",
    span: "",
  },
  {
    id: 8,
    label: "Hedge Trimming & Mulch",
    category: "Landscaping",
    image: "/images/IMG_4937.jpg",
    span: "",
  },
  {
    id: 9,
    label: "Snow Plowing",
    category: "Snow Removal",
    image: "/images/snow-removal-truck.png",
    span: "",
  },
  {
    id: 10,
    label: "Brick Patio & Landscaping",
    category: "Landscaping",
    image: "/images/IMG_6706.jpg",
    span: "md:col-span-2",
  },
  {
    id: 11,
    label: "Paver Patio with Seating",
    category: "Hardscaping",
    image: "/images/paver-patio-seating.png",
    span: "",
  },
  {
    id: 12,
    label: "Residential Lawn Care",
    category: "Lawn Care",
    image: "/images/IMG_6094.jpg",
    span: "",
  },
  {
    id: 13,
    label: "Sod Installation",
    category: "Lawn Care",
    image: "/images/sod-laying-team.png",
    span: "md:col-span-2",
  },
  {
    id: 14,
    label: "Waterfront Property",
    category: "Lawn Care",
    image: "/images/FullSizeRender.jpg",
    span: "",
  },
  {
    id: 15,
    label: "Commercial Mowing",
    category: "Lawn Care",
    image: "/images/IMG_6102.jpg",
    span: "",
  },
  {
    id: 16,
    label: "Paver Walkway & Patio",
    category: "Hardscaping",
    image: "/images/IMG_4429.jpg",
    span: "",
  },
  {
    id: 17,
    label: "Backyard Patio",
    category: "Hardscaping",
    image: "/images/IMG_5386.jpg",
    span: "",
  },
  {
    id: 18,
    label: "Commercial Property Maintenance",
    category: "Lawn Care",
    image: "/images/IMG_6887-preview.jpg",
    span: "md:col-span-2",
  },
  {
    id: 19,
    label: "Residential Mowing",
    category: "Lawn Care",
    image: "/images/IMG_5733.jpg",
    span: "",
  },
  {
    id: 20,
    label: "Tree Removal",
    category: "Landscaping",
    image: "/images/tree-removal-truck.png",
    span: "",
  },
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

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
  }, [activeCategory]);

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="absolute inset-0 bg-dark-950" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-forest-600 text-white"
                  : "bg-dark-800/40 border border-dark-600/20 text-dark-200 hover:border-forest-600/30 hover:text-forest-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              className={`group relative rounded-2xl overflow-hidden border border-dark-600/20 hover:border-forest-600/30 transition-all duration-500 opacity-0 ${
                activeCategory === "All" ? item.span : ""
              } ${item.span.includes("row-span-2") && activeCategory === "All" ? "min-h-[400px]" : "min-h-[220px]"}`}
              style={{ animationDelay: `${i * 0.06}s` }}
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
                <span className="inline-block text-forest-300 text-xs mt-1 bg-dark-900/60 backdrop-blur-sm rounded-full px-3 py-1">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
