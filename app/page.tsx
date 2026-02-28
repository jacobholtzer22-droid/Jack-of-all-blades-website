import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

const Services = dynamic(() => import("@/components/Services"));
const HomePhotoStrip = dynamic(() => import("@/components/HomePhotoStrip"));
const HomeAboutPreview = dynamic(() => import("@/components/HomeAboutPreview"));
const HomeTestimonialPreview = dynamic(
  () => import("@/components/HomeTestimonialPreview")
);
const ServiceAreas = dynamic(() => import("@/components/ServiceAreas"));
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "Jack of All Blades Landscaping | Lawn Care & Landscaping East Grand Rapids MI",
  description:
    "Professional landscaping, lawn care, hardscaping & tree services in East Grand Rapids, Grand Rapids, Kentwood & surrounding areas. Fully bonded. Free estimates. Call 616-250-8044.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Jack of All Blades Landscaping | Lawn Care & Landscaping East Grand Rapids MI",
    description:
      "Professional landscaping, lawn care, hardscaping & tree services in East Grand Rapids, Grand Rapids, Kentwood & surrounding areas. Fully bonded. Free estimates.",
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
    addressLocality: "East Grand Rapids",
    addressRegion: "MI",
    postalCode: "49506",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.9634,
    longitude: -85.6681,
  },
  areaServed: [
    { "@type": "City", name: "East Grand Rapids", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Grand Rapids", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Kentwood", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Wyoming", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Walker", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Byron Center", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Grandville", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Cascade", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Ada", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Rockford", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Comstock Park", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Forest Hills", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Caledonia", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Jenison", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Hudsonville", containedInPlace: { "@type": "State", name: "Michigan" } },
    { "@type": "City", name: "Alto", containedInPlace: { "@type": "State", name: "Michigan" } },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Landscaping Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lawn Care" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landscaping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hardscaping" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Snow Removal" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Seasonal Cleanup" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tree Trimming and Removal" } },
    ],
  },
  priceRange: "$$",
  openingHours: "Mo-Sa 07:00-19:00",
  sameAs: [],
  description:
    "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in East Grand Rapids, Grand Rapids, and West Michigan. Fully bonded with 8+ years experience. Free estimates available.",
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
      <ServiceAreas />
      <CTABanner />
    </>
  );
}
