"use client";

import { useEffect, useRef } from "react";

export default function HomeVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
      className="relative aspect-[9/16] sm:aspect-video max-h-[70vh] w-full overflow-hidden border-y border-forest-900/30"
      aria-hidden
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="autoplay-bg-video absolute inset-0 w-full h-full object-cover"
        poster="/images/IMG_5510.webp"
      >
        <source src="/videos/home-bottom.mp4" type="video/mp4" />
        <source src="/videos/home-bottom.MOV" type="video/quicktime" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
