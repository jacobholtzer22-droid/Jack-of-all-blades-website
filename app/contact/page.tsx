import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const ContactContent = dynamic(() => import("@/components/ContactContent"));

export const metadata: Metadata = {
  title: "Contact Us | Free Landscaping Estimate East Grand Rapids MI",
  description:
    "Request a free landscaping estimate in East Grand Rapids, Grand Rapids, and surrounding Michigan communities. Call 616-250-8044 or fill out our form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Free Landscaping Estimate East Grand Rapids MI",
    description:
      "Request a free landscaping estimate in East Grand Rapids, Grand Rapids, and surrounding Michigan communities. Call 616-250-8044 or fill out our form.",
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
  return (
    <>
      <PageHeader
        label="Get In Touch"
        title="Contact"
        titleAccent="Us"
        description="Get a free estimate today. Serving East Grand Rapids, Grand Rapids, and all surrounding Michigan communities."
      />
      <ContactContent />
    </>
  );
}
