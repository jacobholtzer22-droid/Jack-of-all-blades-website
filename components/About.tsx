"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Shield, Star, Award } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";

const badges = [
  { icon: Shield, label: "Fully Bonded" },
  { icon: Star, label: "Reliable & Trustworthy" },
  { icon: Award, label: "Professional & Experienced" },
];

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark-950" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-forest-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="reveal opacity-0 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/front-yard-patio-hardscape.webp"
                  alt="Brick paver patio with stone retaining wall and steps, hardscape installation by Jack of All Blades Landscaping in Grand Rapids MI"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-forest-700/20 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-forest-500/30 rounded-tl-xl" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold-500/30 rounded-br-xl" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="reveal opacity-0">
              <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                Our Story
              </span>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-8 tracking-tight">
                Built from the{" "}
                <span className="text-forest-400">ground up</span>
              </h2>
            </div>

            <div className="reveal opacity-0" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4 text-dark-200 leading-relaxed text-[15px] sm:text-base mb-10">
                <p>
                  My name is Mike Hazzard and I am the founder of Jack of All
                  Blades Landscaping. I started the business when I was 16, and
                  learned from a young age what hard work can do!
                </p>
                <p>
                  Ever since then I&apos;ve had a passion for running my business
                  and helping each and all of my clients. Here we believe in
                  performing as highly as our team can, giving it our all.
                </p>
                <p>
                  Specializing our services to satisfy all of our customers and
                  leave each client with a great experience. Our staff is built
                  of hard working men who are built off consistency, respect and
                  determination to do all things the right way.
                </p>
                <p className="text-forest-400 font-semibold text-lg font-heading">
                  Man-made excellence.
                </p>
              </div>
            </div>

            <div
              className="reveal opacity-0 grid grid-cols-1 sm:grid-cols-3 gap-4"
              style={{ animationDelay: "0.4s" }}
            >
              {badges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center gap-3 bg-dark-800/40 border border-dark-600/20 rounded-xl px-4 py-3"
                  >
                    <Icon size={20} className="text-gold-400 flex-shrink-0" />
                    <span className="text-dark-100 text-sm font-medium">
                      {badge.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
