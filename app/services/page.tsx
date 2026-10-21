import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import ServiceCard from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Landscaping Services Grand Rapids MI | Jack of All Blades",
  description:
    "Explore every service from Jack of All Blades in Grand Rapids & West Michigan: lawn care, landscaping, hardscaping, snow removal, cleanups and tree work. Call 616-250-8044",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Landscaping Services Grand Rapids MI | Jack of All Blades",
    description:
      "Explore every service from Jack of All Blades in Grand Rapids & West Michigan: lawn care, landscaping, hardscaping, snow removal, cleanups and tree work.",
    url: "https://jackofallbladeslandscaping.com/services",
    siteName: "Jack of All Blades Landscaping",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHeader
        label="Our Services"
        title="Landscaping Services in Grand Rapids"
        titleAccent=", MI"
        description="From lawn care and hardscaping to snow removal and tree work, explore the full range of services Jack of All Blades offers across Grand Rapids and West Michigan."
      />

      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-earthy-900" />
        <div className="relative z-10 max-w-7xl mx-auto section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
