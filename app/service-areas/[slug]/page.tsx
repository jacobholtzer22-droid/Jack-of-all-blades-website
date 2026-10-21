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

const SITE = "https://jackofallbladeslandscaping.com";

export default async function ServiceAreaPage({ params }: Props) {
  const { slug } = await params;
  const area = getServiceAreaBySlug(slug);

  if (!area) {
    return null; // or redirect to 404
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Service Areas",
        item: `${SITE}/service-areas`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: area.name,
        item: `${SITE}/service-areas/${area.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
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
