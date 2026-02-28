import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";

const TestimonialsList = dynamic(
  () => import("@/components/TestimonialsList")
);
const CTABanner = dynamic(() => import("@/components/CTABanner"));

export const metadata: Metadata = {
  title:
    "Customer Reviews | Jack of All Blades Landscaping East Grand Rapids",
  description:
    "Read reviews from satisfied customers across East Grand Rapids, Kentwood, Wyoming, and Grand Rapids. 5-star rated landscaping services.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title:
      "Customer Reviews | Jack of All Blades Landscaping East Grand Rapids",
    description:
      "Read reviews from satisfied customers across East Grand Rapids, Kentwood, Wyoming, and Grand Rapids. 5-star rated landscaping services.",
    url: "https://jackofallbladeslandscaping.com/testimonials",
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

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        label="Testimonials"
        title="What Our Clients"
        titleAccent="Say"
        description="Don't just take our word for it. Here's what our customers have to say about working with us."
      />
      <TestimonialsList />
      <CTABanner />
    </>
  );
}
