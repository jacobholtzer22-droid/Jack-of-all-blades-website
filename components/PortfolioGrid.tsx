"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";

const categories = [
  "All",
  "Before & After",
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
  | {
      type: "before-after";
      beforeImage: string;
      afterImage: string;
      beforeAlt: string;
      afterAlt: string;
    }
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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      const el = document.fullscreenElement;
      setIsFullscreen(!!el && el === containerRef.current);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void;
    };
    const anyEl = el as HTMLElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };

    try {
      if (document.fullscreenElement === el) {
        await (document.exitFullscreen?.() ?? doc.webkitExitFullscreen?.());
      } else {
        await (el.requestFullscreen?.() ?? anyEl.webkitRequestFullscreen?.());
      }
    } catch {
      // ignore fullscreen errors (gesture restrictions, unsupported browsers)
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-0 ${className ?? ""}`}
      style={style}
    >
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
          toggleFullscreen();
        }}
        className="absolute top-3 right-3 z-30 inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/25 hover:bg-black/70 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
        aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5" />
        ) : (
          <Maximize2 className="w-5 h-5" />
        )}
      </button>
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

type LightboxImage = { src: string; alt: string; rotate?: number };

function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  if (!img) return null;

  const isQuarterTurn = img.rotate === 90 || img.rotate === -90;
  const rotateClass =
    img.rotate === 90 ? "rotate-90" : img.rotate === -90 ? "-rotate-90" : "";
  const hasMultiple = images.length > 1;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) < 40 || !hasMultiple) return;
        if (dx > 0) onPrev();
        else onNext();
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 opacity-100 transition-opacity duration-200 motion-reduce:transition-none"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close full-size view"
        className="absolute top-4 right-4 z-[102] inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
      >
        <X className="w-6 h-6" />
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-[102] inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-[102] inline-flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Plain img so rotated (imageRotate) photos can be shown fully and
            correctly oriented via swapped max-dimensions; next/image fill
            cannot fit a CSS-rotated element without cropping.
            eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.src}
          alt={img.alt}
          draggable={false}
          className={`select-none object-contain [image-orientation:from-image] ${rotateClass}`}
          style={
            isQuarterTurn
              ? { maxWidth: "90vh", maxHeight: "95vw" }
              : { maxWidth: "95vw", maxHeight: "90vh" }
          }
        />
      </div>

      <p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[102] max-w-[90vw] text-center text-white/90 text-sm bg-black/50 backdrop-blur-sm rounded-full px-4 py-1.5 pointer-events-none"
        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
      >
        {img.alt}
      </p>
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
    // Tall right column so the 2×2 hero + two stacked tiles pack without a grid hole
    span: "md:row-span-2",
  },
  {
    id: 4,
    type: "image",
    label: "Retaining Wall & Patio",
    alt: "Front yard brick patio with stone retaining wall and flowering tree Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/front-yard-patio-hardscape.webp",
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
    span: "",
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
  {
    id: 22,
    type: "before-after",
    label: "Hot Tub Paver Pad",
    alt: "Hot tub paver pad before and after installation Grand Rapids Michigan",
    category: "Before & After",
    beforeImage: "/images/hot-tub-paver-before.webp",
    afterImage: "/images/hot-tub-paver-after.webp",
    beforeAlt: "Paver pad mid-installation alongside hot tub",
    afterAlt: "Completed paver pad alongside hot tub",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 23,
    type: "before-after",
    label: "Backyard Paver Patio",
    alt: "Backyard paver patio before and after Grand Rapids Michigan",
    category: "Before & After",
    beforeImage: "/images/backyard-paver-install-during.webp",
    afterImage: "/images/backyard-paver-install-progress.webp",
    beforeAlt: "Backyard paver patio installation in progress",
    afterAlt: "Backyard paver patio nearing completion",
    span: "md:col-span-2",
  },
  {
    id: 24,
    type: "image",
    label: "Mulch Bed & Plantings",
    alt: "Fresh mulch bed with new plantings along brick fence Grand Rapids MI",
    category: "Landscaping",
    image: "/images/mulch-bed-brick-fence.webp",
    span: "md:col-span-2",
  },
  {
    id: 25,
    type: "image",
    label: "Boulevard Sod Install",
    alt: "Sod installation on parkway boulevard Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/sod-installation-boulevard.webp",
    span: "",
  },
  {
    id: 26,
    type: "image",
    label: "Driveway Paver Addition",
    alt: "Driveway paver addition installation Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/paver-walkway-finishing.webp",
    span: "",
  },
  {
    id: 27,
    type: "image",
    label: "Fresh Lawn & Garden Bed",
    alt: "Newly installed sod and mulched garden bed Grand Rapids Michigan",
    category: "Landscaping",
    image: "/images/landscape-bed-fresh-lawn.webp",
    span: "md:col-span-2",
  },
  {
    id: 28,
    type: "image",
    label: "Timber Retaining Wall",
    alt: "Timber retaining wall with stone border and fresh plantings Grand Rapids MI",
    category: "Hardscaping",
    image: "/images/retaining-wall-stones-plants.webp",
    span: "",
  },
  {
    id: 29,
    type: "image",
    label: "Front Yard Landscape",
    alt: "Front yard landscape design with mulch, plants and boulders Grand Rapids Michigan",
    category: "Landscaping",
    image: "/images/front-yard-landscape-sign.webp",
    span: "",
  },
  {
    id: 30,
    type: "image",
    label: "Striped Lawn Care",
    alt: "Zero-turn mowers on professionally striped residential lawn Grand Rapids Michigan",
    category: "Lawn Care",
    image: "/images/IMG_0545.png",
    span: "md:col-span-2",
  },
];

export default function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Flat list of expandable photos (videos excluded; before/after → two
  // entries). itemStart / itemAfterStart map a tile to its lightbox index.
  const { lightboxImages, itemStart, itemAfterStart } = useMemo(() => {
    const imgs: LightboxImage[] = [];
    const start: Record<number, number> = {};
    const afterStart: Record<number, number> = {};
    for (const item of filteredItems) {
      if (item.type === "image") {
        start[item.id] = imgs.length;
        imgs.push({ src: item.image, alt: item.alt, rotate: item.imageRotate });
      } else if (item.type === "before-after") {
        start[item.id] = imgs.length;
        imgs.push({ src: item.beforeImage, alt: item.beforeAlt });
        afterStart[item.id] = imgs.length;
        imgs.push({ src: item.afterImage, alt: item.afterAlt });
      }
    }
    return { lightboxImages: imgs, itemStart: start, itemAfterStart: afterStart };
  }, [filteredItems]);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(
    () =>
      setLightboxIndex((v) =>
        v === null ? v : (v - 1 + lightboxImages.length) % lightboxImages.length
      ),
    [lightboxImages.length]
  );
  const showNext = useCallback(
    () =>
      setLightboxIndex((v) =>
        v === null ? v : (v + 1) % lightboxImages.length
      ),
    [lightboxImages.length]
  );

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
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:auto-rows-[minmax(220px,auto)]">
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
                  ? "aspect-video min-h-[220px]"
                  : item.type === "before-after"
                    ? item.span.includes("row-span-2") &&
                      activeCategory === "All"
                      ? "min-h-[420px]"
                      : "min-h-[320px] sm:min-h-[300px]"
                    : item.span.includes("row-span-2") && activeCategory === "All"
                      ? "min-h-[420px]"
                      : "min-h-[300px] sm:min-h-[260px] md:min-h-[220px]"
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {item.type === "video" ? (
                <PortfolioVideo
                  item={item}
                  className="absolute inset-0 z-10"
                />
              ) : item.type === "before-after" ? (
                <div className="absolute inset-0 grid grid-cols-2">
                  <div className="relative overflow-hidden border-r-2 border-white/40">
                    <Image
                      src={item.beforeImage}
                      alt={item.beforeAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 [image-orientation:from-image]"
                      sizes={
                        item.span.includes("col-span-2")
                          ? "(max-width: 768px) 50vw, 25vw"
                          : "(max-width: 768px) 50vw, 12.5vw"
                      }
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      className="absolute top-3 left-3 z-[2] inline-block text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-black/65 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
                    >
                      Before
                    </span>
                    <button
                      type="button"
                      onClick={() => openLightbox(itemStart[item.id])}
                      aria-label={`View ${item.beforeAlt} full size`}
                      className="absolute inset-0 z-[3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
                    />
                  </div>
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.afterImage}
                      alt={item.afterAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 [image-orientation:from-image]"
                      sizes={
                        item.span.includes("col-span-2")
                          ? "(max-width: 768px) 50vw, 25vw"
                          : "(max-width: 768px) 50vw, 12.5vw"
                      }
                      quality={75}
                      placeholder="blur"
                      blurDataURL={BLUR_DATA_URL}
                      loading="lazy"
                      decoding="async"
                    />
                    <span
                      className="absolute top-3 right-3 z-[2] inline-block text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-forest-600/90 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20"
                      style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
                    >
                      After
                    </span>
                    <button
                      type="button"
                      onClick={() => openLightbox(itemAfterStart[item.id])}
                      aria-label={`View ${item.afterAlt} full size`}
                      className="absolute inset-0 z-[3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
                    />
                  </div>
                </div>
              ) : (
                <>
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
                  <button
                    type="button"
                    onClick={() => openLightbox(itemStart[item.id])}
                    aria-label={`View ${item.label} full size`}
                    className="absolute inset-0 z-[3] cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
                  />
                </>
              )}

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

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </section>
  );
}
