"use client";

import { useEffect } from "react";
import { trackCallClick } from "@/lib/analytics";

/**
 * Module-scope handler so repeated addEventListener calls with the same
 * (type, listener, capture) triple are no-ops per spec — that is the guard
 * against duplicate registration across re-renders, StrictMode double-mounts,
 * and client-side route changes.
 *
 * Capture phase, so a tel: tap is still counted even if something upstream
 * (e.g. a menu closing on click) stops propagation.
 */
function handleDocumentClick(event: MouseEvent) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  // closest() walks up from the click target, so taps on an icon or span
  // inside the anchor still resolve to the phone link.
  if (!target.closest('a[href^="tel:"]')) return;

  trackCallClick();
}

/**
 * Fires the Google Ads "Click to Call" conversion on any tel: link tap.
 *
 * Delegated from document rather than wrapping each anchor, so it also covers
 * links whose href/number Google's call-tracking number replacement rewrites
 * at runtime, and any phone link added later. Renders nothing.
 */
export default function CallClickTracker() {
  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, []);

  return null;
}
