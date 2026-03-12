"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";

const categories = [
  "All",
  "Landscaping",
  "Hardscaping",
  "Lawn Care",
  "Snow Removal",
  "Videos",
];

type GalleryItem = {
  id: number;
  label: string;
  alt: string;
  category: string;
  span: string;
  imageRotate?: number;
  objectPosition?: string;
} & (
  | { type: "image"; image: string }
  | { type: "video"; video: string; sources?: { src: string; type: string }[] }
);

function PortfolioVideo({
  item,
  className,
  style,
}: {
  item: Extract<GalleryItem, { type: "video" }>;
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  return (
    <div className={`relative w-full h-full min-h-0 ${className ?? ""}`} style={style}>
      <video
        ref={videoRef}
        src={item.video}
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-black"
        style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
        preload="auto"
        aria-label={item.alt}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
      >
        {item.sources?.length
          ? item.sources.map((s, idx) => (
              <source key={idx} src={s.src} type={s.type} />
            ))
          : null}
      </video>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePlay();
        }}
        className="absolute inset-0 flex items-center justify-center z-20 transition-opacity duration-200 hover:opacity-90 focus:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 rounded-2xl"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        <span
          className={`flex items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm border-2 border-white/30 transition-transform duration-200 hover:scale-105 flex-shrink-0 ${
            isPlaying ? "w-12 h-12 sm:w-14 sm:h-14" : "w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
          ) : (
            <Play className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 ml-0.5" fill="currentColor" />
          )}
        </span>
      </button>
    </div>
  );
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    label: "Landscaping Project",
    alt: "Professional landscaping project completed in Grand Rapids Michigan",
    category: "Landscaping",
    image: "/images/IMG_5733.webp",
    span: "md:col-span-2 md:row-span-2",
    imageRotate: 90,
  },
  {
    id: 2,
    type: "image",
    label: "Patio Installation",
    alt: "Custom paver patio installation by Jack of All Blades Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/IMG_6448.webp",
    span: "",
  },
  {
    id: 3,
    type: "image",
    label: "Lawn Maintenance",
    alt: "Weekly lawn mowing and maintenance service Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/IMG_5510.webp",
    span: "",
  },
  {
    id: 4,
    type: "image",
    label: "Retaining Wall & Patio",
    alt: "Retaining wall and patio construction Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/IMG_6756.webp",
    span: "",
  },
  {
    id: 21,
    type: "video",
    label: "Before and After",
    alt: "Before and after landscaping transformation",
    category: "Videos",
    video: "/videos/Before-and-after.MOV",
    span: "md:col-span-2",
  },
  {
    id: 5,
    type: "image",
    label: "Garden Bed Design",
    alt: "Custom garden bed design and planting Grand Rapids Michigan",
    category: "Landscaping",
    image: "/images/IMG_5541.webp",
    span: "",
  },
  {
    id: 6,
    type: "image",
    label: "Walkway Installation",
    alt: "Paver walkway installation at residential home Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/walkway-front-house.webp",
    span: "md:col-span-2",
    imageRotate: 90,
  },
  {
    id: 7,
    type: "image",
    label: "Fall Cleanup",
    alt: "Fall yard cleanup and leaf removal service Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/IMG_7394-preview.webp",
    span: "",
  },
  {
    id: 8,
    type: "image",
    label: "Hedge Trimming & Mulch",
    alt: "Hedge trimming and mulch installation Grand Rapids MI",
    category: "Landscaping",
    image: "/images/tree-trimming-chainsaw.webp",
    span: "",
  },
  {
    id: 9,
    type: "image",
    label: "Snow Plowing",
    alt: "Snow plowing and removal service Grand Rapids Michigan",
    category: "Snow Removal",
    image: "/images/snow-removal-truck.webp",
    span: "",
  },
  {
    id: 10,
    type: "image",
    label: "Brick Patio & Landscaping",
    alt: "Brick patio and surrounding landscape design Grand Rapids MI",
    category: "Landscaping",
    image: "/images/paver-patio-seating.webp",
    span: "md:col-span-2",
  },
  {
    id: 11,
    type: "image",
    label: "Paver Patio Installation",
    alt: "Professional paver patio installation Grand Rapids Michigan",
    category: "Hardscaping",
    image: "/images/mike-paver-patio.webp",
    span: "",
    imageRotate: 90,
    objectPosition: "top",
  },
  {
    id: 12,
    type: "image",
    label: "Residential Lawn Care",
    alt: "Residential lawn care and mowing service Grand Rapids MI",
    category: "Lawn Care",
    image: "/images/IMG_6094.webp",
    span: "",
    imageRotate: 90,
  },
  {
    id: 13,
    type: "image",
    label: "Sod Installation",
    alt: "Professional sod installation and new lawn service Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/sod-laying-team.webp",
    span: "md:col-span-2",
  },
  {
    id: 15,
    type: "image",
    label: "Commercial Mowing",
    alt: "Commercial property mowing and lawn care Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/IMG_6102.webp",
    span: "",
    imageRotate: 90,
  },
  {
    id: 16,
    type: "image",
    label: "Paver Walkway & Patio",
    alt: "Paver walkway and patio hardscape project Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/IMG_6706.webp",
    span: "",
    imageRotate: 90,
  },
  {
    id: 17,
    type: "image",
    label: "Backyard Patio",
    alt: "Backyard patio installation and hardscaping Grand Rapids Michigan",
    category: "Hardscaping",
    image: "/images/happy-customer-patio.webp",
    span: "",
    objectPosition: "top",
  },
  {
    id: 18,
    type: "image",
    label: "Commercial Property Maintenance",
    alt: "Commercial property landscape maintenance Grand Rapids MI",
    category: "Lawn Care",
    image: "/images/sod-installation.webp",
    span: "md:col-span-2",
  },
  {
    id: 19,
    type: "image",
    label: "Residential Mowing",
    alt: "Residential lawn mowing service Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/IMG_6098.webp",
    span: "",
    imageRotate: 90,
  },
  {
    id: 20,
    type: "image",
    label: "Tree Removal",
    alt: "Tree removal and stump grinding service Grand Rapids MI",
    category: "Landscaping",
    image: "/images/tree-removal-truck.webp",
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
    <section className="relative pb-24 sm:pb-32 border-t border-forest-900/30">
      <div className="absolute inset-0 bg-earthy-800" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all min-h-[44px] ${
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
              } ${
                item.type === "video"
                  ? "aspect-video min-h-[200px]"
                  : item.span.includes("row-span-2") && activeCategory === "All"
                    ? "min-h-[400px]"
                    : "min-h-[220px]"
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {item.type === "video" ? (
                <PortfolioVideo
                  item={item}
                  className="absolute inset-0 z-10"
                />
              ) : (
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className={`object-cover transition-transform duration-700 group-hover:scale-105 [image-orientation:from-image] ${item.imageRotate === 90 ? "rotate-90" : item.imageRotate === -90 ? "-rotate-90" : item.imageRotate === 45 ? "rotate-45" : item.imageRotate === -45 ? "-rotate-45" : item.imageRotate === 15 ? "rotate-[15deg]" : ""} ${item.objectPosition === "top" ? "object-top" : ""}`}
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
              )}

              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/85 via-black/55 to-black/20 pointer-events-none" />

              <div className="absolute bottom-0 left-0 right-0 z-[2] p-4 sm:p-5 pointer-events-none">
                <p className="text-white text-sm sm:text-base font-heading font-bold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                  {item.label}
                </p>
                <span className="inline-block text-white/90 text-xs mt-1 font-semibold bg-black/50 backdrop-blur-sm rounded-full px-3 py-1" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}>
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
