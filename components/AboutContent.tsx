"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Shield, Star, Award, Users, Clock, Target } from "lucide-react";

const badges = [
  { icon: Shield, label: "Fully Bonded" },
  { icon: Star, label: "Reliable & Trustworthy" },
  { icon: Award, label: "Professional & Experienced" },
];

const values = [
  {
    icon: Target,
    title: "Consistency",
    description:
      "We show up on time, every time. Your property gets the same level of care and attention at every visit.",
  },
  {
    icon: Users,
    title: "Respect",
    description:
      "We treat every client's property like our own and communicate openly throughout every project.",
  },
  {
    icon: Clock,
    title: "Determination",
    description:
      "We don't cut corners. Every job gets done the right way, no matter how big or small.",
  },
];

export default function AboutContent() {
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
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-forest-950/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 sm:mb-32">
          <div className="reveal opacity-0">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <Image
                  src="/images/tree-trimming-chainsaw.png"
                  alt="Mike Hazzard, founder of Jack of All Blades Landscaping"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-forest-700/20 rounded-2xl -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-forest-500/30 rounded-tl-xl" />
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-gold-500/30 rounded-br-xl" />
            </div>
          </div>

          <div>
            <div className="reveal opacity-0">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-8 tracking-tight">
                Meet <span className="text-forest-400">Mike Hazzard</span>
              </h2>
            </div>

            <div
              className="reveal opacity-0 space-y-5 text-dark-200 leading-relaxed text-[15px] sm:text-base"
              style={{ animationDelay: "0.2s" }}
            >
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
                leave each client with a great experience. Our staff is built of
                hard working men who are built off consistency, respect and
                determination to do all things the right way.
              </p>
              <p className="text-forest-400 font-semibold text-xl font-heading !mt-8">
                Man-made excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="reveal opacity-0 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 sm:mb-32">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.label}
                className="flex items-center gap-4 bg-dark-800/40 border border-dark-600/20 rounded-xl px-6 py-5"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-gold-400" />
                </div>
                <span className="text-white font-heading font-semibold text-lg">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <span className="reveal opacity-0 text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            What Drives Us
          </span>
          <h2 className="reveal opacity-0 font-heading font-bold text-3xl sm:text-4xl text-white tracking-tight">
            Our Core Values
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="reveal opacity-0 text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-forest-900/40 border border-forest-700/20 flex items-center justify-center mx-auto mb-5">
                  <Icon size={30} className="text-forest-400" />
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-dark-200 leading-relaxed text-[15px]">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
