import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTABanner from "@/components/CTABanner";
import { BLUR_DATA_URL } from "@/lib/constants";
import { getServiceBySlug, SERVICE_SLUGS, SERVICES } from "@/data/services";
import { ALL_SERVICE_AREAS, getServiceAreaLink } from "@/data/serviceAreas";

type Props = {
  params: Promise<{ slug: string }>;
};

const SITE = "https://jackofallbladeslandscaping.com";

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service | Jack of All Blades" };
  }
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE}/services/${slug}`,
      siteName: "Jack of All Blades Landscaping",
      type: "website",
    },
  };
}

function jsonLd(obj: unknown) {
  return {
    __html: JSON.stringify(obj).replace(/</g, "\\u003c"),
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return null;
  }

  const otherServices = SERVICES.filter((s) => s.slug !== service.slug);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.intro,
    provider: { "@id": `${SITE}/#business` },
    areaServed: ALL_SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area.replace(/ \(MI\)$/, ""),
      containedInPlace: { "@type": "State", name: "Michigan" },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${SITE}/services/${service.slug}`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const isHedge = service.slug === "hedge-and-bush-trimming";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(serviceSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema)} />

      <PageHeader
        label={service.name}
        title={`${service.name} in Grand Rapids`}
        titleAccent=", MI"
        description={service.intro}
      />

      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-earthy-900" />
        <div className="relative z-10 max-w-5xl mx-auto section-padding">
          {/* What's included + image */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-20">
            <div>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
                What&apos;s included
              </h2>
              <ul className="space-y-3">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-forest-900/60 border border-forest-700/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-forest-400" />
                    </span>
                    <span className="text-dark-100 text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-forest-800/30">
              <Image
                src={service.image}
                alt={service.alt}
                fill
                className={`object-cover [image-orientation:from-image] ${
                  isHedge ? "rotate-90 origin-center scale-[1.15]" : ""
                }`}
                style={isHedge ? { objectPosition: "50% 35%" } : undefined}
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Where we offer this service */}
          <div className="mb-20">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
              Where we offer {service.name.toLowerCase()}
            </h2>
            <div className="flex flex-wrap gap-3">
              {ALL_SERVICE_AREAS.map((area) => {
                const name = area.replace(/ \(MI\)$/, "");
                return (
                  <Link
                    key={area}
                    href={getServiceAreaLink(area)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-earthy-800/80 border border-forest-700/30 text-dark-100 hover:text-white hover:border-forest-500/50 hover:bg-earthy-700/80 transition-all text-sm font-medium"
                  >
                    <MapPin size={14} className="text-forest-400" />
                    {name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl bg-earthy-800/60 border border-forest-800/30 overflow-hidden"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 text-white font-heading font-semibold text-base sm:text-lg">
                    {faq.q}
                    <span className="text-forest-400 transition-transform group-open:rotate-45 text-2xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 -mt-1 text-dark-200 text-[15px] leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Other services */}
          <div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white mb-6">
              Other services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {otherServices.map((s) => {
                const OtherIcon = s.icon;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col gap-3 p-5 rounded-2xl bg-earthy-800/60 border border-forest-800/30 hover:border-forest-500/40 hover:bg-earthy-700/60 transition-all"
                  >
                    <span className="w-11 h-11 rounded-xl bg-forest-900/60 border border-forest-700/30 flex items-center justify-center">
                      <OtherIcon size={22} className="text-forest-400" />
                    </span>
                    <span className="font-heading font-semibold text-white text-sm leading-snug group-hover:text-forest-300 transition-colors">
                      {s.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
