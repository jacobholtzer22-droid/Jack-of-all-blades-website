import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import TestimonialsList from "@/components/TestimonialsList";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our customers say about Jack of All Blades Landscaping. Real reviews from satisfied clients in Grand Rapids, MI.",
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
