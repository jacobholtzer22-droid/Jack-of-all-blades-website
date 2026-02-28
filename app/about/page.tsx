import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const AboutContent = dynamic(() => import("@/components/AboutContent"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "About Jack of All Blades | Trusted Landscaping Company Grand Rapids MI",
  description:
    "Learn about Mike Hazzard and the Jack of All Blades Landscaping team. Serving Grand Rapids, MI since 2018 with professional landscaping, hardscaping, and lawn care.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title:
      "About Jack of All Blades | Trusted Landscaping Company Grand Rapids MI",
    description:
      "Learn about Mike Hazzard and the Jack of All Blades Landscaping team. Serving Grand Rapids, MI since 2018 with professional landscaping, hardscaping, and lawn care.",
    url: "https://jackofallbladeslandscaping.com/about",
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

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About Us"
        title="Built from the"
        titleAccent="ground up"
        description="Meet the team behind Grand Rapids' most dedicated landscaping company."
      />
      <AboutContent />
      <CTABanner />
    </>
  );
}
