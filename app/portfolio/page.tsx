import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const PortfolioGrid = dynamic(() => import("@/components/PortfolioGrid"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "Our Work | Landscaping & Hardscaping Projects East Grand Rapids MI",
  description:
    "View landscaping, hardscaping, and lawn care projects completed across East Grand Rapids, Grand Rapids, Ada, Cascade & West Michigan.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title:
      "Our Work | Landscaping & Hardscaping Projects East Grand Rapids MI",
    description:
      "View landscaping, hardscaping, and lawn care projects completed across East Grand Rapids, Grand Rapids, Ada, Cascade & West Michigan.",
    url: "https://jackofallbladeslandscaping.com/portfolio",
    siteName: "Jack of All Blades Landscaping",
    images: [
      {
        url: "/images/IMG_5510.jpg",
        width: 1200,
        height: 630,
        alt: "Professional lawn care and landscaping in Grand Rapids Michigan",
      },
    ],
    type: "website",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        label="Our Work"
        title="Project"
        titleAccent="Portfolio"
        description="A showcase of our landscaping, hardscaping, and lawn care transformations across East Grand Rapids, Grand Rapids, and West Michigan."
        backgroundImage="/images/paver-patio-seating.jpg"
      />
      <PortfolioGrid />
      <CTABanner />
    </>
  );
}
