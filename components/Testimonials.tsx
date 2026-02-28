"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Barb W.",
    text: "Jack of All Blades is owned by Michael Hazzard, who is an energetic, enterprising young man in year 3 of his thriving business which includes landscaping, hardscaping and snowplow services. He and his crew are punctual, reliable and attend to the details when servicing your property. Michael built a beautiful patio in my front yard and another in the back as a platform to hold my raised planters. Both were affordable, well done and completed quickly and on schedule. My yard and landscaping are done completely and on time. Several times, Michael has contacted me directly for feedback on how he and his crew are doing. He aims to please! I highly recommend Jack of All Blades for the care and maintenance of your property year round.",
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

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
      { threshold: 0.15 }
    );

    const children = sectionRef.current?.querySelectorAll(".reveal");
    children?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-950/15 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto section-padding">
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block reveal opacity-0">
            Testimonials
          </span>
          <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight reveal opacity-0">
            What Our Clients Say
          </h2>
        </div>

        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="reveal opacity-0 relative bg-dark-800/30 border border-dark-600/20 rounded-3xl p-8 sm:p-12 lg:p-16"
          >
            {/* Quote mark */}
            <div className="absolute top-6 left-6 sm:top-8 sm:left-10">
              <Quote
                size={48}
                className="text-forest-600/20"
                strokeWidth={1}
              />
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-8">
              {Array.from({ length: testimonial.rating }).map((_, j) => (
                <Star
                  key={j}
                  size={22}
                  className="text-gold-400 fill-gold-400"
                />
              ))}
            </div>

            <blockquote className="text-dark-100 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light mb-10">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest-900/40 border border-forest-700/20 flex items-center justify-center">
                <span className="font-heading font-bold text-forest-400">
                  {testimonial.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-heading font-semibold text-white text-lg">
                  {testimonial.name}
                </div>
                <div className="text-dark-300 text-sm">Satisfied Customer</div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-forest-500/20 to-transparent" />
          </div>
        ))}

        {/* Space for more testimonials */}
        <p className="text-center text-dark-500 text-sm mt-8">
          {/* Add more testimonials here as they come in */}
        </p>
      </div>
    </section>
  );
}
