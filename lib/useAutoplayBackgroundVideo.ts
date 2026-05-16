import { type RefObject, useEffect, useState } from "react";

/**
 * Muted background clips: satisfy mobile autoplay policies, retry when the
 * element scrolls into view, and fall back to a static cover (no <video>) when
 * playback cannot start so iOS/WebKit never shows the inline play overlay.
 */
export function useAutoplayBackgroundVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  options?: { rootMargin?: string }
): { useStaticCover: boolean } {
  const [useStaticCover, setUseStaticCover] = useState(false);

  useEffect(() => {
    if (useStaticCover) return;

    const video = videoRef.current;
    if (!video) return;

    const rootMargin = options?.rootMargin ?? "0px 0px 25% 0px";
    let cancelled = false;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;
    let fallbackScheduled = false;

    const clearFallback = () => {
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
        fallbackTimer = undefined;
      }
      fallbackScheduled = false;
    };

    /**
     * If autoplay keeps failing, swap to a plain image (no native play UI).
     * Only schedule once until playback starts — repeated tryPlay() must not
     * reset the timer (canplay/loadeddata fire often).
     */
    const scheduleStaticIfStillPaused = (ms: number) => {
      if (fallbackScheduled) return;
      fallbackScheduled = true;
      fallbackTimer = setTimeout(() => {
        fallbackScheduled = false;
        fallbackTimer = undefined;
        if (cancelled) return;
        if (video.error) {
          setUseStaticCover(true);
          return;
        }
        if (video.paused) {
          setUseStaticCover(true);
        }
      }, ms);
    };

    const prepare = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
    };

    const tryPlay = () => {
      prepare();
      void video
        .play()
        .then(() => {
          clearFallback();
        })
        .catch(() => {
          const ms = video.readyState >= 2 ? 900 : 5200;
          scheduleStaticIfStillPaused(ms);
        });
    };

    const onPlaying = () => {
      clearFallback();
    };

    const onError = () => {
      if (cancelled) return;
      clearFallback();
      setUseStaticCover(true);
    };

    prepare();
    tryPlay();

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    document.addEventListener("visibilitychange", onVisibility);

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                if (video.readyState === 0) {
                  video.load();
                }
                tryPlay();
                break;
              }
            },
            { root: null, rootMargin, threshold: 0.01 }
          )
        : null;

    observer?.observe(video);

    return () => {
      cancelled = true;
      clearFallback();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("visibilitychange", onVisibility);
      observer?.disconnect();
    };
  }, [videoRef, options?.rootMargin, useStaticCover]);

  return { useStaticCover };
}
