"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (el) el.classList.add("animate-fade-in");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      void video.play().catch(() => {});
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="autoplay-bg-video object-cover object-[center_28%] w-full h-full min-h-screen"
          poster="/images/IMG_5510.webp"
          aria-hidden
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.MOV" type="video/quicktime" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-900/20 via-transparent to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center section-padding py-20">
        <div className="inline-flex items-center gap-2 border border-forest-700/40 bg-black/40 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
          <span className="text-white text-sm font-semibold tracking-wide" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
            East Grand Rapids, Michigan
          </span>
        </div>

        <h1 className="font-heading font-900 text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] mb-6">
          <span className="text-white font-bold" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            Man Made
          </span>
          <br />
          <span className="text-white font-bold" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
            Excellence
          </span>
        </h1>

        <p className="text-white text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 font-semibold leading-relaxed" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
          Premium landscaping, hardscaping & lawn care serving East Grand Rapids,
          Grand Rapids & West Michigan.
        </p>

        <p className="text-white/95 text-base mb-10 font-semibold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
          Jack of All Blades Landscaping
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-3 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-forest-600/30 hover:-translate-y-0.5"
          >
            Get a Free Estimate
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <a
            href="tel:6162508044"
            className="group flex items-center gap-3 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl"
          >
            <Phone size={20} className="group-hover:animate-pulse" />
            616-250-8044
          </a>
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl"
          >
            View Our Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-white/90">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-forest-400" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              8+
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1 font-semibold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              Years Experience
            </div>
          </div>
          <div className="w-px h-10 bg-forest-500/40" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-forest-400" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              6
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1 font-semibold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              Core Services
            </div>
          </div>
          <div className="w-px h-10 bg-forest-500/40" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-forest-400" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              100%
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1 font-semibold" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
              Satisfaction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
