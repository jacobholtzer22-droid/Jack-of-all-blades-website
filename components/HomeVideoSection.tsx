"use client";

import { useRef } from "react";
import { useAutoplayBackgroundVideo } from "@/lib/useAutoplayBackgroundVideo";

export default function HomeVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { useStaticCover } = useAutoplayBackgroundVideo(videoRef, {
    rootMargin: "0px 0px 40% 0px",
  });

  return (
    <section
      className="relative aspect-[9/16] sm:aspect-video max-h-[70vh] w-full overflow-hidden border-y border-forest-900/30"
      aria-hidden
    >
      <div className="absolute inset-0 bg-dark-950">
        {useStaticCover ? (
          <img
            src="/images/front-yard-patio-hardscape.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="autoplay-bg-video absolute inset-0 h-full w-full object-cover"
            aria-hidden
          >
            <source src="/videos/home-bottom.mp4" type="video/mp4" />
            <source src="/videos/home-bottom.MOV" type="video/quicktime" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
