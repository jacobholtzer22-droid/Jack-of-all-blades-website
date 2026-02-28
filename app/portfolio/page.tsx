import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "View our landscaping, hardscaping, and lawn care projects in Grand Rapids, MI. See the quality craftsmanship from Jack of All Blades Landscaping.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        label="Our Work"
        title="Project"
        titleAccent="Portfolio"
        description="A showcase of our landscaping, hardscaping, and lawn care transformations across Grand Rapids."
      />
      <PortfolioGrid />
      <CTABanner />
    </>
  );
}
