import type { Metadata } from "next";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";
import {
  getServiceAreaBySlug,
  SERVICE_AREA_SLUGS,
} from "@/data/serviceAreas";

const ServiceAreaTemplate = dynamic(
  () => import("@/components/ServiceAreaTemplate")
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICE_AREA_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);
  if (!area) {
    return { title: "Service Area | Jack of All Blades" };
  }
  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: `/service-areas/${slug}`,
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: `https://jackofallbladeslandscaping.com/service-areas/${slug}`,
      siteName: "Jack of All Blades Landscaping",
      type: "website",
    },
  };
}

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return null; // or redirect to 404
  }

  return (
    <>
      <PageHeader
        label={`Landscaping in ${area.name}`}
        title={`Landscaping Services in ${area.name}`}
        titleAccent=", MI"
        description={`Professional landscaping, lawn care, hardscaping, and tree services for ${area.name} and surrounding areas.`}
      />
      <ServiceAreaTemplate area={area} />
    </>
  );
}
