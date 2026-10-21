import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("@/components/ContactContent"));

export const metadata: Metadata = {
  title: "Contact Jack of All Blades | Grand Rapids Landscaping",
  description:
    "Request a free landscaping quote in Grand Rapids, East Grand Rapids, and across West Michigan. Tell us about your project and we will get back to you.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Jack of All Blades | Grand Rapids Landscaping",
    description:
      "Request a free landscaping quote in Grand Rapids, East Grand Rapids, and across West Michigan. Tell us about your project and we will get back to you.",
    url: "https://jackofallbladeslandscaping.com/contact",
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

export default function ContactPage() {
  return <ContactContent />;
}
