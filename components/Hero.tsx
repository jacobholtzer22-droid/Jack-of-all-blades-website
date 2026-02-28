import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden animate-fade-in">
      <Image
        src="/images/IMG_5510.jpg"
        alt="Professional lawn care and landscaping in Grand Rapids Michigan"
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={85}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
      />
      <div className="absolute inset-0 bg-dark-950/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-transparent to-dark-950/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-900/20 via-transparent to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center section-padding py-20">
        <div className="inline-flex items-center gap-2 border border-forest-700/40 bg-forest-900/20 backdrop-blur-sm rounded-full px-5 py-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-forest-400 animate-pulse" />
          <span className="text-forest-300 text-sm font-medium tracking-wide">
            Grand Rapids, Michigan
          </span>
        </div>

        <h1 className="font-heading font-900 text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-4">
          <span className="text-white drop-shadow-lg">Landscaping & Lawn Care</span>
          <br />
          <span className="text-white drop-shadow-lg">Services in </span>
          <span className="bg-gradient-to-r from-forest-400 via-forest-500 to-forest-400 bg-clip-text text-transparent">
            Grand Rapids, MI
          </span>
        </h1>

        <p className="text-forest-400 text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-6 drop-shadow-md tracking-tight">
          Man Made Excellence
        </p>

        <p className="text-dark-100 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto mb-4 font-light leading-relaxed drop-shadow-md">
          Premium landscaping, hardscaping & lawn care that transforms your
          outdoor space into something extraordinary.
        </p>

        <p className="text-dark-200 text-base mb-10 font-medium drop-shadow-md">
          Jack of All Blades Landscaping
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:6162508044"
            className="group flex items-center gap-3 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-forest-600/30 hover:-translate-y-0.5"
          >
            <Phone size={20} className="group-hover:animate-pulse" />
            Get a Free Estimate
          </a>
          <Link
            href="/portfolio"
            className="group flex items-center gap-3 border border-white/30 hover:border-gold-500/50 text-white hover:text-gold-400 px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 hover:bg-white/5 backdrop-blur-sm"
          >
            View Our Work
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12 text-dark-200">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white drop-shadow-md">
              8+
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1">
              Years Experience
            </div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white drop-shadow-md">
              6
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1">
              Core Services
            </div>
          </div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white drop-shadow-md">
              100%
            </div>
            <div className="text-xs sm:text-sm uppercase tracking-wider mt-1">
              Satisfaction
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
