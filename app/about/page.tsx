import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const AboutContent = dynamic(() => import("@/components/AboutContent"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "About Jack of All Blades | Trusted Landscaping Company East Grand Rapids MI",
  description:
    "Jack of All Blades Landscaping has served East Grand Rapids and the greater Grand Rapids area for 8+ years. Fully bonded, reliable, and committed to excellence.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Jack of All Blades | Trusted Landscaping Company East Grand Rapids MI",
    description:
      "Jack of All Blades Landscaping has served East Grand Rapids and the greater Grand Rapids area for 8+ years. Fully bonded, reliable, and committed to excellence.",
    url: "https://jackofallbladeslandscaping.com/about",
    siteName: "Jack of All Blades Landscaping",
    images: [
      {
        url: "/images/IMG_5510.webp",
        width: 1200,
        height: 630,
        alt: "Professional lawn care and landscaping in Grand Rapids Michigan",
      },
    ],
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Us"
        title="Built from the"
        titleAccent="ground up"
        description="Meet the team behind East Grand Rapids and West Michigan's most dedicated landscaping company."
        backgroundImage="/images/IMG_5510.webp"
      />
      <AboutContent />
      <CTABanner />
    </>
  );
}
