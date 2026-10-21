import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";
import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Shared service card used by the homepage Services section and the /services
 * index. The whole card links to the service page (stretched link); the
 * "Get Free Estimate" link sits above it so it stays independently clickable.
 */
const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  function ServiceCard({ service, className = "", style }, ref) {
    const Icon = service.icon;
    const isHedge = service.slug === "hedge-and-bush-trimming";

    return (
      <div
        ref={ref}
        style={style}
        className={`group relative rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-forest-900/20 transition-all duration-500 min-h-[280px] sm:min-h-[320px] ${className}`}
      >
        <Image
          src={service.image}
          alt={service.alt}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 [image-orientation:from-image] ${
            isHedge ? "rotate-90 origin-center scale-[1.15]" : ""
          }`}
          style={isHedge ? { objectPosition: "50% 35%" } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10 p-8 flex flex-col justify-end h-full">
          <div className="w-14 h-14 rounded-xl bg-forest-900/60 backdrop-blur-sm border border-forest-700/30 flex items-center justify-center mb-6 group-hover:bg-forest-800/70 group-hover:border-forest-600/40 transition-all duration-500">
            <Icon
              size={28}
              className="text-forest-400 group-hover:text-forest-300 transition-colors"
            />
          </div>

          <h3
            className="font-heading font-bold text-xl text-white mb-3 group-hover:text-forest-300 transition-colors"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            {service.name}
          </h3>

          <p
            className="text-white/95 leading-relaxed text-[15px] mb-5 font-medium"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
          >
            {service.cardDescription}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/contact"
              className="relative z-20 inline-flex items-center gap-2 text-sm font-semibold text-forest-300 hover:text-forest-200 transition-colors"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              Get Free Estimate
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/services/${service.slug}`}
              aria-label={`Learn more about ${service.name}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white transition-colors after:absolute after:inset-0 after:content-['']"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
            >
              Learn more
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
);

export default ServiceCard;
