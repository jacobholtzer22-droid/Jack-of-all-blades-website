import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const ContactContent = dynamic(() => import("@/components/ContactContent"));

export const metadata: Metadata = {
  title: "Contact Us | Free Landscaping Estimate Grand Rapids MI",
  description:
    "Get a free landscaping estimate from Jack of All Blades Landscaping. Call 616-250-8044 or fill out our contact form. Serving Grand Rapids, MI.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Free Landscaping Estimate Grand Rapids MI",
    description:
      "Get a free landscaping estimate from Jack of All Blades Landscaping. Call 616-250-8044 or fill out our contact form. Serving Grand Rapids, MI.",
    url: "https://jackofallbladeslandscaping.com/contact",
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

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="Get In Touch"
        title="Contact"
        titleAccent="Us"
        description="Get a free estimate today. We serve Grand Rapids, MI and all surrounding areas."
      />
      <ContactContent />
    </>
  );
}
