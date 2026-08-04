"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type Orientation = "landscape" | "vertical";

/**
 * Lightweight YouTube embed (facade / lite-embed pattern).
 *
 * Renders only a thumbnail + play button until the user taps it; the actual
 * youtube-nocookie iframe is injected on click. This keeps the page fast and
 * privacy-friendly (no YouTube cookies/scripts on load) versus dropping a raw
 * iframe on every visit. autoplay=1 is safe here because the iframe only
 * mounts in response to the user's click.
 */
export default function YouTubeFacade({
  id,
  title,
  orientation = "landscape",
}: {
  id: string;
  title: string;
  orientation?: Orientation;
}) {
  const [activated, setActivated] = useState(false);
  const [thumbOk, setThumbOk] = useState(true);
  const aspect = orientation === "vertical" ? "aspect-[9/16]" : "aspect-video";
  const thumbnail = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <div
      className={`relative w-full ${aspect} rounded-2xl overflow-hidden border border-forest-900/30 bg-black shadow-xl shadow-black/40`}
    >
      {activated ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setActivated(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
        >
          {thumbOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              onError={() => setThumbOk(false)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            // Fallback when YouTube has no public thumbnail (e.g. unlisted
            // Shorts): a branded card, never a broken-image icon.
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-earthy-800 via-earthy-900 to-forest-950"
            />
          )}
          <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/20" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30 bg-forest-600/90 text-white transition-transform duration-200 group-hover:scale-105 sm:h-20 sm:w-20">
              <Play className="ml-0.5 h-7 w-7 sm:h-9 sm:w-9" fill="currentColor" />
            </span>
          </span>
          <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-left">
            <span
              className="font-heading text-sm font-semibold text-white sm:text-base"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              {title}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
