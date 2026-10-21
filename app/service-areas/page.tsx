import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { SERVICE_AREAS } from "@/data/serviceAreas";

export const metadata: Metadata = {
  title: "Service Areas Grand Rapids MI | Jack of All Blades",
  description:
    "Jack of All Blades Landscaping serves Grand Rapids, East Grand Rapids, Kentwood, Ada, Cascade and communities across West Michigan. See every service area. 616-250-8044",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "Service Areas Grand Rapids MI | Jack of All Blades",
    description:
      "Jack of All Blades Landscaping serves Grand Rapids, East Grand Rapids, Kentwood, Ada, Cascade and communities across West Michigan.",
    url: "https://jackofallbladeslandscaping.com/service-areas",
    siteName: "Jack of All Blades Landscaping",
    type: "website",
  },
};

function firstSentence(text: string): string {
  const match = text.match(/^[^.]*\./);
  return match ? match[0] : text;
}

export default function ServiceAreasIndexPage() {
  return (
    <>
      <PageHeader
        label="Service Areas"
        title="Where We Work in West Michigan"
        description="Jack of All Blades Landscaping serves Grand Rapids, East Grand Rapids, and communities across West Michigan with lawn care, landscaping, hardscaping, snow removal and more."
      />

      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-earthy-900" />
        <div className="relative z-10 max-w-6xl mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="group flex flex-col gap-3 p-6 rounded-2xl bg-earthy-800/60 border border-forest-800/30 hover:border-forest-500/40 hover:bg-earthy-700/60 transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-10 h-10 rounded-xl bg-forest-900/60 border border-forest-700/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-forest-400" />
                  </span>
                  <h2 className="font-heading font-semibold text-white text-lg group-hover:text-forest-300 transition-colors">
                    {area.name}
                  </h2>
                </div>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {firstSentence(area.description)}
                </p>
                <span className="inline-flex items-center gap-1.5 text-forest-400 text-sm font-semibold mt-auto pt-1">
                  View {area.name}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
