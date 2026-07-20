/**
 * Google Ads conversion tracking helpers.
 *
 * The gtag.js base tag (AW-17985764273) is installed once, site-wide, in
 * app/layout.tsx. Never load gtag.js from here — a second base tag would
 * double-count every conversion.
 */

/** Conversion label for the "Contact Form Submit" action. */
const CONTACT_FORM_SEND_TO = "AW-17985764273/EQgXCO2Jos4cELH3o4BD";

/** Conversion label for the "Click to Call" action (tel: link taps). */
const CLICK_TO_CALL_SEND_TO = "AW-17985764273/JHZXCM-85NMcELH3o4BD";

/**
 * Sends a Google Ads conversion event.
 *
 * Safe to call from anywhere: it no-ops during SSR and whenever gtag.js has
 * not loaded (ad blocker, offline, slow network), and it never throws — a
 * tracking failure must never surface to the user or block navigation.
 */
function fireConversion(sendTo: string): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", "conversion", { send_to: sendTo });
  } catch {
    // Swallow: analytics is never allowed to surface an error to the user.
  }
}

/**
 * Fires the Google Ads "Contact Form Submit" conversion.
 *
 * Call this ONLY after the backend confirms success. Callers are responsible
 * for firing it at most once per submission.
 */
export function trackFormConversion(): void {
  fireConversion(CONTACT_FORM_SEND_TO);
}

/**
 * Fires the Google Ads "Click to Call" conversion.
 *
 * Wired up globally by <CallClickTracker />, which delegates from document to
 * any a[href^="tel:"]. Do not call this from individual components.
 */
export function trackCallClick(): void {
  fireConversion(CLICK_TO_CALL_SEND_TO);
}

/*
 * TODO: Enhanced Conversions for Leads (deliberately not implemented).
 *
 * Enabling it requires an account-side step that cannot be done in code:
 * Google Ads > Summary > Conversions > "Contact Form Submit" > turn on
 * Enhanced conversions for leads and accept the customer-data terms. Until
 * that is on, sending user data here would transmit customer PII to Google
 * with zero measurement benefit, so it is intentionally left off.
 *
 * Once enabled, add a `gtag("set", "user_data", {...})` call immediately
 * before the conversion event above, passing the email and an E.164-
 * normalized phone (+1XXXXXXXXXX). gtag hashes both with SHA-256 in the
 * browser before transmission. This also warrants a privacy-policy review,
 * since it sends customer contact details to Google.
 */
