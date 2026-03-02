"use client";

const BOOKING_IFRAME_SRC =
  "https://alignandacquire.com/book/jack-of-all-blades-landscaping-1772384571153/embed";
const BOOKING_LINK_URL =
  "https://alignandacquire.com/book/jack-of-all-blades-landscaping-1772384571153";

export default function ContactContent() {
  return (
    <section className="relative pb-24 sm:pb-32 overflow-hidden border-t border-forest-900/30">
      <div className="absolute inset-0 bg-earthy-900" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="w-full max-w-4xl min-w-0 mx-auto">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6 text-center">
            Schedule a Free In-Person Quote
          </h2>

          <div
            className="booking-embed-container w-full min-w-0 overflow-auto rounded-2xl border border-dark-600/20 bg-dark-800/30"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <iframe
              src={BOOKING_IFRAME_SRC}
              width="100%"
              height={800}
              frameBorder={0}
              style={{ width: "100%", minHeight: 800, border: "none" }}
              title="Schedule a Free In-Person Quote"
              loading="eager"
              scrolling="yes"
              allow="geolocation; microphone; camera; payment"
            />
          </div>
          <a
            href={BOOKING_LINK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden mt-3 block text-center text-dark-400 hover:text-forest-400 text-sm transition-colors"
          >
            Having trouble? Tap here to book directly
          </a>
        </div>
      </div>
    </section>
  );
}
