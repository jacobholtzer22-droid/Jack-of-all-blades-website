import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactContent = dynamic(() => import("@/components/ContactContent"));

export const metadata: Metadata = {
  title: "Contact Us | Free Landscaping Estimate East Grand Rapids MI",
  description:
    "Request a free landscaping quote in East Grand Rapids, Grand Rapids, and surrounding Michigan communities. Tell us about your project and we will get back to you.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Free Landscaping Estimate East Grand Rapids MI",
    description:
      "Request a free landscaping quote in East Grand Rapids, Grand Rapids, and surrounding Michigan communities. Tell us about your project and we will get back to you.",
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
