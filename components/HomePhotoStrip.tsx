"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";

const galleryImages = [
  { src: "/images/mike-paver-patio.webp", alt: "Professional paver patio installation by Jack of All Blades Grand Rapids MI" },
  { src: "/images/paver-patio-seating.webp", alt: "Custom paver patio with seating area Grand Rapids MI" },
  { src: "/images/IMG_5541.webp", alt: "Professional landscaping project Grand Rapids" },
  { src: "/images/IMG_6756.webp", alt: "Custom paver patio installation Grand Rapids Michigan" },
  { src: "/images/sod-laying-team.webp", alt: "Sod installation and lawn setup" },
  { src: "/images/sod-installation.webp", alt: "Fresh sod installation Grand Rapids Michigan" },
  { src: "/images/snow-removal-truck.webp", alt: "Snow removal and plowing Grand Rapids MI" },
  { src: "/images/IMG_6448.webp", alt: "Retaining wall and patio construction Grand Rapids MI" },
];

export default function HomePhotoStrip() {
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
      id="gallery"
      className="relative py-20 sm:py-28 overflow-hidden border-t border-forest-900/30"
    >
      <div className="absolute inset-0 bg-earthy-800" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div className="reveal opacity-0">
            <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
              Portfolio Preview
            </span>
            <h2 className="section-heading-accent section-heading-accent-left font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight pt-2">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="reveal opacity-0 group inline-flex items-center gap-2 text-forest-400 hover:text-forest-300 font-semibold transition-colors shrink-0"
          >
            View All Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* Desktop: 4 columns, 2 rows grid */}
        <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2">
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              className="reveal opacity-0 relative aspect-[4/3] rounded-xl overflow-hidden group"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 [image-orientation:from-image]"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>

        {/* Mobile: horizontal scroll with snap */}
        <div className="md:hidden overflow-x-auto overflow-y-hidden pb-2 -mx-5 px-5 sm:-mx-8 sm:px-8 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-2 w-max">
            {galleryImages.map((img, i) => (
              <div
                key={img.src}
                className="reveal opacity-0 shrink-0 w-[72vw] sm:w-[60vw] aspect-[4/3] rounded-xl overflow-hidden snap-center"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full [image-orientation:from-image]"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
