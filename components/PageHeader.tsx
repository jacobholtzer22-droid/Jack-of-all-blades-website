import Image from "next/image";

interface PageHeaderProps {
  label: string;
  title: string;
  titleAccent?: string;
  description: string;
  backgroundImage?: string;
  /** Use "contain" to show full image without cropping; default "cover" fills the area */
  backgroundSize?: "cover" | "contain";
  /** Position of background when cropped; "center top" crops bottom (e.g. to hide footer bars) */
  backgroundPosition?: "center" | "center top" | "center bottom";
}

export default function PageHeader({
  label,
  title,
  titleAccent,
  description,
  backgroundImage,
  backgroundSize = "cover",
  backgroundPosition = "center",
}: PageHeaderProps) {
  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden animate-fade-in min-h-[380px] sm:min-h-[440px]">
      {backgroundImage && (
        <div className="absolute inset-0 bg-earthy-900">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className={backgroundSize === "contain" ? "object-contain" : "object-cover"}
            style={{ objectPosition: backgroundPosition }}
            sizes="100vw"
            quality={85}
            priority
            fetchPriority="high"
          />
        </div>
      )}
      <div className={`absolute inset-0 ${backgroundImage ? "bg-gradient-to-br from-earthy-950/85 via-earthy-900/75 to-earthy-950/85" : "bg-gradient-to-br from-earthy-950 via-earthy-900 to-earthy-950"}`} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-900/20 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-transparent via-forest-500/20 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto text-center section-padding">
        <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
          {label}
        </span>
        <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6 tracking-tight" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
          {title}{" "}
          {titleAccent && (
            <span className="text-forest-400">{titleAccent}</span>
          )}
        </h1>
        <p className="text-dark-100 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </section>
  );
}
