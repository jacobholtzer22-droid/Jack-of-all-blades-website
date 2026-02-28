import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import AboutContent from "@/components/AboutContent";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Mike Hazzard and the Jack of All Blades Landscaping team. Serving Grand Rapids, MI since 2018 with professional landscaping, hardscaping, and lawn care.",
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
