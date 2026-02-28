import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const PortfolioGrid = dynamic(() => import("@/components/PortfolioGrid"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "Our Work | Landscaping & Hardscaping Projects Grand Rapids MI",
  description:
    "View our landscaping, hardscaping, and lawn care projects in Grand Rapids, MI. See the quality craftsmanship from Jack of All Blades Landscaping.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title:
      "Our Work | Landscaping & Hardscaping Projects Grand Rapids MI",
    description:
      "View our landscaping, hardscaping, and lawn care projects in Grand Rapids, MI. See the quality craftsmanship from Jack of All Blades Landscaping.",
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
        description="A showcase of our landscaping, hardscaping, and lawn care transformations across Grand Rapids."
      />
      <PortfolioGrid />
      <CTABanner />
    </>
  );
}
