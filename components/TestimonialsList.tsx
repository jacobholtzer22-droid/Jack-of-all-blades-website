"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Barb W.",
    text: "Jack of All Blades is owned by Michael Hazzard, who is an energetic, enterprising young man in year 3 of his thriving business which includes landscaping, hardscaping and snowplow services. He and his crew are punctual, reliable and attend to the details when servicing your property. Michael built a beautiful patio in my front yard and another in the back as a platform to hold my raised planters. Both were affordable, well done and completed quickly and on schedule. My yard and landscaping are done completely and on time. Several times, Michael has contacted me directly for feedback on how he and his crew are doing. He aims to please! I highly recommend Jack of All Blades for the care and maintenance of your property year round.",
    rating: 5,
    service: "Hardscaping & Landscaping",
  },
];

export default function TestimonialsList() {
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
      { threshold: 0.1 }
    );

    const children = sectionRef.current?.querySelectorAll(".reveal");
    children?.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-forest-950/10 via-transparent to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto section-padding">
        {/* Featured testimonial */}
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="reveal opacity-0 relative bg-dark-800/30 border border-dark-600/20 rounded-3xl p-8 sm:p-12 lg:p-16 mb-8"
          >
            <div className="absolute top-6 left-6 sm:top-8 sm:left-10">
              <Quote
                size={48}
                className="text-forest-600/20"
                strokeWidth={1}
              />
            </div>

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

            <div className="flex items-center justify-between flex-wrap gap-4">
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
              <span className="text-dark-400 text-sm bg-dark-800/40 border border-dark-600/20 rounded-full px-4 py-1.5">
                {testimonial.service}
              </span>
            </div>

            <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-forest-500/20 to-transparent" />
          </div>
        ))}

        {/* Placeholder for future testimonials */}
        <div className="reveal opacity-0 grid sm:grid-cols-2 gap-6 mt-12">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className="bg-dark-800/20 border border-dark-600/15 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[200px]"
            >
              <Quote
                size={28}
                className="text-dark-600 mb-3"
                strokeWidth={1}
              />
              <p className="text-dark-400 text-sm font-medium">
                Future Review #{num}
              </p>
              <p className="text-dark-600 text-xs mt-1">
                Add more testimonials as they come in
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
