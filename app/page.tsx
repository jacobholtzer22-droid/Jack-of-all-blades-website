import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Services = dynamic(() => import("@/components/Services"));
const HomePhotoStrip = dynamic(() => import("@/components/HomePhotoStrip"));
const HomeAboutPreview = dynamic(() => import("@/components/HomeAboutPreview"));
const HomeTestimonialPreview = dynamic(
  () => import("@/components/HomeTestimonialPreview")
);
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "Jack of All Blades Landscaping | Lawn Care & Landscaping Grand Rapids MI",
  description:
    "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in Grand Rapids, MI. Fully bonded with 8+ years experience. Free estimates available. Call 616-250-8044.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Jack of All Blades Landscaping | Lawn Care & Landscaping Grand Rapids MI",
    description:
      "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in Grand Rapids, MI. Fully bonded with 8+ years experience. Free estimates available.",
    url: "https://jackofallbladeslandscaping.com",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LandscapingBusiness",
  name: "Jack of All Blades Landscaping",
  image: "https://jackofallbladeslandscaping.com/images/logo-transparent.png",
  url: "https://jackofallbladeslandscaping.com",
  telephone: "616-250-8044",
  email: "jackofallbladeslandscaping@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Grand Rapids",
    addressRegion: "MI",
    postalCode: "49506",
    addressCountry: "US",
  },
  areaServed: [
    "Grand Rapids",
    "Wyoming",
    "Kentwood",
    "Walker",
    "Byron Center",
    "Grandville",
    "Rockford",
    "Cascade",
    "Ada",
    "East Grand Rapids",
  ],
  priceRange: "$$",
  openingHours: "Mo-Sa 07:00-19:00",
  sameAs: [],
  description:
    "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in Grand Rapids, MI. Fully bonded with 8+ years experience. Free estimates available.",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Services />
      <HomePhotoStrip />
      <HomeAboutPreview />
      <HomeTestimonialPreview />
      <CTABanner />
    </>
  );
}
