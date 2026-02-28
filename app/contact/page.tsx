import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get a free landscaping estimate from Jack of All Blades Landscaping. Call 616-250-8044 or fill out our contact form. Serving Grand Rapids, MI.",
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
